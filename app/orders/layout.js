"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "@/common/store/user-slice";

const OrdersLayout = ({ children }) => {
    const { refresh } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUser());
    }, [dispatch, refresh]);

    return <div className="">{children}</div>;
};

export default OrdersLayout;
