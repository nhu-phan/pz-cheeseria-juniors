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
      <Typography variant="h4">Your Shopping Cart</Typography>
      {cartItems.length === 0 ? <Typography variant="subtitle1">No items in cart</Typography> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <br></br>
      <Typography variant="h5">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
      <br></br>
      {cartItems.length !== 0 && <Button variant="contained" color="primary" onClick={async() => await handleCheesePurchase(cartItems, setCartItems)}>Purchase</Button>}
    </Wrapper>
  );
};

export default Cart;
