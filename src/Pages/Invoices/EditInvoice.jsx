import React, { useState, useEffect } from "react";
import { Trash2, ArrowLeft, Plus, OctagonX } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateInvoice } from "../../Store/slices/invoiceSlice";

const EditInvoice = ({ setShowInvoice, Refresh, selectedInvoice }) => {
  const dispatch = useDispatch();

  // Prefill state with selectedInvoice data
  const [client, setClient] = useState("");
  const [year, setYear] = useState("");
  const [currency, setCurrency] = useState("$");
  const [status, setStatus] = useState("Draft");
  const [date, setDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([{ item: "", description: "", qty: 1, price: 0 }]);

  // Prefill values when selectedInvoice changes
  useEffect(() => {
    if (selectedInvoice) {
      setClient(selectedInvoice.client || "");
      setYear(selectedInvoice.year || "");
      setStatus(selectedInvoice.status || "Draft");
      setDate(selectedInvoice.date ? selectedInvoice.date.split("T")[0] : "");
      setExpireDate(selectedInvoice.expireDate ? selectedInvoice.expireDate.split("T")[0] : "");
      setNote(selectedInvoice.note || "");
      setItems(selectedInvoice.items || []);
    }
  }, [selectedInvoice]);

  // Add new item row
  const addItem = () => {
    setItems([...items, { item: "", description: "", qty: 1, price: 0 }]);
  };

  // Remove item row
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Calculate totals
  const subTotal = items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
  const tax = selectedInvoice?.tax || 0;
  const total = subTotal + tax;

  // Handle Save
  const handleSave = async () => {
    const updatedData = {
      client,
      year,
      status,
      date,
      expireDate,
      note,
      items,
      subTotal,
      tax,
      total,
    };

    try {
      await dispatch(updateInvoice({ id: selectedInvoice._id, updatedData })).unwrap();
      toast.success("Invoice updated successfully! 🎉");
      Refresh();
      setShowInvoice("Table");
    } catch (err) {
      console.error("Failed to update invoice:", err);
      toast.error(err.message || "Error updating invoice");
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
              onClick={() => setShowInvoice("Table")}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft />
            </button>
            <h2 className="text-xl font-bold">Edit</h2>
            <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-md border border-gray-300">
              {status}
            </span>
          </div>

          <div className="space-x-2 flex">
            <button
              onClick={() => setShowInvoice("Table")}
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

        {/* Form */}
        <div className="bg-white p-6 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold">Client <span className="text-red-600">*</span></label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Year <span className="text-red-600">*</span></label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Currency <span className="text-red-600">*</span></label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option>$ (US Dollar)</option>
                <option>€ (Euro)</option>
                <option>₹ (INR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option>Draft</option>
                <option>Sent</option>
                <option>Paid</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Date <span className="text-red-600">*</span></label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-4">

            <div>
              <label className="block text-sm font-semibold">Expire Date <span className="text-red-600">*</span></label>
              <input
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Enter note"
              />
            </div>
          </div>

          <hr />
          {/* Items Table */}
          <div>
            <div className="grid grid-cols-5 gap-4 text-sm font-semibold mb-2">
              <div>Item</div>
              <div>Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  className="border rounded-md px-2 py-1 text-sm"
                  value={item.item}
                  onChange={(e) => handleChange(index, "item", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="border rounded-md px-2 py-1 text-sm"
                  value={item.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                />
                <input
                  type="number"
                  className="border rounded-md px-2 py-1 text-sm"
                  value={item.qty}
                  onChange={(e) => handleChange(index, "qty", Number(e.target.value))}
                />
                <input
                  type="number"
                  className="border rounded-md px-2 py-1 text-sm"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", Number(e.target.value))}
                />
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 text-sm">
                    $ {(item.qty * item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Field */}
            <button
              onClick={addItem}
              className="mt-2 text-blue-600 hover:underline flex items-center gap-1 text-sm"
            >
              <Plus size={14} /> Add Field
            </button>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold">Sub Total :</span>
              <input
                type="text"
                value={`$ ${subTotal.toFixed(2)}`}
                readOnly
                className="border rounded-md px-3 py-1 text-sm w-32 text-right"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold">Tax :</span>
              <input
                type="text"
                value={`$ ${tax}`}
                readOnly
                className="border rounded-md px-3 py-1 text-sm w-32 text-right"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold">Total :</span>
              <input
                type="text"
                value={`$ ${total.toFixed(2)}`}
                readOnly
                className="border rounded-md px-3 py-1 text-sm w-32 text-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
