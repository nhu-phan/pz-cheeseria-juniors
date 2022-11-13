import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <Box sx={{flex:1}}>
      <Typography variant="h6" className="cart-cheese">{item.title}</Typography>
      <Box className='information'>
        <Typography variant="subtitle1" data-cy={`cart-item-${item.id}-unitPrice`}>Price: ${item.price}</Typography>
        <Typography variant="subtitle1" data-cy={`cart-item-${item.id}-totalPrice`}>Total: ${(item.amount * item.price).toFixed(2)}</Typography>
      </Box>

      <Box className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
          data-cy={`cart-item-${item.id}-decrement`}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
          data-cy={`cart-item-${item.id}-increment`}
        >
          +
        </Button>
      </Box>
    </Box>
    <img src={item.image} alt={item.title}  data-cy={`cart-item-${item.id}-image`} />
  </Wrapper>
);

export default CartItem;
