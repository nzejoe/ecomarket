"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "@/common/store/user-slice";

const StoreLayout = ({ children }) => {
    const { refresh } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUser());
    }, [dispatch, refresh]);

    return <div>{children}</div>;
};

export default StoreLayout;
