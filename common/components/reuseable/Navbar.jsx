"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

// redux
import { userLogout, actions as userActions } from "@/common/store/user-slice";
import { getCartList, actions as cartActions } from "@/common/store/cart-slice";

// icons
import { BsCart4, BsSearch } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { getTotalCart } from "@/common/helpers/utils";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();

    const { authUser } = useSelector((state) => state.users);
    const { cartList, refresh } = useSelector((state) => state.carts);

    // get user token
    const token = authUser && authUser.token;
    const totalCartItems = getTotalCart(cartList);

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

    const handleLogout = (e) => {
        dispatch(userLogout(token));
        dispatch(userActions.setLoginRedirect(null));
    };

    useEffect(() => {
        if (token) {
            dispatch(getCartList(token));
            return;
        } else {
            dispatch(cartActions.getGuestCartList());
        }
    }, [dispatch, token, refresh]);

    useEffect(() => {
        function runSetLink(e) {
            // if browser window is greater than 600px
            if (e.target.outerWidth > 600) {
                setToggle(false);
            }
        }
        window.addEventListener("resize", runSetLink);

        return () => window.removeEventListener("resize", runSetLink);
    }, []);

    return (
        <div className="w-screen bg-white fixed top-0 left-0 z-5">
            <nav className="max-w-next-max mx-auto w-full flex items-center justify-between px-5 py-3 xl:grid grid-cols-3">
                <div className="col-span-1">
                    <h5>EcoMarket</h5>
                </div>
                <div className="col-span-2">
                    <button className={`nav-toggle ${toggle ? "show" : ""} xl:hidden`} onClick={onToggle}>
                        <span className=""></span>
                    </button>
                    <div
                        className={`fixed w-full h-full transition-all top-0 z-5 text-white xl:text-secondary ${
                            toggle ? "right-0" : "-right-full"
                        } flex  flex-col justify-center items-center bg-primary xl:flex-row xl:static xl:justify-between xl:h-max xl:bg-inherit xl:max`}
                    >
                        <ul className="text-center mb-3 xl:flex xl:space-x-10 xl:text-left xl:mb-0">
                            {navItems.map((item, idx) => (
                                <li key={item.id}>
                                    <Link href={item.link}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center  xl:flex items-center space-x-5">
                            {/* CART */}
                            <Link
                                href="/carts/"
                                className={`relative w-max inline-block mb-3 xl:mb-0`}
                                onClick={() => setToggle(false)}
                            >
                                <BsCart4 className={`text-[2rem]`} />
                                <span className="absolute -right-3 -top-1 bg-black text-white  rounded-full w-5 h-5 text-xs flex justify-center items-center">
                                    {" "}
                                    {totalCartItems}
                                </span>
                            </Link>

                            {/* USER */}
                            <div className="relative capitalize group">
                                <div className={`flex flex-col items-center mb-3 xl:mb-0`}>
                                    <FaRegUser className={`text-[1.7rem]`} />
                                    <p className={`xl:text-xs`}>
                                        Welcome, {authUser ? authUser.username : "Guest"}{" "}
                                    </p>{" "}
                                </div>
                                <div className="xl:absolute right-0 xl:bg-white xl:shadow-md w-[200px] xl:hidden xl:group-hover:block">
                                    {authUser ? (
                                        <div className={``}>
                                            <Link
                                                href="/orders"
                                                className="block  mb-3 xl:hover:bg-primary xl:hover:text-white xl:py-2 xl:mb-0"
                                                onClick={() => setToggle(false)}
                                            >
                                                My orders
                                            </Link>{" "}
                                            <Link
                                                href="/accounts/password_change"
                                                className="block  mb-3 xl:hover:bg-primary xl:hover:text-white xl:py-2 xl:mb-0"
                                                onClick={() => setToggle(false)}
                                            >
                                                change password
                                            </Link>{" "}
                                            <button
                                                type="button"
                                                className="block w-full xl:hover:bg-primary xl:hover:text-white xl:py-2"
                                                onClick={handleLogout}
                                                title="Log out"
                                            >
                                                <AiOutlineLogout className={`text-[1.5rem] mx-auto`} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={``}>
                                            <Link
                                                href="/accounts/login"
                                                className="block xl:hover:bg-primary xl:hover:text-white xl:py-2"
                                                onClick={() => setToggle(false)}
                                            >
                                                log in
                                            </Link>{" "}
                                            <Link
                                                href="/accounts/signup"
                                                className="block xl:hover:bg-primary xl:hover:text-white xl:py-2"
                                                onClick={() => setToggle(false)}
                                            >
                                                register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
