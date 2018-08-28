import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {importProducts} from '../ducks/reducer';
import { connect } from 'react-redux';

class Storefront extends Component {
    componentDidMount(){
        axios.get('/api/allproducts').then(results => {
            this.props.importProducts(results.data)
        })
    }

    addToCart(e){
        axios.post('/api/addtocart', {id: e.id}).then(results => {
            console.log(results);
        })
    }

  render() {
      const imgStyle={
          height: '150px',
          width: '150px'
      }
      let productsDisplay = this.props.products.map((el,i) => {
          return(
              <div key={i}>
                    <h3>{el.title}</h3>
                    <img style={imgStyle} src={el.image}/>
                    <p>{el.description}</p>
                    <h4>${el.price}</h4>
                    <button onClick={() => this.addToCart(el)}>Add to Cart</button>
              </div>
          )
      })
    return (
      <div>
        <Link to='/'><button>Store</button></Link>
        <Link to='/cart'><button>Cart</button></Link>
        {productsDisplay}
      </div>
    )
  }
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}


export default connect(mapStateToProps, {importProducts})(Storefront);
