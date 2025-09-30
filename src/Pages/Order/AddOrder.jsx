import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Store/slices/orderSlice";
import { toast } from "react-toastify"; // optional if you're using toast
import { fetchProducts } from "../../Store/slices/productSlice";

const AddOrder = ({ setShowOrder }) => {
  const dispatch = useDispatch();

  // States for form fields
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const { items: products } = useSelector(
    (state) => state.products
  );


  console.log("scscs", products)

  // Calculate total dynamically
  const total = quantity * price - discount;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // Handle save
  const handleSave = () => {
    // Validation
    if (!productName) {
      toast.error("⚠️ Please select a product name");
      return;
    }
    if (!quantity || quantity <= 0) {
      toast.error("⚠️ Quantity must be greater than 0");
      return;
    }
    if (!price || price <= 0) {
      toast.error("⚠️ Price must be greater than 0");
      return;
    }
    if (!phone || phone.length !== 10) {
      toast.error("⚠️ Phone number must be 10 digits");
      return;
    }

    // If validation passes
    const orderData = {
      productName,
      quantity,
      price,
      discount,
      total,
      status,
      phone,
      state,
      city,
      notes,
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        toast.success(" Order created successfully");
        setShowOrder("Table");
      })
      .catch((err) => {
        console.log("❌ Error:", err);
        toast.error("Failed to create order. Please try again.");
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
            <h2 className="text-xl font-semibold">New</h2>
            <span className="px-2 py-1 text-sm bg-gray-200 rounded">{status}</span>
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
            <label className="text-sm font-medium">Product Name <span className="text-red-600">*</span></label>
            <select
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            >
              <option value="">-- Select Product --</option>
              {products && products.length > 0 ? (
                products.map((prod) => (
                  <option key={prod._id} value={prod.productName}>
                    {prod.productName}
                  </option>
                ))
              ) : (
                <option disabled>No products available</option>
              )}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity <span className="text-red-600">*</span></label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter Quantity"
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price <span className="text-red-600">*</span></label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter Price"
              className="w-full border rounded px-3 py-2 mt-1"
              required
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
            <label className="text-sm font-medium">Status <span className="text-red-600">*</span></label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            >
              <option>Draft</option>
              <option>Sent</option>
              <option>Paid</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Phone <span className="text-red-600">*</span></label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              pattern="[0-9]{10}"
              placeholder="Enter Phone"
              className="w-full border rounded px-3 py-2 mt-1"
              required
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

export default AddOrder;
