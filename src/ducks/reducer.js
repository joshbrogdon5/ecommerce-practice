const initialState = {
    products: [],
    shoppingCart: []
}

const IMPORT_PRODUCTS = 'IMPORT_PRODUCTS';
const IMPORT_CART = 'IMPORT_CART';

export const importProducts = (products) => ({
  type: IMPORT_PRODUCTS,
  payload: products
})

export const importCart = (cart) => ({
  type: IMPORT_CART,
  payload: cart
})



export default (state = initialState, action) => {
  switch (action.type) {

  case IMPORT_PRODUCTS:
    return Object.assign({}, state, {products: action.payload})

    case IMPORT_CART:
        return Object.assign({}, state, {shoppingCart: action.payload})

  default:
    return state
  }
}
