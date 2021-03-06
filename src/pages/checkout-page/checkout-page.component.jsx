import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

// import StripeCheckout from 'react-stripe-checkout'
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component"

import CheckoutItem from "../../components/checkout-item/checkout-item.component"

import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors"

import "./checkout-page.styles.scss"

const CheckoutPage = ({cartItems, totalValue}) => {

    // console.log(cartItems);
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)
            }
            <div className="total">
                Total: $ {totalValue}
            </div>
            <StripeCheckoutButton price={totalValue} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalValue: selectCartTotal
})

export default connect(mapStateToProps,null)(CheckoutPage);
