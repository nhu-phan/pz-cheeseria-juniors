import Button from '@material-ui/core/Button';
import {useState} from "react";
// Dialogs for the Cheese Item
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper, ItemInfo } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [showDialogue, setShowDialogue] = useState(false);

  return (<Wrapper>
    <section onClick={() => setShowDialogue(true)}>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
    </section>
    
    <Dialog open={showDialogue} onClick={() => setShowDialogue(false)}>
    <ItemInfo>
      <DialogTitle>{item.title} <span className="item-id">#{item.id}</span></DialogTitle>
      <DialogContent>
          <table>
            <tr>
              <td>Price</td>
              <td>${item.price}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{item.description}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{item.category}</td>
            </tr>
          </table>
        </DialogContent>
        </ItemInfo>
      </Dialog>
    
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>)
};

export default Item;
