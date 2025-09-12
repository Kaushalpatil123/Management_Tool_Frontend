import React, { useState } from 'react'
import { Trash2, ArrowLeft, Plus, OctagonX } from "lucide-react";

const AddQuotes = ({ setShowQuote }) => {
    const [items, setItems] = useState([{ item: "", description: "", qty: 1, price: 0 }]);


    console.log("vsvs", items)
    // Add new field
    const addField = () => {
        setItems([...items, { item: "", description: "", qty: 1, price: 0 }]);
    };

    // Remove field
    const removeField = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    // Handle change
    const handleChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    // Calculate subtotal
    const subTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return (
        <div
            className="bg-white rounded-xl p-6 w-[90%] min-h-[70vh] flex flex-col"
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
        >
            {/* Header
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setShowQuote("Table")} className="p-2 hover:bg-gray-100 rounded-full">←</button>
                <h2 className="text-lg font-semibold">New</h2>
              </div> */}
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">

                    <div className='flex gap-2 align-middle items-center'>
                        <button 
                        onClick={() => setShowQuote("Table")}
                         className="p-2 cursor-pointer hover:bg-gray-100 rounded-full"><ArrowLeft  /></button>
                        
                        <h2 className="text-xl font-bold">  New </h2>
                        <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-md border border-gray-300">Draft</span>
                    </div>
                    <div className="space-x-2 flex">
                        <button onClick={() => setShowQuote("Table")} className="py-2 px-4 cursor-pointer border border-gray-300 rounded-xl text-sm font-semibold flex gap-2 justify-center align-middle items-center"> <OctagonX size={18} />Cancel</button>
                        <button className="py-2 px-4 text-sm bg-blue-600 text-white cursor-pointer font-semibold flex gap-2 rounded-xl justify-center align-middle items-center"> <Plus size={18} /> Save</button>
                    </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm  mb-1 font-semibold">Client <span className='text-red-600'>*</span></label>
                        <select className="w-full border rounded px-2 py-1">
                            <option>Search</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1 font-semibold">Number <span className='text-red-600'>*</span></label>
                        <input type="text" className="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Year <span className='text-red-600'>*</span></label>
                        <input type="text" className="w-full border rounded px-2 py-1" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold mb-1">Status</label>
                        <select className="w-full border rounded px-2 py-1 cursor-pointer">
                            <option className='cursor-pointer'>Draft</option>
                            <option className='cursor-pointer'>Pending</option>
                            <option className='cursor-pointer'>Sent</option>
                            <option className='cursor-pointer'>Accepted</option>
                            <option className='cursor-pointer'>Decline</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Date <span className='text-red-600'>*</span></label>
                        <input type="date" className="w-full border rounded px-2 py-1" defaultValue="2025-12-09" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Expire Date <span className='text-red-600'>*</span></label>
                        <input type="date" className="w-full border rounded px-2 py-1" defaultValue="2025-12-10" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Note</label>
                        <input type="text" className="w-full border rounded px-2 py-1" />
                    </div>
                </div>

                {/* Item fields */}
                <div className="border-t pt-4">
                    <div className="grid grid-cols-12 gap-2 font-medium text-sm mb-2">
                        <div className="col-span-2 font-semibold">Item</div>
                        <div className="col-span-4 font-semibold">Description</div>
                        <div className="col-span-2 font-semibold">Quantity</div>
                        <div className="col-span-2 font-semibold">Price</div>
                        <div className="col-span-2 font-semibold">Total</div>
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                            <input
                                type="text"
                                placeholder="Item Name"
                                className="col-span-2 border rounded px-2 py-1"
                                value={item.item}
                                onChange={(e) => handleChange(index, "item", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="col-span-4 border rounded px-2 py-1"
                                value={item.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                            />
                            <input
                                type="number"
                                className="col-span-2 border rounded px-2 py-1"
                                value={item.qty}
                                onChange={(e) => handleChange(index, "qty", Number(e.target.value))}
                            />
                            <input
                                type="number"
                                className="col-span-2 border rounded px-2 py-1"
                                value={item.price}
                                onChange={(e) => handleChange(index, "price", Number(e.target.value))}
                            />
                            <div className="col-span-1 px-2 truncate">${(item.qty * item.price).toFixed(2)}</div>
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="col-span-1 text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addField}
                        className="mt-2 text-blue-600 font-medium hover:underline cursor-pointer"
                    >
                        + Add Field
                    </button>
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2 text-right font-semibold">
                    <div>Sub Total : <span className="font-medium">${subTotal.toFixed(2)}</span></div>
                    <div>Tax : <span className="font-medium">$0.00</span></div>
                    <div className="text-lg font-bold">Total : ${subTotal.toFixed(2)}</div>
                </div>

                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">+ Save</button>
            </div>



        </div>
    )
}

export default AddQuotes