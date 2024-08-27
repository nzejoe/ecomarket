"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "@/common/store/user-slice";
import { useSales } from "@/common/context/sales-context";

import TopSellingChart from "@/common/components/dashboard/TopSellingChart";
import DashboardOrders from "@/common/components/dashboard/DashboardOrders";
import LoadingSpinner from "@/common/components/reuseable/LoadingSpinner";
// style
import styles from "@/common/modules/AdminDashboard.module.css";
// context
// import { SalesContext } from "../../context/sales-context";

// utils
import { ordersCounter } from "@/common/helpers/utils";

const DashboardPage = () => {
    const { orders, getOrders, refresh } = useSales();

    const { refresh: refreshUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUser());
    }, [dispatch, refreshUser]);

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [refresh]);

    return (
        <>
            {!orders ? (
                <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner isLoading={true} color="text-primary" />
                </div>
            ) : (
                <div className={`dashboard ${styles.main}`}>
                    <div className="max-w-md">
                        <TopSellingChart />
                    </div>
                    <div className={`${styles.order__cards}`}>
                        <div className={styles.orders__card}>
                            <h2>Total Orders</h2>
                            <h3>{ordersCounter(orders, null)}</h3>
                        </div>
                        <div className={`${styles.orders__card} ${styles.pending}`}>
                            <h2>Pending Orders</h2>
                            <h3>{ordersCounter(orders, "pending")}</h3>
                        </div>
                        <div className={`${styles.orders__card} ${styles.delivered}`}>
                            <h2>Delivered Orders</h2>
                            <h3>{ordersCounter(orders, "delivered")}</h3>
                        </div>
                    </div>
                    <DashboardOrders />
                </div>
            )}
        </>
    );
};

export default DashboardPage;
