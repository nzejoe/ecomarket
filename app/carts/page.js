"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

// store
import { getCartList, actions as cartActions } from "@/common/store/cart-slice";
import { actions as userActions } from "@/common/store/user-slice";

import CartItem from "@/common/components/carts/CartItem";
//utils
import { getTotalAmount } from "@/common/helpers/utils";
// style
import styles from "@/common/modules/CartPage.module.css";

const CartsPage = () => {
    const { authUser } = useSelector((state) => state.users);
    const { cartList, refresh } = useSelector((state) => state.carts);

    const dispatch = useDispatch();

    const totalAmount = getTotalAmount(cartList);

    useEffect(() => {
        const token = authUser && authUser.token;
        if (token) {
            dispatch(getCartList(token));
            return;
        }
        dispatch(cartActions.getGuestCartList());
    }, [dispatch, authUser, refresh]);

    const handleCheckout = () => {
        if (!authUser) {
            dispatch(userActions.setLoginRedirect("/checkout/"));
        }
    };

    return (
        <section className={`section `}>
            <div className={`section__wrapper ${styles.cart__page}`}>
                <h2>Shopping Cart</h2>
                <div className={styles.cart__list_container}>
                    <div className={styles.cart__list}>
                        {cartList &&
                            cartList.map((item) => {
                                return <CartItem key={item.id} item={item} styles={styles} />;
                            })}
                        {cartList && cartList.length === 0 && (
                            <div>
                                <h4>Your shopping cart is empty.</h4>
                            </div>
                        )}
                    </div>
                    {cartList && cartList.length > 0 && (
                        <div className={styles.cart__amount_container}>
                            <div className={styles.cart__amount}>
                                <div className={styles.header}>
                                    <h3>Cost of order</h3>
                                </div>
                                <div className={styles.body}>
                                    <h4>
                                        total amount: <span>$</span>
                                        <span>{totalAmount.toFixed(2)}</span>
                                    </h4>
                                </div>
                            </div>
                            <div className={styles.btn__checkout}>
                                <Link href="/checkout/" onClick={handleCheckout}>
                                    checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CartsPage;
