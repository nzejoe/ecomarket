"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// ui
import PayPal from "@/common/components/reuseable/PayPal";
//utils
import { getTotalAmount } from "@/common/helpers/utils";
// style
import styles from "@/common/modules/PlaceOrderPage.module.css";

const PlaceOrderPage = () => {
    const { cartList } = useSelector((state) => state.carts);
    const { order } = useSelector((state) => state.orders);
    const [makePayment, setMakePament] = useState(false);

    const router = useRouter();

    const tax = ((2 / 100) * getTotalAmount(cartList)).toFixed(2);
    const totalAmount = getTotalAmount(cartList);
    const grandTotal = parseFloat(tax) + totalAmount;

    const handleMakePayment = () => {
        setMakePament(true);
    };

    // warning user of losing data if they refresh the browser
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            const confirmationMessage = "Are you sure you want to leave? You are in the middle of something.";
            e.returnValue = confirmationMessage;
            return confirmationMessage; // For some browsers (like Chrome) to actually show the message
        };

        // Add event listener for beforeunload
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    useEffect(() => {
        if (!order) {
            router.replace("/carts/checkout/");
        }
    }, [order]);

    console.log("order", order);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {order ? (
                <section className={`section`}>
                    <div className={`section__wrapper ${styles.place__order}`}>
                        <h2>Review your order and make paymant</h2>
                        <div className={styles.order__review}>
                            <div className={styles.address}>
                                <h4>Billing Adress</h4>
                                <p>
                                    {order.first_name} {order.middle_name} {""} {order.last_name}
                                </p>
                                <p>{order.email}</p>
                                <p>{order.address_1}</p>
                                <p>{order.address_2}</p>
                                <p>{order.city}</p>
                                <p>{order.state}</p>
                                <p>{order.country}</p>
                                <p>{order.phone}</p>
                            </div>
                            <div className={styles.order}>
                                <div className={styles.order__product}>
                                    <h4>Review products</h4>
                                    {cartList &&
                                        cartList.map((item) => {
                                            const { product, variation } = item;
                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        border: "1px solid rgba(0, 0, 0, .1)",
                                                        marginBottom: "1rem",
                                                        padding: "2rem",
                                                    }}
                                                    key={item.id}
                                                >
                                                    <div className="cart__item_img">
                                                        <img
                                                            src={product.image}
                                                            alt={product.product_name}
                                                            style={{ width: "100px" }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4>{product.product_name}</h4>
                                                        {variation.color && (
                                                            <p>
                                                                color:{" "}
                                                                <span className={styles.value}>{variation.color}</span>
                                                            </p>
                                                        )}
                                                        {variation.size && (
                                                            <p>
                                                                size:{" "}
                                                                <span className={styles.value}>{variation.size}</span>
                                                            </p>
                                                        )}
                                                        {variation.brand && (
                                                            <p>
                                                                brand:{" "}
                                                                <span className={styles.value}>{variation.brand}</span>
                                                            </p>
                                                        )}
                                                        <p>
                                                            price:{" "}
                                                            <span className={styles.value}>
                                                                $<span>{product.price}</span>
                                                            </span>
                                                        </p>
                                                        <p>
                                                            quantity:{" "}
                                                            <span className={styles.value}>{item.quantity}</span>
                                                        </p>
                                                        <p>
                                                            amount:{" "}
                                                            <span className={styles.value}>
                                                                $<span>{item.total_amount}</span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className={styles.cost__container}>
                                    <div className={styles.cost}>
                                        <div className={styles.header}>
                                            <h4>Cost of order</h4>
                                        </div>
                                        <div className={styles.body}>
                                            <p>
                                                Total amount:{" "}
                                                <span className={styles.value}>
                                                    $<span>{totalAmount}</span>
                                                </span>
                                            </p>
                                            <p>
                                                Tax:{" "}
                                                <span className={styles.value}>
                                                    $<span>{tax}</span>
                                                </span>
                                            </p>
                                            <p>
                                                Grand total:{" "}
                                                <span className={styles.value}>
                                                    $<span>{grandTotal}</span>
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            {makePayment ? (
                                                <PayPal totalAmount={totalAmount} grandTotal={grandTotal} tax={tax} />
                                            ) : (
                                                <div className={styles.btn__payment}>
                                                    <button type="button" onClick={handleMakePayment}>
                                                        make payment
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                ""
            )}
        </Suspense>
    );
};

export default PlaceOrderPage;
