"use client";

import React from "react";

const PromoOffer = () => {
    return (
        <div className="bg-primary/20 py-10">
            <section className={`section text-center`}>
                <div className="">
                    <div className={""}>
                        <h2 className="text-black/20 mb-2">@ecomarket</h2>
                        <h1 className="text-2xl font-semibold mb-5">Up to 35% off on all items.</h1>
                        <p className="text-sm mb-2">Last chance to take advantage of our discounts!</p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="max-w-[30rem] mx-auto flex items-center px-3 border border-primary rounded-3xl bg-white overflow-hidden"
                        >
                            <input type="email" name="" id="" placeholder="Your email address" className="flex-1" />
                            <button
                                type="submit"
                                className="border-l py-2 pl-3 border-primary font-semibold text-primary"
                            >
                                subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PromoOffer;
