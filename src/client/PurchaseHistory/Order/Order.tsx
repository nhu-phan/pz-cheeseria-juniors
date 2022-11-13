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
        <TableRow data-cy={`order-cheese-${cheese.id}-row`}>
            <TableCell data-cy={`order-cheese-${cheese.id}-title`}>
                {cheese.title}
            </TableCell>
            <TableCell data-cy={`order-cheese-${cheese.id}-price`}>
                ${cheese.price}
            </TableCell>
            <TableCell data-cy={`order-cheese-${cheese.id}-quantity`}>
                {quantity}
            </TableCell>
            <TableCell data-cy={`order-cheese-${cheese.id}-totalPrice`}>
                ${totalPrice}
            </TableCell>
        </TableRow>
    );
};

// A single order (may contain many cheese items)
const Order = ({ id, totalPrice, orderItems, date }: OrderModel) => {
    return (
        <Wrapper>
            <Typography
                variant="h3"
                className="header"
                data-cy={`order-${id}-number`}
            >
                Order Number #{id}
            </Typography>
            <Typography variant="subtitle1" data-cy={`order-${id}-price`}>
                Total Order Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="subtitle2" data-cy={`order-${id}-date`}>
                Order Date: {new Date(date).toLocaleString()}
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead data-cy="order-table-header">
                        <TableRow>
                            <TableCell
                                className="table-header"
                                data-cy="order-table-header-name"
                            >
                                Cheese Name
                            </TableCell>
                            <TableCell
                                className="table-header"
                                data-cy="order-table-header-unitPrice"
                            >
                                Unit Price
                            </TableCell>
                            <TableCell
                                className="table-header"
                                data-cy="order-table-header-quantity"
                            >
                                Quantity
                            </TableCell>
                            <TableCell
                                className="table-header"
                                data-cy="order-table-header-totalPrice"
                            >
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
                                data-cy={`order-${id}-items`}
                            ></OrderItems>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Wrapper>
    );
};

export default Order;
