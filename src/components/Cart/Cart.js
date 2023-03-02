import React, {useContext, useState} from "react";

import style from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkuot from "./Checkuot";

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const orderhandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-food-app-76807-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={style['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={style.actions}>
            <button className={style['button--alt']} onClick={props.onClose} >Close</button>
            {hasItems && <button className={style.button} onClick={orderhandler}>Order</button>}
        </div>
    );

    const isSubmitingModalContect = (
        <p>Sending order data...</p>
    );

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <button className={style.button} onClick={props.onClose} >Close</button>
        </React.Fragment>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={style.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkuot onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmitingModalContect}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;