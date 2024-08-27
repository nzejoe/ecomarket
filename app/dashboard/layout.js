"use client";

import React from "react";
import SalesProvider from "@/common/context/sales-context";

const DashboardLayout = ({ children }) => {
    return (
        <SalesProvider>
            <div>{children}</div>
        </SalesProvider>
    );
};

export default DashboardLayout;
