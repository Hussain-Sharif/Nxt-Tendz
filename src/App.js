import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    this.setState(prevState => {
      const {cartList} = prevState
      console.log(
        'cartBtn Check',
        cartList,
        product,
        cartList.filter(each => each.id === product.id)[0],
        cartList.filter(each => each.id === product.id)[0] !== undefined,
      )
      if (cartList.filter(each => each.id === product.id)[0] !== undefined) {
        return {
          cartList: cartList.map(eachProduct => {
            if (eachProduct.id === product.id) {
              //   console.log(eachProduct, product)
              return {
                ...eachProduct,
                // quantity: eachProduct.quantity + product.quantity,
                quantity: product.quantity,
              }
            }
            return eachProduct
          }),
        }
      }
      return {cartList: [...cartList, product]}
    })
  }

  removeCartItem = productId => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(
        eachProduct => eachProduct.id !== productId,
      ),
    }))
  }

  incrementCartItemQuantity = productId => {
    this.setState(prev => {
      const {cartList} = prev
      return {
        cartList: cartList.map(each => {
          const {id, quantity} = each
          if (id === productId) {
            return {...each, quantity: quantity + 1}
          }
          return each
        }),
      }
    })
  }

  decrementCartItemQuantity = productId => {
    //   let check=false
    this.setState(prev => {
      const {cartList} = prev
      //   if (cartList.length === 1) {
      //     return {cartList: []}
      //   }
      return {
        cartList: cartList.map(each => {
          const {id, quantity} = each
          if (id === productId) {
            return {...each, quantity: quantity - 1}
          }
          return each
        }),
      }
    })
    this.setState(prev => {
      const {cartList} = prev
      return {
        cartList: cartList.filter(each => each.quantity !== 0),
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
