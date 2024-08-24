"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// ui
// import PayPal from "../UI/PayPal";
//utils
import { getTotalAmount } from "@/common/helpers/utils";
// style
import styles from "@/common/modules/PlaceOrderPage.module.css";

const PlaceOrderPage = () => {
    const { cartList } = useSelector((state) => state.carts);
    const { order } = useSelector((state) => state.orders);
    const [makePayment, setMakePament] = useState(false);

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

    return <div>PlaceOrderPage</div>;
};

export default PlaceOrderPage;
