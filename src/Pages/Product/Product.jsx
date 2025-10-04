import React, { useEffect, useState } from "react";
import { ArrowLeft, RefreshCcw, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { deleteProduct, fetchProducts } from "../../Store/slices/productSlice";
import config from "../../config/api";
import { toast } from "react-toastify";

const Product = () => {
  const [ShowProduct, setShowProduct] = useState("Table");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  console.log("sdfgsd", selectedProduct)
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );
  const API_URL = config.backendUrl;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProductId, setselectedProductId] = useState(null);

  // Refresh handler
  const Refresh = React.useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Load products on mount
  useEffect(() => {
    Refresh();
  }, [Refresh]);

  // Search filter
  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.productNo.toLowerCase().includes(search.toLowerCase())
  );


  const indexOfLastProduct = currentPage * leadsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - leadsPerPage;
  const currentProduct = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / leadsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProductId)).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error || "Error deleting product");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteOpen(false);
      setselectedProductId(null);
      dispatch(fetchProducts());

    }
  };
  return (
    <div className="h-full w-full">
      <div className="h-[15%] w-full ">
        <Header />
      </div>
      <div className="w-full h-full flex justify-center">
        {ShowProduct === "Table" && (
          <div
            className="bg-white rounded-xl p-6 w-[90%] max-h-[70vh] flex flex-col"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-lg font-semibold">Product List</h2>

            </div>

            {/* Top Bar */}
            <div className="flex gap-2 items-center justify-end mb-4">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => setShowProduct("Addform")}
                className="px-4 py-2 bg-[#1447e6] cursor-pointer text-white rounded-md text-sm hover:bg-blue-700"
              >
                Add New Product
              </button>
            </div>
            {/* Table */}
            <div className="overflow-auto w-full text-sm " >
              <div className="bg-gray-50 flex text-left text-gray-600 font-semibold sticky top-0">
                <div className="py-3 px-4 w-[8%] flex justify-center">Sr.No</div>
                <div className="py-3 px-4 w-[22.9%] flex justify-center">Product Name</div>
                <div className="py-3 px-4 w-[22.9%] flex justify-center">Product No.</div>
                <div className="py-3 px-4 w-[22.9%] flex justify-center">Image</div>
                <div className="py-3 px-4 w-[22.9%] flex justify-center">Actions</div>
              </div>

              {loading ? (
                <p className="p-4 text-center">Loading...</p>
              ) : error ? (
                <p className="p-4 text-center text-red-600">{error}</p>
              ) : currentProduct.length === 0 ? (
                <p className="p-4 text-center">No products found</p>
              ) : (
                currentProduct.map((product, index) => (
                  <div
                    key={product._id}
                    className="hover:bg-gray-50 flex w-full"
                  >
                    <div className="py-3 px-4 w-[8%] flex justify-center">
                      {index + 1 + indexOfFirstProduct}
                    </div>
                    <div className="py-3 px-4 w-[22.9%] flex justify-center">
                      {product.productName}
                    </div>
                    <div className="py-3 px-4 w-[22.9%] flex justify-center">
                      {product.productNo}
                    </div>
                    <div className="py-3 px-4 w-[22.9%] flex justify-center">
                      {product.imageUrl ? (
                        <img
                          src={`${API_URL}${product.imageUrl}`}
                          alt="Product"
                          className="h-8"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                    <div className="py-3 px-4 w-[22.9%] flex justify-center gap-3">
                      <div
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProduct("Editform");
                        }}
                        className="cursor-pointer hover:bg-gray-300 p-1 rounded-md"
                      >
                        <Pencil />
                      </div>
                      <div
                        onClick={() => {
                          setselectedProductId(product._id);
                          setIsDeleteOpen(true);
                        }}
                        className="cursor-pointer hover:bg-gray-300 p-1 rounded-md text-red-600"
                      >
                        <Trash />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end align-middle items-center py-4">
              <div className="flex gap-1 items-center">
                <ChevronLeft
                  onClick={handlePrevPage}
                  className={`${currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                />
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === currentPage ||
                        page === currentPage + 1 ||
                        (currentPage === totalPages &&
                          page === currentPage - 1)
                    )
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded border ${currentPage === page
                          ? "border-blue-600"
                          : "hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                </div>
                <ChevronRight
                  onClick={handleNextPage}
                  className={`${currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                />
              </div>
            </div>

          </div>
        )}

        {ShowProduct === "Addform" && (
          <AddProduct setShowProduct={setShowProduct} Refresh={Refresh} />
        )}
        {ShowProduct === "Editform" && (
          <EditProduct
            setShowProduct={setShowProduct}
            Refresh={Refresh}
            product={selectedProduct}
          />
        )}

        {isDeleteOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm z-40" />

            {/* Centered Modal */}
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">
                <h2 className="text-lg font-semibold mb-4">Delete Lead</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this Order?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsDeleteOpen(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
