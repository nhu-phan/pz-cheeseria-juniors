import React from "react";
import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { handleCheesePurchase } from '../services/purchase.service';
import { Button, Typography } from '@material-ui/core';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, setCartItems }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <Typography variant="h4" className="cart-header">Your Shopping Cart</Typography>
      {cartItems.length === 0 ? <Typography data-cy="cart-empty-msg" variant="subtitle1">No items in cart</Typography> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          data-cy={`cart-item-${item.id}`}
        />
      ))}
      <br></br>
      <Typography variant="h5" data-cy="cart-totalPrice">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
      <br></br>
      {cartItems.length !== 0 && <Button data-cy="purchase-btn" variant="contained" color="primary" onClick={async() => await handleCheesePurchase(cartItems, setCartItems)}>Purchase</Button>}
    </Wrapper>
  );
};

export default Cart;
