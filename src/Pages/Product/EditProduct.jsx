import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ArrowLeft, OctagonX, Plus } from "lucide-react";
import config from "../../config/api";
import { updateProduct } from "../../Store/slices/productSlice";
import { toast } from "react-toastify"; // optional if you're using toast

const EditProduct = ({ Refresh, setShowProduct, product }) => {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [productNo, setProductNo] = useState("");
  const [image, setImage] = useState(null); // preview
  const [file, setFile] = useState(null); // actual file

  // Prefill values when product changes
  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setProductNo(product.productNo || "");
      setImage(product.imageUrl ? `${config.backendUrl}${product.imageUrl}` : null);
    }
  }, [product]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file); // keep actual file for upload
      setImage(URL.createObjectURL(file)); // preview
    } else {
      alert("Please select a valid image file!");
    }
  };

  // Update product using Redux thunk
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productNo", productNo);
      if (file) {
        formData.append("image", file);
      }
      // Dispatch updateProduct thunk
      await dispatch(updateProduct({ id: product._id, formData })).unwrap();
      toast.success("Product updated successfully!");

      Refresh(); // refresh table
      setShowProduct("Table"); // go back
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product!");
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
            <h2 className="text-xl font-bold">Edit Product</h2>
          </div>
          <div className="space-x-2 flex">
            <button
              onClick={() => setShowProduct("Table")}
              className="py-2 px-4 border cursor-pointer border-gray-300 rounded-xl text-sm font-semibold flex gap-2 items-center"
            >
              <OctagonX size={18} /> Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="py-2 px-4 cursor-pointer text-sm bg-blue-600 text-white font-semibold flex gap-2 rounded-xl items-center"
            >
              <Plus size={18} /> Update
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
              className="w-full border rounded px-2 py-1"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Product No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={productNo}
              onChange={(e) => setProductNo(e.target.value)}
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

export default EditProduct;
