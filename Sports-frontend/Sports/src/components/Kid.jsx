import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import Footer from './Footer';

function Kid() {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [priceCategory, setPriceCategory] = useState('All');
    const username = localStorage.getItem('username');

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch("https://sports-kya6.onrender.com/req-questions?category=kid");
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
                setFilteredQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();
    }, []);

    useEffect(() => {
        filterQuestions();
    }, [priceCategory, questions]);

    const filterQuestions = () => {
        let filtered = questions;

        // Filter by price category
        if (priceCategory !== 'All') {
            filtered = filtered.filter(question => {
                const price = parseInt(question.price);
                switch (priceCategory) {
                    case 'Under 500':
                        return price < 500;
                    case '500 to 1000':
                        return price >= 500 && price < 1000;
                    case '1000 to 2000':
                        return price >= 1000 && price < 2000;
                    case '2000 to 3000':
                        return price >= 2000 && price < 3000;
                    case '3000 to 4000':
                        return price >= 3000 && price < 4000;
                    case '4000 to 5000':
                        return price >= 4000 && price < 5000;
                    case 'Over 5000':
                        return price >= 5000;
                    default:
                        return true;
                }
            });
        }

        setFilteredQuestions(filtered);
    };

    const addToCart = async (question) => {
        try {
            const response = await fetch('https://sports-kya6.onrender.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    image: question.image,
                    topic: question.topic,
                    description: question.description,
                    price: question.price
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            const data = await response.json();
            console.log('Item added to cart:', data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handlePriceCategoryChange = (category) => {
        setPriceCategory(category);
    };

    return (
        <>
            <Nav />
            <div className='container'>
                <aside className='sidebar'>
                    <h3>Price Categories</h3>
                    <ul>
                        <li><button onClick={() => handlePriceCategoryChange('All')}>All Price Categories</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('Under 500')}>Under ₹500</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('500 to 1000')}>₹500 - ₹1000</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('1000 to 2000')}>₹1000 - ₹2000</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('2000 to 3000')}>₹2000 - ₹3000</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('3000 to 4000')}>₹3000 - ₹4000</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('4000 to 5000')}>₹4000 - ₹5000</button></li>
                        <li><button onClick={() => handlePriceCategoryChange('Over 5000')}>Over ₹5000</button></li>
                    </ul>
                </aside>
                <div className='content'>
                    <div className='product-list'>
                        <ul>
                            {filteredQuestions.map(question => (
                                <li key={question._id} className="product">
                                    <img src={question.image} alt={question.topic} />
                                    <div className="product-details">
                                        <h2>{question.topic}</h2>
                                        <p>{question.description}</p>
                                        <p>Price: ₹{question.price}</p>
                                        <p>Category: {question.category}</p>
                                        <button onClick={() => addToCart(question)}>Add to Cart</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Kid;
