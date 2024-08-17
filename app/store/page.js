import React from "react";
import StoreBanner from "@/common/components/store/StoreBanner";
import LatestProducts from "@/common/components/store/LatestProducts";

const StorePage = () => {
    return (
        <div>
            <StoreBanner />
            <LatestProducts />
        </div>
    );
};

export default StorePage;
