import React from "react";
import Link from "next/link";

const HomeHero = () => {
    return (
        <div>
            <div className="relative">
                <div className="h-screen w-full">
                    <img src="/images/home/home-hero.jpg" alt="home image" className="w-full h-full object-cover" />
                </div>
                <div className="absolute left-0 top-0 px-5 pt-4 text-primary md:top-20 xl:top-32 xl:left-20">
                    <div className="text-xs">
                        <h2 className="text-2xl md:text-3xl mb-4 xl:text-5xl">
                            Welcome to <span className="font-bold">EcoMarket</span>
                        </h2>
                        <p className="max-w-[500px] md:text-xl xl:max-w-[600px]">
                            Your destination for sustainable living. Shop ethically-sourced, eco-friendly products with
                            confidence.
                        </p>
                    </div>
                    <div className={"mt-5 md:mt-10"}>
                        <Link href={"/store"} className={`button-lg bg-primary text-white`}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHero;
