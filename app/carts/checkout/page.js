"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { actions as userActions } from "@/common/store/user-slice";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = Boolean(localStorage.getItem("safekartUser"));

        if (!isAuthenticated) {
            dispatch(userActions.setLoginRedirect("/carts/checkout"));
            router.replace("/accounts/login");
        }
    }, [router, dispatch]);

    return (
        <Suspense fallback={"wait"}>
            <div>CheckoutPage</div>
        </Suspense>
    );
};

export default CheckoutPage;
