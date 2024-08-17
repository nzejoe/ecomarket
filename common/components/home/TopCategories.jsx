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

const TopCategories = () => {
    const fetchData = () => {
        let url = "/products/categories/";
        return axios.get(url);
    };

    const { isLoading, data, isSuccess } = useQuery({
        queryKey: ["top-categories"],
        queryFn: () => fetchData(),
    });

    const topCategories = isSuccess ? data.data : Array.from({ length: 4 }).map((_, idx) => ({ id: idx }));

    return (
        <section className="section">
            <h1 className="text-xl mb-5">Top categories</h1>
            <div className={""}>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {topCategories.map((category, idx) => (
                        <SwiperSlide key={category.id}>
                            {!isSuccess ? (
                                <div className="h-[12.2rem] rounded-x overflow-hidden mb-5 md:mb-0 md:h-[16rem] xl:h-[20rem]">
                                    <LoadingSkeleton />
                                </div>
                            ) : (
                                <div
                                    className={
                                        "h-[13rem] md:h-[16rem] xl:h-[20rem] relative border border-primary rounded-xv overflow-hidden mb-5 md:mb-0"
                                    }
                                >
                                    <div className={"w-full h-full"}>
                                        <img
                                            src={category.image}
                                            alt={category.product_name}
                                            className="w-full h-full object-cover"
                                        ></img>
                                        <div className={"absolute top-1/2 px-5"}>
                                            <h2 className="font-semibold mb-2">{category.name}</h2>
                                            <button className="button-regular button-outline border border-primary text-primary bg-white hover:bg-primary hover:text-white">
                                                shop now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TopCategories;
