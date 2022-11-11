import { CartItemType } from "../App";

/**
 * Get all the cheeses from database
 * @returns all the cheeses from database
 */
export const getCheeses = async (): Promise<CartItemType[]> =>
    await (await fetch(`api/cheeses`)).json();

/**
 * Send order details to API
 * @param orderItems items currently in the cart
 * @param setCartItems set state action to set the items in the cart
 */
export const handleCheesePurchase = async (
    orderItems: CartItemType[],
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
) => {
    const orders = orderItems.map((item: CartItemType) => {
        return {
            cheese: {id: item.id},
            quantity: item.amount,
        };
    });

    return fetch(`api/cheeses/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(orders),
    })
        .then((res) => {
            if (res.status === 201) {
                setCartItems([] as CartItemType[]);
                alert("Purchase successful!");
            } else {
                alert("Something went wrong!");
            }
        })
        .catch((e) => {
            alert("Something went wrong!");
        });
};
