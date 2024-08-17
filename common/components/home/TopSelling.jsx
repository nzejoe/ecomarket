"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// swipperjs
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";
import LoadingSkeleton from "@/common/components/reuseable/LoadingSkeleton";

const TopSelling = () => {
    const fetchData = () => {
        let url = "/products/top_products/";
        return axios.get(url);
    };

    const { isLoading, data, isSuccess } = useQuery({
        queryKey: ["top-products"],
        queryFn: () => fetchData(),
    });

    const topProducts = isSuccess ? data.data : Array.from({ length: 6 }).map((_, idx) => ({ id: idx }));

    return (
        <section className="section ">
            <h1 className="text-xl mb-5">Best sellers</h1>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {topProducts.map((product) => {
                    return (
                        <SwiperSlide key={product.id}>
                            {!isSuccess ? (
                                <div className="h-[13rem] rounded-x overflow-hidden xl:h-[20rem]">
                                    <LoadingSkeleton />
                                </div>
                            ) : (
                                <div
                                    className={
                                        "h-[13rem] flex flex-col justify-between border rounded-xv p-3 xl:h-[15rem] xl:p-5"
                                    }
                                >
                                    <div className={"h-[40%] w-full"}>
                                        <img
                                            src={product.image}
                                            alt={product.product_name}
                                            className="h-full w-full object-contain object-center"
                                        ></img>
                                    </div>
                                    <div className={"flex-1 flex flex-col justify-between items-center"}>
                                        <div>
                                            <h4 className="text-xs md:text-sm xl:mb-2">
                                                {product.product_name.length > 40
                                                    ? `${product.product_name.slice(0, 40)}...`
                                                    : product.product_name}
                                            </h4>
                                            <div className="text-sm text-primary font-semibold xl:mb-2 xl:text-lg">
                                                <span>$</span>
                                                <span>{product.price}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="button-sm bg-secondary text-white">view</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ); // set it to grid view
                })}
            </Swiper>
        </section>
    );
};

export default TopSelling;
