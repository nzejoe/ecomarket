"use client";

import React, { useContext, useEffect } from "react";
import SalesProvider from "@/common/context/sales-context";
import { useSales } from "@/common/context/sales-context";

import TopSellingChart from "@/common/components/dashboard/TopSellingChart";
import DashboardOrders from "@/common/components/dashboard/DashboardOrders";
// style
import styles from "@/common/modules/AdminDashboard.module.css";
// context
// import { SalesContext } from "../../context/sales-context";

// utils
import { ordersCounter } from "@/common/helpers/utils";

const DashboardPage = () => {
    const { orders, getOrders, refresh } = useSales();

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [refresh]);

    return (
        <>
            <div className={`dashboard ${styles.main}`}>
                <div>
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
        </>
    );
};

export default DashboardPage;
