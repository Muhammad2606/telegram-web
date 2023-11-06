import { totalPrice } from '../../units/total-price'
import Button from '../buttun/button'
import './cart.css'

const Cart = ({cartItems, onCheckout} ) => {
  return (
    <div className='cart__container'>
        <p>Umumiy narx {''} 
      {totalPrice(cartItems).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}
                    </p>

        <Button title={`
          ${cartItems.length == 0 ? "Buyurtma berish" : "To'lov"}
        `} type={'checkout'} 
        onClick={onCheckout}
         disable={cartItems.length == 0 ? true : false}/>
    </div>
  )
}

export default Cart