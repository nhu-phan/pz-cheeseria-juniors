import Button from "@material-ui/core/Button";
import React, { useState } from "react";
// Dialogs for the Cheese Item
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// Types
import { CartItemType } from "../../App";
// Styles
import { Wrapper, ItemInfo } from "./Item.styles";
import {
    Box,
    Typography,
    Table,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    const [showDialogue, setShowDialogue] = useState(false);

    return (
        <Wrapper>
            <Box onClick={() => setShowDialogue(true)}>
                <img data-cy={`cheese-${item.id}-image`} src={item.image} alt={item.title} />
                <Box className="item-details">
                    <Typography className="cheese-name" data-cy={`cheese-${item.id}-title`}>
                        {item.title}
                    </Typography>
                    <Typography data-cy={`cheese-${item.id}-price`}>${item.price}</Typography>
                </Box>
            </Box>

            <Dialog open={showDialogue} onClick={() => setShowDialogue(false)}>
                <ItemInfo>
                    <DialogTitle data-cy={`dialog-cheese-${item.id}-title`}>
                        {item.title} <span className="item-id">#{item.id}</span>
                    </DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell data-cy={`dialog-cheese-${item.id}-price`}>${item.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell data-cy={`dialog-cheese-${item.id}-descr`}>{item.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell data-cy={`dialog-cheese-${item.id}-category`}>{item.category}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                        <br></br>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleAddToCart(item);
                                setShowDialogue(false);
                            }}
                            data-cy={`add-to-cart-${item.id}-dialog`}
                        >
                            Add to cart
                        </Button>
                    </DialogContent>
                </ItemInfo>
            </Dialog>

            <Button
                onClick={() => handleAddToCart(item)}
                data-cy={`add-to-cart-${item.id}`}
                className="cart-button"
            >
                Add to cart
            </Button>
        </Wrapper>
    );
};

export default Item;
