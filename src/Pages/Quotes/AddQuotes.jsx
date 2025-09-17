import React, { useState } from "react";
import { Trash2, ArrowLeft, Plus, OctagonX } from "lucide-react";
import { toast } from "react-toastify"; // optional if you're using toast
import { createQuote } from "../../Store/slices/QuoteSlice";
import { useDispatch } from "react-redux";
const AddQuotes = ({ setShowQuote, Refresh }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([{ item: "", description: "", qty: 1, price: 0 }]);
  const [form, setForm] = useState({
    client: "",
    year: "",
    status: "Draft",
    date: "",
    expireDate: "",
    note: "",
  });
  // Handle text/select changes
  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Handle items
  const addField = () => {
    setItems([...items, { item: "", description: "", qty: 1, price: 0 }]);
  };

  const removeField = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Calculate subtotal
  const subTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  // Save Quote
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        items,
        subTotal,
        tax: 0,
        total: subTotal,
      };

      await dispatch(createQuote(payload)).unwrap();

      toast.success("Quote created successfully!");

      // Go back to table after save
      setShowQuote("Table");
    } catch (error) {
      console.error(error);
      toast.error(error || "Error saving quote");
    } finally {
      Refresh()
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-6 w-[90%] min-h-[70vh] flex flex-col"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowQuote("Table")}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft />
            </button>
            <h2 className="text-xl font-bold">New</h2>
            <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-md border border-gray-300">
              {form.status}
            </span>
          </div>
          <div className="space-x-2 flex">
            <button
              onClick={() => setShowQuote("Table")}
              className="py-2 px-4 border cursor-pointer border-gray-300 rounded-xl text-sm font-semibold flex gap-2 items-center"
            >
              <OctagonX size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="py-2 px-4 cursor-pointer text-sm bg-blue-600 text-white font-semibold flex gap-2 rounded-xl items-center"
            >
              <Plus size={18} /> Save
            </button>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Client <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={form.client}
              onChange={(e) => handleFormChange("client", e.target.value)}
              placeholder="Enter client name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1">
              Year <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={form.year}
              onChange={(e) => handleFormChange("year", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              className="w-full border rounded px-2 py-1 cursor-pointer"
              value={form.status}
              onChange={(e) => handleFormChange("status", e.target.value)}
            >
              <option>Draft</option>
              <option>Pending</option>
              <option>Sent</option>
              <option>Accepted</option>
              <option>Decline</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={form.date}
              onChange={(e) => handleFormChange("date", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Expire Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1"
              value={form.expireDate}
              onChange={(e) => handleFormChange("expireDate", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Note</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={form.note}
              onChange={(e) => handleFormChange("note", e.target.value)}
            />
          </div>
        </div>

        {/* Item fields */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-12 gap-2 font-medium text-sm mb-2">
            <div className="col-span-2">Item</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
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
              <div className="col-span-1 px-2 truncate">
                ${(item.qty * item.price).toFixed(2)}
              </div>
              <button
                type="button"
                onClick={() => removeField(index)}
                className="col-span-1 cursor-pointer text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="mt-2 text-blue-600 font-medium cursor-pointer hover:underline"
          >
            + Add Field
          </button>
        </div>

        {/* Totals */}
        <div className="mt-6 space-y-2 text-right font-semibold">
          <div>
            Sub Total : <span className="font-medium">${subTotal.toFixed(2)}</span>
          </div>
          <div>
            Tax : <span className="font-medium">$0.00</span>
          </div>
          <div className="text-lg font-bold">Total : ${subTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default AddQuotes;
