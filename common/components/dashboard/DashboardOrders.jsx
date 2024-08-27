import React, { useEffect } from "react";

import { useSales } from "@/common/context/sales-context";
import OrderUpdate from "./OrderUpdate";
// utils
import { getOrderDateTime } from "@/common/helpers/utils";
// style
import styles from "@/common/modules/DashboardOrders.module.css";
import LoadingSkeleton from "../reuseable/LoadingSkeleton";

const DashboardOrders = () => {
    const { orders, refresh, getOrders, sendOrderUpdate } = useSales();

    const getUpdate = (orderUpdate) => {
        sendOrderUpdate(orderUpdate);
    };

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [refresh]);

    return (
        <div className={`${styles.orders} orders`}>
            <h2>Recent orders</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Address</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders ? (
                            orders.map((order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.order.order_number}</td>
                                        <td className="min-w-[200px]">
                                            {order.order.first_name} {order.order.last_name}
                                        </td>
                                        <td className="min-w-[250px]">{order.product_name}</td>
                                        <td className="min-w-[250px]">
                                            {order.order.address_1}, {order.order.city} {order.order.state}{" "}
                                            {order.order.country}
                                        </td>
                                        <td className={styles.quantity}>{order.quantity}</td>
                                        <td>{`$${order.total_amount}`}</td>
                                        <td className="min-w-[150px]">{getOrderDateTime(order.order.updated)}</td>
                                        <td className={`${styles.status} ${order.status}`}>
                                            {" "}
                                            <span>{order.status}</span>{" "}
                                        </td>
                                        <td className="min-w-[180px]">
                                            <OrderUpdate getUpdate={getUpdate} order={order} />
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <>
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx}>
                                        <td colSpan={9} className="h-[50px]">
                                            <LoadingSkeleton />
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOrders;
