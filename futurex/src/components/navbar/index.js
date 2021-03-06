import { useEffect, useState } from 'react';
import "./index.css"
import Logo from "../../assets/images/logofx.png"
import Cart from "../../assets/images/cart.png"
import Arrow from "../../assets/images/left-arrow.png"
import X from "../../assets/images/x.png"
import { Currency } from '../mockdata'
import { myCurrency } from '../../store/actions/currency'
import { useSelector, useDispatch } from 'react-redux'
import { formattedCurrency } from '../../utils'
import PayPalBtn from "../paypal"




export default function NavBar({ increment, decrement, displayNav, showNav, remove, removeAll, items }) {

   //Get Currency from the redux store
    const curr = useSelector(state => state.currency);

    //Initialized didpatch functionality
    const dispatch = useDispatch();

    //Calculate total price
    const calculateItems = items.reduce((accumulator, current) => accumulator += current.count * current.price, 0)
    
    //Showpaypal popup
    const [showPaypal, setShowPayPal] = useState(false)

    const handleShowPayPal = () => {
        setShowPayPal(!showPaypal)
    }
    
   const [success, setSuccess] = useState('')
   
    //Printout payment details
    const paymentHandler = (details, data) => {
        console.log('data', data);
        setSuccess(details.status)
      }
  

    return (
        <>
            {showPaypal ? 
            <PayPalBtn
                    close ={handleShowPayPal}
                    amount = {calculateItems}
                    currency = {'USD'}
                    onSuccess = {paymentHandler}
                    success = {success}
                    /> :
                <>
                    <div className="nav-bottom">
                        <nav className="navbar navbar-expand-lg navbar-light nav-container ">

                            <img alt="logo" className="img-fluid logo" src={Logo} />
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                </ul>
                                <a className="nav-link pl-0">Account</a>

                                <a onClick={() => displayNav(true)} className="cart">
                                    <img alt="cart" className="cart-img" src={Cart} />
                                    <p className="cart-p">{items.length}</p>
                                </a>
                            </div>



                        </nav>

                    </div>
                    {showNav &&
                        <span>
                            <div className="transparent"></div>

                            <div className={showNav ? "overlay-fixed" : "overlay"}>
                                <div className="pt-3 pl-4 mb-5 pr-5">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button onClick={() => displayNav(false)} type="button" className="trans pl-0">
                                                <div className="button-arrow">
                                                    <img alt="arrow" className="arrow" src={Arrow} />
                                                </div>
                                            </button>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center">
                                            <p className="cart-text pb-0 mb-0">YOUR CART</p>

                                        </div>

                                    </div>
                                    <div className="pt-3">
                                        <select value={curr} onChange={({ target: { value } }) => dispatch(myCurrency(value))} className="input-dropdown">
                                            {Currency.map((cur) => (
                                                <option key={cur} value={cur}>{cur}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="pt-3">
                                        {items.map((item) => (
                                            <div key={item.id} className="white-bg mb-4 container-fluid">
                                                <div className="pt-3 row">
                                                    <div className="col-md-6">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img onClick={() => remove(item.id)} alt="cancel" className="img-fluid x-button  float-md-right" src={X} />
                                                    </div>

                                                </div>
                                                <div className="pb-1 row">
                                                    <div className="col-md-4 pt-5 ">
                                                        <form >
                                                            <input onClick={() => decrement(item.id)} type='button' value='-' className='qtyminus' field='quantity' />
                                                            <input type='text' name='quantity' value={item.count} className='qty' />
                                                            <input onClick={() => increment(item.id)} type='button' value='+' className='qtyplus' field='quantity' />
                                                        </form>
                                                    </div>
                                                    <div className="col-md-5 pt-5 ">
                                                        <p className="price">{formattedCurrency(item.price * item.count, curr)}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <img alt="cancel" className="img-fluid url-image float-md-left" src={item.image} />
                                                    </div>

                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="pt-5">
                                        <div className="top-border pt-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="float-md-left">Subtotal</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="float-md-right">{formattedCurrency(calculateItems, curr)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <button onClick={() => removeAll()} className="button-outline">
                                            CLEAR ITEMS
                           </button>
                                    </div>
                                    <div className="pt-4">
                                        <button onClick={handleShowPayPal} className="button-solid">
                                            PROCEED TO CHECKOUT
                          </button>
                                    </div>
                                </div>

                            </div>

                        </span>

                    }

                </>
            }


        </>
    )
}
