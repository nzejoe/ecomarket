import React, { useState } from "react";

const OrderUpdate = ({ getUpdate, order }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [selected, setSelected] = useState(order.status);

    const submitHandler = (e) => {
        e.preventDefault();
        //
        const orderUpdate = { ...order, status: selected, order: order.order.id };
        getUpdate(orderUpdate);
        setIsUpdate(false);
    };

    return (
        <React.Fragment>
            <div>
                {!isUpdate ? (
                    <button className={`btn btn-secondary`} onClick={() => setIsUpdate(true)}>
                        Update
                    </button>
                ) : (
                    <form onSubmit={submitHandler}>
                        <select
                            name=""
                            id=""
                            value={selected}
                            className="eco-input"
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="out for delivery">Out for delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <br />
                        <div className="flex space-x-2">
                            <button className={`btn btn-sm btn-primary`} type="submit">
                                Save
                            </button>
                            <button
                                className={`btn btn-sm btn-primary btn-outline`}
                                type="submit"
                                onClick={() => setIsUpdate(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </React.Fragment>
    );
};

export default OrderUpdate;
