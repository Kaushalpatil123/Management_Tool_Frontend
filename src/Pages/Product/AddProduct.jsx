import React, { useState } from "react";
import { ArrowLeft, OctagonX, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Store/slices/productSlice";
import { toast } from "react-toastify"; // optional if you're using toast

const AddProduct = ({ Refresh, setShowProduct }) => {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [productNo, setProductNo] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file); // save file for API
      setImage(URL.createObjectURL(file)); // preview
    } else {
      toast.error("Please select a valid image file!");
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!productName || !productNo || !file) {
      toast.error("Please fill all fields!");

      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productNo", productNo);
    formData.append("image", file);

    try {
      await dispatch(createProduct(formData)).unwrap(); // call redux thunk
      Refresh(); // refresh parent list
      setShowProduct("Table"); // go back to table
      toast.success("Product Added successfully!");

    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-6 w-[90%] min-h-[20vh] flex flex-col"
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
              onClick={() => setShowProduct("Table")}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft />
            </button>
            <h2 className="text-xl font-bold">New</h2>
          </div>
          <div className="space-x-2 flex">
            <button
              onClick={() => setShowProduct("Table")}
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
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded px-2 py-1"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Product No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={productNo}
              onChange={(e) => setProductNo(e.target.value)}
              className="w-full border rounded px-2 py-1"
              placeholder="Enter product no."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Image <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded px-2 py-1 cursor-pointer"
            />
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
