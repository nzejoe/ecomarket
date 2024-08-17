"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// icons
import { FiPlus, FiMinus } from "react-icons/fi";

// state
// import { addToCart, actions as cartActions } from "../../store/cart-slice";

import UserReview from "@/common/components/reviews/UserReview";
// ui
import NotFound from "@/common/components/reuseable/NotFound";
import ReviewStar from "@/common/components/reviews/ReviewStar";
import ReviewForm from "@/common/components/reviews/ReviewForm";
import MyReview from "@/common/components/reviews/MyReview";
import LoadingSpinner from "@/common/components/reuseable/LoadingSpinner";

const ProductDetailPage = ({ params }) => {
    const { token, authUser } = useSelector((state) => state.users);
    const [product, setProduct] = useState(null);
    const [defaultImage, setDefaultImage] = useState(null);
    const [isPurchased, setIsPurchased] = useState(true);
    const [reviews, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [brand, setBrand] = useState([]);

    // ADD TO CART
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [formHasError, setFormHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // page refresh on review submitted
    const [refresh, refreshPage] = useState(0);
    // user review
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [myReview, setMyReview] = useState(null);

    const { slug } = params;

    const dispatch = useDispatch();

    // TAB TOGGLER
    const [toggle, setToggle] = useState(1);

    // page title
    // document.title = `${product && product.product_name} | SafeKart`;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios({
                    url: `products/${slug}`,
                    method: "GET",
                    headers: {
                        authorization: token && `token ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setProduct(data.product);
                    // setIsPurchased(data.is_purchased);
                    setAlreadyReviewed(data.already_reviewed);
                    setLoading(false);
                }
            } catch (error) {
                console.log({ ...error });
                setLoading(false);
            }
        };

        getProduct();
    }, [slug, token, refresh]);

    // set variations
    useEffect(() => {
        if (product) {
            const colors = product.variations.colors && product.variations.colors;
            const sizes = product.variations.sizes && product.variations.sizes;
            const brand = product.variations.brand && product.variations.brand[0];
            setColors(colors);
            setSizes(sizes);
            setBrand(brand);
            setReview(product.reviews);
            setDefaultImage(product.image);
        }
    }, [product]);

    // variation check
    useEffect(() => {
        if (colors && colors.length > 0 && !selectedColor) {
            setFormHasError(true);
            setErrorMsg("Please choose color.");
        } else if (sizes && sizes.length > 0 && !selectedSize) {
            setFormHasError(true);
            setErrorMsg("Please choose size.");
        } else {
            setFormHasError(false);
            setErrorMsg("");
        }
    }, [colors, selectedColor, sizes, selectedSize]);

    // set user review
    useEffect(() => {
        if (alreadyReviewed) {
            const username = authUser && authUser.username;
            const review = reviews.find((review) => review.user === username);
            setMyReview(review);
        }
    }, [alreadyReviewed, authUser, reviews]);

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    // page refresh handler
    const handlePageRefresh = useCallback(() => {
        refreshPage(refresh + 1);
    }, [refresh]);

    // quantity value change handler
    const handleQuantityChange = (quantity) => {
        const maxValue = product && product.stock;
        let value = parseInt(quantity);

        if (value > maxValue) {
            setQuantity(maxValue);
        } else if (value < 1) {
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    // always check if user try to clear input value
    // because if they do if will result in error
    useEffect(() => {
        if (Number.isNaN(quantity)) {
            setQuantity(1); // set quantity to 1 if value cleared
        }
    }, [quantity]);

    // form submit
    const addItemHandler = (e) => {
        e.preventDefault();
        if (!formHasError) {
            // const variation_id = `${product.id}${selectedColor}${selectedSize}${product.variations.brand[0] || null}`;
            const variation = {
                brand: product.variations.brand[0] || null,
                color: selectedColor,
                size: selectedSize,
            };
            let data = {
                product_id: product.id,
                color: selectedColor,
                size: selectedSize,
                brand: brand || null,
                quantity,
            };
            // check if user is authenticated
            if (token) {
                // send to server
                dispatch(addToCart({ data, token }));
                return;
            }
            // save to storage
            data = {
                ...data,
                id: `${product.id}${selectedColor}${selectedSize}${product.variations.brand[0] || null}`,
                variation,
                product,
                total_amount: (quantity * product.price).toFixed(2),
            };
            dispatch(cartActions.guestAddToCart(data));
        }
    };

    // TAB TOGGLE HANDLER
    const handleTabToggle = (index) => {
        setToggle(index);
    };

    return (
        <section className={`section`}>
            <div className="section__wrapper">
                {loading && <LoadingSpinner isLoading={true} color="text-primary" />}
                {product && !loading && (
                    <div>
                        <div className={`border-b pb-20 xl:flex items-center space-x-10`}>
                            {/* img viewer */}
                            <div className={`flex items-center`}>
                                {/* product gallery thumbnail */}
                                <div className="gallery__thumbs">
                                    {product.gallery.map((img, index) => {
                                        return (
                                            <div
                                                className="thumb"
                                                key={index}
                                                onClick={(e) => setDefaultImage(img.image)}
                                            >
                                                <img src={img.thumb} alt={product.product_name} width="50" />
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* product default image */}
                                <div className={`w-full h-full py-8`}>
                                    <img src={defaultImage} alt={product.product_name}></img>
                                </div>
                            </div>
                            <div>
                                <div className={`mb-5`}>
                                    <h5 className="text-xl font-medium mb-1">{product.product_name}</h5>
                                    {brand && <p className="text-xs text-black/75 mb-2">{brand}</p>}
                                    <p className={`text-primary font-medium text-lg mb-2`}>
                                        $<span>{product.price}</span>
                                    </p>
                                    <div className="flex items-center space-x-10">
                                        <ReviewStar rating={product.rating} />
                                        <span className="text-xs">{`(${product.reviews.length} customer reviews)`}</span>
                                    </div>
                                </div>

                                {/* ADD TO CART FORM */}
                                <div className={`capitalize`}>
                                    <form>
                                        {formHasError && <h5 className="text-xs h-5">{errorMsg}</h5>}
                                        {colors.length > 0 && (
                                            <div className="mb-5">
                                                <h5 className={`mb-1`}>colors</h5>
                                                <div className="flex space-x-1">
                                                    {colors.map((color) => {
                                                        return (
                                                            <div className={`inline-block`} key={product.id + color}>
                                                                <label
                                                                    htmlFor={color}
                                                                    className={`text-white text-sm p-1 px-2 ${
                                                                        selectedColor === color
                                                                            ? "bg-black"
                                                                            : "bg-black/50"
                                                                    }`}
                                                                >
                                                                    {color}
                                                                </label>
                                                                <input
                                                                    type="radio"
                                                                    name="color"
                                                                    id={color}
                                                                    value={color}
                                                                    required={colors && true}
                                                                    checked={color === selectedColor}
                                                                    onChange={handleColorChange}
                                                                    className="hidden"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* product variation selector */}
                                        {sizes.length > 0 && (
                                            <div className="mb-5">
                                                <h5 className={`mb-1`}>Sizes</h5>
                                                <div className="flex space-x-1">
                                                    {sizes.map((size) => {
                                                        return (
                                                            <div className={``} key={product.id + size}>
                                                                <label
                                                                    htmlFor={size}
                                                                    className={`text-white text-sm p-1 px-2 ${
                                                                        selectedSize === size
                                                                            ? "bg-black"
                                                                            : "bg-black/50"
                                                                    }`}
                                                                >
                                                                    {size}
                                                                </label>
                                                                <input
                                                                    type="radio"
                                                                    name="size"
                                                                    id={size}
                                                                    value={size}
                                                                    required={sizes && true}
                                                                    checked={size === selectedSize}
                                                                    onChange={handleSizeChange}
                                                                    className="hidden"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* quantity */}
                                        <div className={`mb-5`}>
                                            <h5 className="mb-1">Quantity</h5>
                                            <div className="w-max flex items-center space-x-2 border rounded-xl ">
                                                <button
                                                    type="button"
                                                    className={`px-3 py-1`}
                                                    onClick={() => handleQuantityChange(quantity - 1)}
                                                >
                                                    {" "}
                                                    <FiMinus />{" "}
                                                </button>
                                                <input
                                                    type="text"
                                                    value={Number.isNaN(quantity) ? 1 : quantity} // if user clear quatity return 1 instead
                                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                                    className="eco-input !w-[50px] border text-center"
                                                />
                                                <button
                                                    type="button"
                                                    className={`px-3 py-1`}
                                                    onClick={() => handleQuantityChange(quantity + 1)}
                                                >
                                                    {" "}
                                                    <FiPlus className="font-bold" />{" "}
                                                </button>
                                            </div>
                                        </div>
                                        {/* submit button */}
                                        <div>
                                            <button
                                                className="button-lg button-outline bg-primary text-white"
                                                type="submit"
                                                onClick={addItemHandler}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT TAB CONTROLS */}
                        <div className={`capitalize flex space-x-2 py-5 font-medium text-xl`}>
                            <button
                                className={`border-b-[3px] hover:border-primary py-2 px-3 capitalize ${
                                    toggle === 1 ? `border-primary` : "border-transparent"
                                }`}
                                onClick={() => handleTabToggle(1)}
                            >
                                description
                            </button>
                            <button
                                className={`border-b-[3px] hover:border-primary py-2 px-3 capitalize ${
                                    toggle === 2 ? `border-primary` : "border-transparent"
                                }`}
                                onClick={() => handleTabToggle(2)}
                            >
                                reviews
                            </button>
                        </div>
                        {/* TAB CONTENTs */}
                        {/* Description */}
                        <div className={`${toggle === 1 ? `` : "hidden"}`}>
                            <p>{product && product.description}</p>
                        </div>
                        {/* REVIEW CONTAINER */}
                        <div className={`${toggle === 2 ? `` : "hidden"}`}>
                            {/* review form  */}
                            {!alreadyReviewed && isPurchased && (
                                <ReviewForm productId={product.id} handlePageRefresh={handlePageRefresh} />
                            )}
                            {/* end of review form */}
                            {/* REVIEWS */}
                            <div className={``}>
                                {/* user review */}
                                {myReview && alreadyReviewed && (
                                    <MyReview review={myReview} handleRefresh={handlePageRefresh} />
                                )}

                                {/* review list */}
                                {reviews && reviews.length !== 0 ? (
                                    <React.Fragment>
                                        {reviews.map((review) => {
                                            return <UserReview key={review.id} review={review} />;
                                        })}
                                    </React.Fragment>
                                ) : (
                                    <h4>No review for this product yet.</h4>
                                )}
                                {/* end of review list */}
                            </div>
                            {/* END OF REVIEWS */}
                        </div>
                        {/* END OF REVIEW CONTAINER */}
                    </div>
                )}
                {
                    // if no longer loading and no product was found
                    !loading && !product && <NotFound />
                }
            </div>
        </section>
    );
};

export default ProductDetailPage;
