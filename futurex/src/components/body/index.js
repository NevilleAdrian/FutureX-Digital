import React from 'react'
import "./index.css"
import axios from 'axios'
import { useEffect, useState } from 'react';
import NavBar from '../navbar';
import { useSelector } from 'react-redux'
import { formattedCurrency } from '../../utils';


export default function Body() {

    //Get Currency from Redux Store
    const curr = useSelector(state => state.currency);



    //Retrieve products from graphql with unique currency
    const getProducts = () =>
        axios.get('https://fakestoreapi.com/products')
            .then(products => {
                setProducts(products.data)
            }).catch(err => console.log(err))


    // Initialized empty product state
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])


    //Initialized empty cart item state
    const [cartItems, setCartItems] = useState([])


    // Add Item Id
    const addItemId = (item) => {
        increment(item)
        window.scrollTo(0, 0);
    }


    //Check if cart item to be this ID
    const isInCart = (id) => {
        return cartItems.map(a => a.id).includes(id)
    }


    // Add count property to product
    const addCountToProduct = (product) => {
        return { ...product, count: cartItems.find(a => a.id === product.id).count }
    }


    //Increment individual cart item
    const increment = (id) => {
        if (!isInCart(id)) {
            setCartItems([...cartItems, { id, count: 1 }])
        }
        else {
            setCartItems(cartItems.map(a => a.id === id ? { ...a, count: a.count + 1 } : a))
        }
    }

    //Remove item from product
    const removeItem = (id) => {
        setCartItems(cartItems.filter(a => a.id !== id))
    }

    //Decrement individual Cart Item
    const decrement = (id) => {
        if (isInCart(id)) {
            const cartItem = cartItems.find(item => item.id === id)
            if (cartItem.count === 1) {
                removeItem(id)
            }
            else {
                setCartItems(cartItems.map(a => a.id === id ? { ...a, count: a.count - 1 } : a))
            }
        }

    }

    const [showNav, setShowNav] = useState(false)


    //Display sidebar
    const displayNav = (shouldShow) => {
        if (shouldShow) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        setShowNav(shouldShow)
        console.log(showNav)
    }

    //Remove all Items in Product
    const removeAllItems = () => {
        setCartItems([])
        localStorage.removeItem('data')
        console.log('deleted', cartItems)
    }

    //Add Cart Product
    const cartProducts = () => {
        var data = products.filter(product => isInCart(product.id)).map(product => addCountToProduct(product))
        addToLocalStorage(data)
        return getCartItemsInLocalStorage() || []
    }

    // Add Product to local storage
    const addToLocalStorage = (data) => {
        if (localStorage && data && data.length) {
            localStorage.setItem('data', JSON.stringify(data))
        }
    }

    //Retrieve Cart Items from Local Storage
    const getCartItemsInLocalStorage = () => {
        const data = localStorage.getItem('data')
        if (data) {
            return JSON.parse(data)
        }
    }


    return (
        <>
            <NavBar removeAll={removeAllItems} remove={removeItem} showNav={showNav} displayNav={displayNav} increment={increment} decrement={decrement} number={cartItems.length} items={cartProducts()} />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="main-weight">All Products</h1>
                        <p className="weight-100">A 360° look at FutureX</p>
                    </div>
                </div>
            </div>
            <div className="grey-bg">
                <div className="container-fluid py-5">
                    <div className="row">
                        {products.map((item) => (
                            <div key={item.id} className="col-md-6 col-lg-4 col-sm-6 margin-bottom">
                                <div className="text-center">
                                    <img alt="product-img" className="img-fluid img-height" src={item.image} />
                                </div>

                                <p className="text-center title">{item.title}</p>
                                <p className="text-center"><span>From</span> {formattedCurrency(item.price, curr)}</p>
                                <div className="text-center">
                                    <button onClick={() => addItemId(item.id)} className="button-primary ">Add to Cart</button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>


        </>
    )
}
