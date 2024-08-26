"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "@/common/components/reuseable/LoadingSpinner";

// utils
import { getOrderDate } from "@/common/helpers/utils";

const OrdersPage = () => {
    const { authUser } = useSelector((state) => state.users);
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = useCallback(async () => {
        const token = authUser && authUser.token;
        if (!token) return;

        setIsLoading(true);

        try {
            const response = await axios.get("/orders/order_history/", {
                headers: { Authorization: `token ${token}` },
            });
            if (response.status === 200) {
                setOrders(response.data);
            }
        } catch (error) {
            const err = { ...error };
            console.log(err.response);
        } finally {
            setIsLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    return (
        <section className={`section `}>
            {isLoading ? (
                <div className="section__wrapper flex items-center justify-center h-80">
                    <LoadingSpinner isLoading={true} color="text-primary" />
                </div>
            ) : (
                <div className="section__wrapper">
                    <h2 className="text-3xl font-semibold mb-10 capitalize">order history</h2>
                    <div className="border rounded-xl">
                        {orders ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead className="">
                                        <tr className="[&>th]:border-b [&>th]:bg-primary-light">
                                            <th>#</th>
                                            <th>Order number</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => {
                                            return (
                                                <tr key={order.id} className="hover">
                                                    <td style={{ padding: "1rem" }}>{orders.indexOf(order) + 1}</td>
                                                    <td style={{ padding: "1rem" }}>
                                                        <Link href={`/orders/${order.order_number}`} className="link">
                                                            {order.order_number}
                                                        </Link>
                                                    </td>
                                                    <td style={{ padding: "1rem" }}>{getOrderDate(order.created)}</td>
                                                    <td style={{ padding: "1rem" }}>
                                                        $<span>{order.grand_total}</span>
                                                    </td>
                                                    <td>{order.is_ordered && "Ordered"}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>You have no orders yet.</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrdersPage;
