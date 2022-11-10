import { CartItemType } from '../App';

export const handleCheesePurchase = async (orderItems:CartItemType[], setCartItems:React.Dispatch<React.SetStateAction<CartItemType[]>>) => {
    const orders = orderItems.map((item:CartItemType) => {
        return {
            cheeseId: item.id,
            quantity: item.amount
        };
    })
    console.log(orders);
    return fetch(`api/cheeses/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        body: JSON.stringify(orders)
    }).then((res) => {
        if (res.status === 201) {
            setCartItems([] as CartItemType[]);
            alert("Purchase successful");
        } else {
            alert("Something went wrong!");
        };
    });;
};