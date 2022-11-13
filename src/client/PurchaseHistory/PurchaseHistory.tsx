import { Wrapper } from './PurchaseHistory.styles';
import { getRecentPurchases } from '../services/purchase.service';
import React, { useEffect, useState } from 'react';
import Order from './Order/Order';
import { OrderModel } from '../models/order.model';
import { Typography } from '@material-ui/core';

// Shows all the recent purchases the user made
const PurchaseHistory = () => {
    const [recentPurchases, setRecentPurchases] = useState([]);

    useEffect( () => {
        // Fetches recent purchases from API and set state
        getRecentPurchases().then(data => setRecentPurchases(data));
    }, []);
    
    // If there is no recent purchases
    if (recentPurchases.length === 0) {
        return <Wrapper>
            <Typography variant="h4">Your Recent Purchases</Typography>
            <Typography variant="subtitle1">Oops, no recent purchases!</Typography>
        </Wrapper>
    }

    return (<Wrapper>
        <Typography variant="h4">Your Recent Purchases</Typography>
        {recentPurchases.map((order:OrderModel) => 
            <Order 
                id={order.id}
                totalPrice={order.totalPrice}
                orderItems={order.orderItems}
                date={order.date}
                />)}
    </Wrapper>)
};

export default PurchaseHistory;