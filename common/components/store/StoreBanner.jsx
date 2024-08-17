"use client";

import React, { useState, useRef, use } from "react";
import { useInterval } from "@/common/hooks/useInterval";
import { heroImageData } from "@/common/constant/store-hero-data";

const StoreBanner = () => {
    const [index, setIndex] = useState(0);

    const slideHandler = () => {
        setIndex((prev) => (prev == 0 ? 1 : 0));
    };

    useInterval(slideHandler, 5000);

    return (
        <div className="bg-primary text-white ">
            <div className="max-w-next-max mx-auto w-full flex slide-viewer pl-3">
                {heroImageData.map((item, idx) => (
                    <div
                        className={`slide relative flex items-center justify-end  ${
                            index === idx ? "slide-active " : ""
                        }`}
                        key={idx}
                    >
                        <div className={`absolute left-0 z-3 ${idx === 1 ? "" : ""}`}>
                            <h4 className={"text-xs md:text-base mb-3"}> {item.hash}</h4>
                            <h3 className={"font-bold text-xs md:text-base"}>{item.header}</h3>
                            <p className={""}>{item.text}</p>
                        </div>
                        <div className="h-32 opacity-70">
                            <img src={item.url} alt="" className="h-full object-contain" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreBanner;
