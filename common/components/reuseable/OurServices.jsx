import React from "react";
import { BsTruck, BsArchive, BsShieldCheck, BsHeadset } from "react-icons/bs";

const OurServices = () => {
    const items = [
        {
            id: 1,
            title: "Nationwide Shipping",
            offer: "Get free shipping over $75",
            icon: <BsTruck className="text-5xl mx-auto" />,
        },
        {
            id: 2,
            title: "Free Returns",
            offer: "30 days free return policy",
            icon: <BsArchive className="text-5xl mx-auto" />,
        },
        {
            id: 3,
            title: "Secured Payments",
            offer: "Accept major credit cards",
            icon: <BsShieldCheck className="text-5xl mx-auto" />,
        },
        {
            id: 4,
            title: "Support Service",
            offer: "Top notch customer service",
            icon: <BsHeadset className="text-5xl mx-auto" />,
        },
    ];
    return (
        <div className="py-10 border-t">
            <section className="section text-black">
                <div className="md:grid grid-cols-2 gap-5 xl:grid-cols-4">
                    {items.map((service, idx) => (
                        <div key={service.id} className={"mb-5 text-center"}>
                            <div className={"mb-3"}>{service.icon}</div>
                            <div className="">
                                <h5 className="text-xl font-semibold">{service.title}</h5>
                                <p className="">{service.offer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OurServices;
