import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import './ShoppingCart.css';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEligibleForFreeDelivery, setIsEligibleForFreeDelivery] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch(`https://sports-kya6.onrender.com/getcart?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                const parsedData = data.map(item => ({
                    ...item,
                    quantity: Number(item.quantity) || 1, // Ensure quantity is at least 1
                }));
                setCartItems(parsedData);
                calculateTotalPrice(parsedData); // Calculate total price after fetching items
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        fetchCartItems();
    }, [username]);

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch(`https://sports-kya6.onrender.com/cart/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            const updatedCartItems = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedCartItems);
            calculateTotalPrice(updatedCartItems); // Recalculate total price after removing an item
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const response = await fetch(`https://sports-kya6.onrender.com/cart/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to update item quantity');
            }
            const updatedCartItems = cartItems.map(item => {
                if (item._id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
            calculateTotalPrice(updatedCartItems); // Recalculate total price after updating quantity
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce((total, item) => {
            const itemPrice = item.price * item.quantity;
            return total + (isNaN(itemPrice) ? 0 : itemPrice);
        }, 0);
        setTotalPrice(totalPrice.toFixed(2));
        setIsEligibleForFreeDelivery(totalPrice > 499);
    };

    const handleProceedToBuy = () => {
        navigate('/payment'); // Adjust the path to your checkout route
    };

    return (
        <>
            <Nav />
            <div className="cart-container">
                <div className="shopping-cart">
                    <h1>Shopping Cart</h1>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item._id} className="cart-item">
                                <img src={item.image} alt={item.topic} className="item-image" />
                                <div className="item-info">
                                    <h2>{item.topic}</h2>
                                    <p>{item.description}</p>
                                    <p className="price">Price: ₹{item.price}</p>
                                    <div className="quantity-control">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                        >
                                            {[...Array(10).keys()].map(n => (
                                                <option key={n + 1} value={n + 1}>
                                                    {n + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="item-actions">
                                            <button onClick={() => handleRemoveItem(item._id)}>
                                                <FontAwesomeIcon icon={faTrash} size="lg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="subtotal">
                        <span>Total ({cartItems.length} items): </span>
                        <strong>₹{totalPrice}</strong>
                    </div>
                </div>
                <div className="cart-summary">
                    {isEligibleForFreeDelivery && (
                        <>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}></div>
                            </div>
                            <p className="free-delivery">
                                <FontAwesomeIcon icon={faCheckCircle} size="lg" color='#4caf50' /> Your order is eligible for <strong>FREE Delivery</strong>. Choose FREE Delivery option at checkout.
                            </p>
                        </>
                    )}
                    <div className="subtotal">
                        <span>Subtotal ({cartItems.length} items): </span>
                        <strong>₹{totalPrice}</strong>
                    </div>
                    <button className="proceed-to-buy" onClick={handleProceedToBuy}>
                        Proceed to Buy
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
