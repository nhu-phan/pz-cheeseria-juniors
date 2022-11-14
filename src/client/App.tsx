import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Cart/Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RestoreIcon from "@material-ui/icons/Restore";
import Badge from "@material-ui/core/Badge";
// Styles
import {
    Wrapper,
    StyledButton,
    StyledAppBar,
    HeaderTypography,
} from "./App.styles";
import { Toolbar, Typography } from "@material-ui/core";
import { getCheeses } from "./services/purchase.service";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";

// Types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [recentPurchaseOpen, setRecentPurchaseOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        "cheeses",
        getCheeses
    );

    // Loads cart from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const localStorageCart = savedCart == null ? [] : JSON.parse(savedCart);
        setCartItems(localStorageCart);
    }, []);

    // Saves to local storage whenever cart items change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find(
                (item) => item.id === clickedItem.id
            );

            if (isItemInCart) {
                return prev.map((item) =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            }
            // First time the item is added
            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>;

    return (
        <Wrapper>
            <StyledAppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className="top-bar"
                    >
                        <StyledButton
                            onClick={() => setRecentPurchaseOpen(true)}
                            data-cy="recent-purchases-btn"
                        >
                            <RestoreIcon />
                            <Typography variant="subtitle2">
                                Recent Purchases
                            </Typography>
                        </StyledButton>

                        <Drawer
                            anchor="left"
                            open={recentPurchaseOpen}
                            onClose={() => setRecentPurchaseOpen(false)}
                            data-cy="recent-purchases-drawer"
                        >
                            <PurchaseHistory />
                        </Drawer>

                        <HeaderTypography
                            variant="h3"
                            noWrap
                            className="welcome-msg"
                        >
                            Welcome to Patient Zero's Cheeseria
                        </HeaderTypography>

                        <StyledButton
                            data-cy="cartBtn"
                            onClick={() => setCartOpen(true)}
                        >
                            <Badge
                                badgeContent={getTotalItems(cartItems)}
                                color="error"
                                data-cy="badge-count"
                            >
                                <AddShoppingCartIcon />
                            </Badge>

                            <Typography variant="subtitle2">Cart</Typography>
                        </StyledButton>
                    </Grid>
                </Toolbar>
            </StyledAppBar>

            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                data-cy="cart-drawer"
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    setCartItems={setCartItems}
                    onClose={() => setCartOpen(false)}
                />
            </Drawer>

            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid
                        data-cy={`grid-cheese-${item.id}`}
                        item
                        key={item.id}
                        xs={12}
                        sm={4}
                    >
                        <Item
                            data-cy={`item-cheese-${item.id}`}
                            item={item}
                            handleAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default App;
