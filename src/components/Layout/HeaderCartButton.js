import React, { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const {items} = cartCtx;

    const btnStyle = `${style.button} ${btnIsHighlighted ? style.bump : ''}`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnStyle} onClick={props.onClick} >
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;