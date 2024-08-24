"use client";

import React from "react";
import Link from "next/link";

const OrderConfirmedPage = () => {
    return (
        <section className={`section `}>
            <div className="section__wrapper">
                <div>
                    <div className="mb-5">
                        <h3>Order confirmed</h3>
                        <p>Your order have been confirmed</p>
                    </div>
                    <Link href="/orders" className="btn btn-primary">
                        View orders
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmedPage;
