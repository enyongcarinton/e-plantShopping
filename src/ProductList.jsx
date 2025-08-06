import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

// 🔴 NEW: Redux hook import
import { useDispatch } from 'react-redux';

// 🔴 NEW: Redux action import
import { addItem } from './CartSlice'; // ✅ FIXED import path


function ProductList({ onHomeClick }) {
    const dispatch = useDispatch(); // 🔴 NEW: Initialize Redux dispatch
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    // 🔴 NEW: Create state to track which products are added
    const [addedToCart, setAddedToCart] = useState({});

    // 🔴 NEW: Handle adding items to Redux store and UI state
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // 🔴 NEW: Dispatch to global state
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true, // 🔴 NEW: Mark this product as added
        }));
    };

    const plantsArray = [/* Your original plant data stays unchanged here */];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // ✅ FIXED typo from alignIems to alignItems
        fontSize: '20px',
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    };

    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    </div>
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none" stroke="#faf9f9" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="2">
                                    </path>
                                </svg>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">${plant.cost}</div>

                                        {/* 🔴 NEW: Conditionally show button text and disable if already added */}
                                        {addedToCart[plant.name] ? (
                                            <button className="product-button" disabled>
                                                Added
                                            </button>
                                        ) : (
                                            <button className="product-button" onClick={() => handleAddToCart(plant)}>
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
