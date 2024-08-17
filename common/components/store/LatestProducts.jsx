"use client";

import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getPaginatedProducts } from "@/common/helpers/utils";
import LoadingSkeleton from "../reuseable/LoadingSkeleton";
import ProductFilter from "./ProductFilter";
import StoreEmptyState from "../empty-state/StoreEmptyState";

const emptyProducts = Array.from({ length: 1 }).map((_) => Array.from({ length: 6 }).map((_, idx) => ({ id: idx })));

const LatestProducts = () => {
    const [query, setQuery] = useState("");
    const [selectedColor, setColor] = useState("all");
    const [selectedBrand, setBrand] = useState("all");
    const [selectedCategory, setCategory] = useState("all");
    const [price, setPrice] = useState(0);
    const [filteredProducts, setFIlterProducts] = useState(emptyProducts);

    const [page, setPage] = useState(0);

    const fetchData = () => {
        let url = "/products/";
        return axios.get(url);
    };

    const { isLoading, data, isSuccess } = useQuery({ queryKey: ["latest-products"], queryFn: () => fetchData() });

    const handlePage = (index) => {
        setPage(index);
    };

    const getFilteredProducts = (data) => {
        let tempProducts = data; // initiate products in every render
        setPage(0);

        if (query) {
            tempProducts = tempProducts.filter((product) =>
                product.product_name.toLowerCase().startsWith(query.toLowerCase())
            );
        }

        if (selectedColor !== "all") {
            tempProducts = tempProducts.filter((product) => product.variations.colors.includes(selectedColor));
        }

        if (selectedBrand !== "all") {
            tempProducts = tempProducts.filter((product) => product.variations.brand.includes(selectedBrand));
        }

        if (selectedCategory !== "all") {
            tempProducts = tempProducts.filter((product) => product.category === selectedCategory);
        }

        if (price) {
            tempProducts = tempProducts.filter((product) => parseFloat(product.price) <= price);
        }

        setFIlterProducts(getPaginatedProducts(tempProducts));
    };

    useEffect(() => {
        if (isSuccess) {
            getFilteredProducts(data.data);
        }
    }, [isSuccess, query, selectedCategory, selectedColor, selectedBrand, price]);

    return (
        <section className="section">
            <h1 className="text-xl mb-5">Latest products</h1>
            <div className="xl:grid grid-cols-7 gap-10">
                <div className="col-span-2">
                    <ProductFilter
                        query={query}
                        setQuery={setQuery}
                        selectedCategory={selectedCategory}
                        setCategory={setCategory}
                        selectedColor={selectedColor}
                        setColor={setColor}
                        selectedBrand={selectedBrand}
                        setBrand={setBrand}
                        price={price}
                        setPrice={setPrice}
                        products={data?.data || []}
                        isSuccess={isSuccess}
                    />
                </div>
                <div className="col-span-5">
                    {filteredProducts[0].length === 0 ? (
                        <StoreEmptyState />
                    ) : (
                        <div className="grid grid-cols-2 gap-2 mb-5 md:grid-cols-3 md:gap-5">
                            {filteredProducts[page].map((product) => (
                                <Fragment key={product.id}>
                                    {!isSuccess ? (
                                        <div className="h-[13rem] rounded-x overflow-hidden xl:h-[15rem]">
                                            <LoadingSkeleton />
                                        </div>
                                    ) : (
                                        <Link
                                            href={`/store/${product.slug}`}
                                            passHref={true}
                                            className="h-[15rem] flex flex-col justify-start  rounded-xv overflow-hidden border border-primary/20 xl:h-[15rem]"
                                        >
                                            <div className={"h-[60%] w-full relative mb-2"}>
                                                <img
                                                    src={product.image}
                                                    alt={product.product_name}
                                                    className="h-full w-full object-contain object-center"
                                                />
                                                <div className="absolute left-0 top-0 z-1 w-full h-full bg-primary/10"></div>
                                            </div>

                                            <div className="text-center px-3">
                                                <h4 className="text-xs md:text-sm xl:mb-2">{product.product_name}</h4>
                                                <div>
                                                    <div
                                                        className={
                                                            "text-sm text-primary font-semibold xl:mb-2 xl:text-lg"
                                                        }
                                                    >
                                                        $<span>{product.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    )}

                    {/* PAGINATION BUTTONS */}
                    <div className="w-full flex justify-end text-primary">
                        {filteredProducts && filteredProducts.length > 1 && (
                            <div className={"border border-primary rounded-xl"}>
                                <button
                                    onClick={() => handlePage(page - 1)}
                                    disabled={page === 0}
                                    className={`p-3 disabled:opacity-30`}
                                >
                                    Prev
                                </button>
                                {filteredProducts.map((product, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`py-3 px-5 ${
                                                page === index ? "bg-primary text-white font-semibold" : ""
                                            }`}
                                            onClick={() => handlePage(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handlePage(page + 1)}
                                    disabled={page === filteredProducts.length - 1}
                                    className={`p-3 disabled:opacity-30`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestProducts;
