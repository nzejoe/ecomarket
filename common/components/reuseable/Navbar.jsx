"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const navItems = [
        {
            id: 1,
            label: "Home",
            link: "/",
        },
        {
            id: 2,
            label: "Store",
            link: "/store",
        },
        {
            id: 3,
            label: "Dashboard",
            link: "#",
        },
    ];
    const onToggle = () => {
        setToggle((prev) => !prev);
    };

    return (
        <div className="w-screen bg-white fixed top-0 left-0 z-5">
            <nav className="max-w-next-max mx-auto w-full flex items-center justify-between px-5 py-5 xl:grid grid-cols-3">
                <div className="col-span-1">
                    <h5>EcoMarket</h5>
                </div>
                <div className="col-span-2">
                    <button className={`nav-toggle ${toggle ? "show" : ""} xl:hidden`} onClick={onToggle}>
                        <span className=""></span>
                    </button>
                    <div
                        className={`fixed w-full h-full transition-all top-0 z-5 ${
                            toggle ? "right-0" : "-right-full"
                        } flex  flex-col justify-center items-center bg-primary xl:flex-row xl:static xl:justify-between xl:h-max xl:bg-inherit xl:max`}
                    >
                        <ul className="xl:flex xl:space-x-10">
                            {navItems.map((item, idx) => (
                                <li key={item.id}>
                                    <Link href={item.link}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="-ml-4">
                            <p className="">Jonathan</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
