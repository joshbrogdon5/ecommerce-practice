import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {importCart} from '../ducks/reducer';
import { connect } from 'react-redux';


class Cart extends Component {
    constructor(){
        super()

        this.state = {
            quantity: '',
            total: 0
        }
    }


    componentDidMount(){
        axios.get('/api/cartdata').then(results => {
            this.props.importCart(results.data)
            this.total()
        })
    }

    deleteFromCart(id){
        axios.delete(`/api/deletefromcart/${id}`).then(results => {
            this.props.importCart(results.data)
            this.setState({total:0})
            this.total()
        })
    }

    handleQuantity(val){
        this.setState({quantity: val})
    }

    updateQuantity(e){
        axios.put('/api/setquantity', {quantity: this.state.quantity, id: e}).then(results => {
            this.props.importCart(results.data);
            this.setState({total: 0})
            this.total()
        })
    }

    total(){
        let total = this.props.shoppingCart.map(e => {
            var totalizer = this.state.total + e.price * e.quantity;
            this.setState({total: totalizer})
        })
    }
    checkout(){
        axios.delete('/api/clearcart').then(results => {
            this.props.importCart(results.data)
            this.setState({total:0})
        })
    }

  render() {
    const imgStyle={
        height: '150px',
        width: '150px'
    }
      let displayCart = this.props.shoppingCart.map((e,i) => {
          return(
              <div key={i}>
                <h3>{e.title}</h3>
                <img style={imgStyle} src={e.image} />
                <h4>${e.price}</h4>
                <h4>Quantity: {e.quantity}</h4>
                <input placeholder="quantity" onChange={(e) => this.handleQuantity(e.target.value)} type="text"/>
                <button onClick={() => this.updateQuantity(e.id)}>Save Quantity</button>
                <button onClick={() => this.deleteFromCart(e.id)}>Removie Item</button>
              </div>
          )
      })
    return (
      <div>
        <Link to='/'><button>Store</button></Link>
        <Link to='/cart'><button>Cart</button></Link>
        {displayCart[0] ? 
        <div>
            {displayCart}
            <h3>Total Price: ${this.state.total}</h3>
            <button onClick={() => this.checkout()}>checkout</button>
        </div>
        :<div>
            <h2>Cart Empty! Go and Shop!</h2>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
        shoppingCart: state.shoppingCart
    }
}



export default connect(mapStateToProps, {importCart})(Cart);
