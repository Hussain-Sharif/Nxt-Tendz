// Write your code
import './index.css'

const CartSummary = props => {
  const {totalAmount, cartList} = props
  return (
    <>
      <h1>
        Order Total: <span>Rs {totalAmount}/- </span>
      </h1>
      <p>{cartList.length} Items in cart</p>
      <button type="button">CheckOut</button>
    </>
  )
}

export default CartSummary
