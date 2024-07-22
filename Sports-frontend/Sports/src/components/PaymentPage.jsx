import {faBank, faCashRegister,  faCreditCardAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });

    const navigate = useNavigate();

    const handleContinue = () => {
        if (step === 1 && paymentMethod !== '') {
            setStep(2);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value
        });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        // Handle payment logic here based on paymentMethod
        if (paymentMethod === 'card') {
            // Handle card payment
            alert('Card Payment successful!');
        } else if (paymentMethod === 'upi') {
            // Handle UPI payment
            alert('UPI Payment successful!');
        } else if (paymentMethod === 'cod') {
            // Handle Cash on Delivery payment
            alert('Cash on Delivery successful!');
        }
        navigate('/'); // Redirect to home or order confirmation page
    };

    return (
        <div className="payment-container">
            <div className="payment-page">
                <h1>Payment Page</h1>
                {step === 1 && (
                    <>
                        <h2>Select Payment Method</h2>
                        <div className="payment-method-box">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />Credit Card or Debit Card
                                <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Other UPI App
                                <FontAwesomeIcon icon={faBank} size="lg" className='icon' />
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Cash on Delivery/Pay on Delivery
                                <FontAwesomeIcon icon={faCashRegister} size="lg"  />
                            </label>
                        </div>
                        <button onClick={handleContinue}>Continue</button>
                    </>
                )}
                {step === 2 && (
                    <form onSubmit={handlePayment}>
                        <h2>Enter Payment Details</h2>
                        {/* Render form fields based on selected payment method */}
                        {paymentMethod === 'card' && (
                            <>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentDetails.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Add other card details fields */}
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={paymentDetails.cvv}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name on Card</label>
                                    <input
                                        type="text"
                                        name="nameOnCard"
                                        value={paymentDetails.nameOnCard}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {paymentMethod === 'upi' && (
                            <>
                                <div className="form-group">
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        name="upiId"
                                        value={paymentDetails.upiId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {paymentMethod === 'cod' && (
                            <>
                                <p>Please be ready with cash when the delivery arrives.</p>
                            </>
                        )}
                        <button type="submit" className="pay-now">Pay Now</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PaymentPage;
