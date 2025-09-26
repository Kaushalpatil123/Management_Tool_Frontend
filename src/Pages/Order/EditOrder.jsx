import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateOrder } from "../../Store/slices/orderSlice";

const EditOrder = ({ setShowOrder, selectedOrder }) => {
    const dispatch = useDispatch();

    // Prefill state from selectedOrder
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [status, setStatus] = useState("Draft");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [notes, setNotes] = useState("");

    // Prefill form fields whenever selectedOrder changes
    useEffect(() => {
        if (selectedOrder) {
            setProductName(selectedOrder.productName || "");
            setQuantity(selectedOrder.quantity || 1);
            setPrice(selectedOrder.price || 0);
            setDiscount(selectedOrder.discount || 0);
            setStatus(selectedOrder.status || "Draft");
            setPhone(selectedOrder.phone || "");
            setState(selectedOrder.state || "");
            setCity(selectedOrder.city || "");
            setNotes(selectedOrder.notes || "");
        }
    }, [selectedOrder]);

    // Calculate total dynamically
    const total = quantity * price - discount;

    // Handle Save (Update API)
    const handleSave = () => {
        const updatedData = {
            productName,
            quantity,
            price,
            discount,
            status,
            phone,
            state,
            city,
            notes,
            total,
        };

        dispatch(updateOrder({ id: selectedOrder._id, orderData: updatedData }))
            .unwrap()
            .then(() => {
                toast.success("Quote updated successfully!");
                setShowOrder("Table");
            })
            .catch((err) => {
                console.error("Update failed:", err);
                alert("Failed to update order!");
            });
    };

    return (
        <div
            className="bg-white rounded-xl p-6 w-[90%] min-h-[70vh] flex flex-col"
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
        >
            <div className="bg-white p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowOrder("Table")}
                            className="p-2 cursor-pointer hover:bg-gray-100 rounded-full"
                        >
                            <ArrowLeft />
                        </button>
                        <h2 className="text-xl font-semibold">Edit</h2>
                        <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                            {status}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowOrder("Table")}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="text-sm font-medium">Product Name *</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter Product Name"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Quantity *</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            placeholder="Enter Quantity"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Enter Price"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Discount</label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            placeholder="Enter Discount"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium">Total</label>
                        <input
                            type="number"
                            value={total}
                            readOnly
                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded px-3 py-2 mt-1"
                        >
                            <option>Draft</option>
                            <option>Sent</option>
                            <option>Paid</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Phone"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Enter State"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter City"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Notes</label>
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Enter Notes"
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditOrder;
