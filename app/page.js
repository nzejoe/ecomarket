"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeHero from "@/common/components/home/HomeHero";
import PromoOffer from "@/common/components/reuseable/PromoOffer";
import TopCategories from "@/common/components/home/TopCategories";
import TopSelling from "@/common/components/home/TopSelling";
import { actions as userActions } from "@/common/store/user-slice";

export default function Home() {
    const { refresh } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setUser());
    }, [dispatch, refresh]);

    return (
        <main className="">
            <HomeHero />
            <TopCategories />
            <TopSelling />
            <PromoOffer />
        </main>
    );
}
