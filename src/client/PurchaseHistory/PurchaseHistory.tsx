import { Wrapper } from './PurchaseHistory.styles';
import { getRecentPurchases } from '../services/purchase.service';
import { useEffect, useState } from 'react';
import Order from './Order/Order';
import { OrderModel } from '../models/order.model';

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
            <h1>Your Recent Purchases</h1>
            <p>Oops, not recent purchases found.</p>
        </Wrapper>
    }

    return (<Wrapper>
        <h1>Your Recent Purchases</h1>
        {recentPurchases.map((order:OrderModel) => 
            <Order 
                id={order.id}
                totalPrice={order.totalPrice}
                orderItems={order.orderItems}
                />)}
    </Wrapper>)
};

export default PurchaseHistory;