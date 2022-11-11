import { OrderModel } from "../../models/order.model";
import { OrderItemModel } from "../../models/orderItem.model";
import { Wrapper } from "./Order.styles";

/* Return a row containing information of purchased cheese 
(title, unit price, quantity bought and total price) */
const OrderItems = ({ cheese, quantity, totalPrice }: OrderItemModel) => {
    return (
        <tr>
            <td>{cheese.title}</td>
            <td>${cheese.price}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
        </tr>
    );
};

// A single order (may contain many cheese items)
const Order = ({ id, totalPrice, orderItems }: OrderModel) => {
    return (
        <Wrapper>
            <h3>Order Number #{id}</h3>
            <p>Total Order Price: ${totalPrice.toFixed(2)}</p>
            <table>
                <tr>
                    <th>Cheese Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                {orderItems.map((item: OrderItemModel) => (
                    <OrderItems
                        cheese={item.cheese}
                        quantity={item.quantity}
                        totalPrice={item.totalPrice}
                    ></OrderItems>
                ))}
            </table>
        </Wrapper>
    );
};

export default Order;
