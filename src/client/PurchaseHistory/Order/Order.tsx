import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { OrderModel } from "../../models/order.model";
import { OrderItemModel } from "../../models/orderItem.model";
import { Wrapper } from "./Order.styles";

/* Return a row containing information of purchased cheese 
(title, unit price, quantity bought and total price) */
const OrderItems = ({ cheese, quantity, totalPrice }: OrderItemModel) => {
    return (
        <TableRow>
            <TableCell>{cheese.title}</TableCell>
            <TableCell>${cheese.price}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>${totalPrice}</TableCell>
        </TableRow>
    );
};

// A single order (may contain many cheese items)
const Order = ({ id, totalPrice, orderItems, date }: OrderModel) => {
    return (
        <Wrapper>
            <Typography variant="h3" className="header">
                Order Number #{id}
            </Typography>
            <Typography variant="subtitle1">
                Total Order Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="subtitle2">
                Order Date: {(new Date(date)).toLocaleString()}
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">
                                Cheese Name
                            </TableCell>
                            <TableCell className="table-header">
                                Unit Price
                            </TableCell>
                            <TableCell className="table-header">
                                Quantity
                            </TableCell>
                            <TableCell className="table-header">
                                Total Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems.map((item: OrderItemModel) => (
                            <OrderItems
                                cheese={item.cheese}
                                quantity={item.quantity}
                                totalPrice={item.totalPrice}
                            ></OrderItems>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Wrapper>
    );
};

export default Order;
