import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header';
import { ArrowLeft, RefreshCw, Plus, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import AddOrder from './AddOrder';
import EditOrder from './EditOrder';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from '../../Store/slices/orderSlice';
import { toast } from "react-toastify";


const Order = () => {
    const dispatch = useDispatch();

    const [isloading,] = useState(false);
    const [search, setSearch] = useState("");
    const [ShowOrder, setShowOrder] = useState("Table"); // 🔍 search input state
    const [selectedOrder, setselectedOrder] = useState(""); // 🔍 search input state
    const { orders } = useSelector((state) => state.orders);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedOrderId, setselectedOrderId] = useState(null);
    // Fetch orders when component mounts
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // const orders = [
    //     {
    //         id: 1,
    //         product: "Laptop",
    //         quantity: 2,
    //         price: 60000,
    //         discount: 2000,
    //         total: 118000,
    //         status: "Shipped",
    //         phone: "9876543210",
    //         state: "Maharashtra",
    //         city: "Pune",
    //         note: "Deliver before weekend",
    //     },
    //     {
    //         id: 2,
    //         product: "Mobile",
    //         quantity: 1,
    //         price: 20000,
    //         discount: 1000,
    //         total: 19000,
    //         status: "Delivered",
    //         phone: "9123456780",
    //         state: "Gujarat",
    //         city: "Ahmedabad",
    //         note: "Urgent",
    //     },
    //     {
    //         id: 3,
    //         product: "Tablet",
    //         quantity: 3,
    //         price: 15000,
    //         discount: 1500,
    //         total: 43500,
    //         status: "Pending",
    //         phone: "9988776655",
    //         state: "Delhi",
    //         city: "New Delhi",
    //         note: "Office use",
    //     },
    //     {
    //         id: 4,
    //         product: "Headphones",
    //         quantity: 5,
    //         price: 2000,
    //         discount: 500,
    //         total: 9500,
    //         status: "Shipped",
    //         phone: "9090909090",
    //         state: "Karnataka",
    //         city: "Bangalore",
    //         note: "Gift packing",
    //     },
    //     {
    //         id: 5,
    //         product: "Keyboard",
    //         quantity: 2,
    //         price: 1500,
    //         discount: 200,
    //         total: 2800,
    //         status: "Delivered",
    //         phone: "7878787878",
    //         state: "Maharashtra",
    //         city: "Mumbai",
    //         note: "",
    //     },
    //     {
    //         id: 6,
    //         product: "Mouse",
    //         quantity: 4,
    //         price: 800,
    //         discount: 100,
    //         total: 3100,
    //         status: "Pending",
    //         phone: "7070707070",
    //         state: "Punjab",
    //         city: "Chandigarh",
    //         note: "",
    //     },
    //     {
    //         id: 7,
    //         product: "Smartwatch",
    //         quantity: 1,
    //         price: 12000,
    //         discount: 1000,
    //         total: 11000,
    //         status: "Delivered",
    //         phone: "9999999999",
    //         state: "Goa",
    //         city: "Panaji",
    //         note: "Waterproof model",
    //     },
    //     {
    //         id: 8,
    //         product: "Monitor",
    //         quantity: 2,
    //         price: 15000,
    //         discount: 2000,
    //         total: 28000,
    //         status: "Shipped",
    //         phone: "8080808080",
    //         state: "Rajasthan",
    //         city: "Jaipur",
    //         note: "",
    //     },
    //     {
    //         id: 9,
    //         product: "Camera",
    //         quantity: 1,
    //         price: 45000,
    //         discount: 3000,
    //         total: 42000,
    //         status: "Delivered",
    //         phone: "8989898989",
    //         state: "Kerala",
    //         city: "Kochi",
    //         note: "Photography project",
    //     },
    //     {
    //         id: 10,
    //         product: "Printer",
    //         quantity: 2,
    //         price: 8000,
    //         discount: 1000,
    //         total: 15000,
    //         status: "Pending",
    //         phone: "7878781234",
    //         state: "West Bengal",
    //         city: "Kolkata",
    //         note: "",
    //     },
    //     {
    //         id: 11,
    //         product: "Router",
    //         quantity: 3,
    //         price: 2500,
    //         discount: 500,
    //         total: 7000,
    //         status: "Shipped",
    //         phone: "9999911111",
    //         state: "Uttar Pradesh",
    //         city: "Lucknow",
    //         note: "",
    //     },
    //     {
    //         id: 12,
    //         product: "TV",
    //         quantity: 1,
    //         price: 50000,
    //         discount: 5000,
    //         total: 45000,
    //         status: "Delivered",
    //         phone: "7777777777",
    //         state: "Tamil Nadu",
    //         city: "Chennai",
    //         note: "Wall mount",
    //     },
    //     {
    //         id: 13,
    //         product: "Fridge",
    //         quantity: 1,
    //         price: 30000,
    //         discount: 2000,
    //         total: 28000,
    //         status: "Shipped",
    //         phone: "6666666666",
    //         state: "Madhya Pradesh",
    //         city: "Indore",
    //         note: "",
    //     },
    //     {
    //         id: 14,
    //         product: "Washing Machine",
    //         quantity: 1,
    //         price: 25000,
    //         discount: 1500,
    //         total: 23500,
    //         status: "Pending",
    //         phone: "5555555555",
    //         state: "Telangana",
    //         city: "Hyderabad",
    //         note: "",
    //     },
    //     {
    //         id: 15,
    //         product: "Microwave",
    //         quantity: 2,
    //         price: 12000,
    //         discount: 1000,
    //         total: 23000,
    //         status: "Delivered",
    //         phone: "4444444444",
    //         state: "Haryana",
    //         city: "Gurgaon",
    //         note: "",
    //     },
    //     {
    //         id: 16,
    //         product: "AC",
    //         quantity: 1,
    //         price: 40000,
    //         discount: 2000,
    //         total: 38000,
    //         status: "Shipped",
    //         phone: "3333333333",
    //         state: "Bihar",
    //         city: "Patna",
    //         note: "",
    //     },
    //     {
    //         id: 17,
    //         product: "Fan",
    //         quantity: 4,
    //         price: 2500,
    //         discount: 500,
    //         total: 9500,
    //         status: "Pending",
    //         phone: "2222222222",
    //         state: "Jharkhand",
    //         city: "Ranchi",
    //         note: "",
    //     },
    //     {
    //         id: 18,
    //         product: "Oven",
    //         quantity: 1,
    //         price: 15000,
    //         discount: 1000,
    //         total: 14000,
    //         status: "Delivered",
    //         phone: "1111111111",
    //         state: "Assam",
    //         city: "Guwahati",
    //         note: "",
    //     },
    //     {
    //         id: 19,
    //         product: "Speakers",
    //         quantity: 2,
    //         price: 5000,
    //         discount: 500,
    //         total: 9500,
    //         status: "Shipped",
    //         phone: "1212121212",
    //         state: "Odisha",
    //         city: "Bhubaneswar",
    //         note: "",
    //     },
    //     {
    //         id: 20,
    //         product: "Projector",
    //         quantity: 1,
    //         price: 25000,
    //         discount: 2000,
    //         total: 23000,
    //         status: "Pending",
    //         phone: "1313131313",
    //         state: "Himachal Pradesh",
    //         city: "Shimla",
    //         note: "Conference room",
    //     },
    // ];

    // ✅ Search Filter
    const filteredOrders = orders.filter((order) =>
        order.productName.toLowerCase().includes(search.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const OrderPerPage = 10;
    // ✅ Pagination
    const indexOfLastOrder = currentPage * OrderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - OrderPerPage;
    const currentOrder = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / OrderPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };


    const handleDelete = async () => {
        try {
            await dispatch(deleteOrder(selectedOrderId)).unwrap();
            toast.success("Quote deleted successfully!");
        } catch (error) {
            toast.error(error || "Error deleting quote");
            console.error("Delete error:", error);
        } finally {
            dispatch(fetchOrders());
            setIsDeleteOpen(false)
        }
    };
    return (
        <>
            {isloading ? (
                <> <Loader isloading={isloading} /></>
            ) : (
                <></>
            )}



            <div className="h-full w-full">
                {/* Page Header */}
                <div className="h-[15%] w-full ">
                    <Header HeaderValue={"Add Lead"} />
                </div>
                {ShowOrder === "Table" && (
                    <div className="w-full h-full flex justify-center">
                        <div
                            className="bg-white rounded-xl p-6 w-[90%] max-h-[70vh] flex flex-col"
                            style={{
                                boxShadow:
                                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold">Order List</h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    
                                    <button
                                        onClick={() => {
                                            setShowOrder("AddForm")
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                                        <Plus className="w-4 h-4" />
                                        Add New Order
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="mt-6 overflow-auto">
                                <div className="flex bg-gray-50 text-gray-600 text-left text-sm sticky top-0">
                                    <div className="w-[6%] text-center px-4 py-3 font-medium">SR.No</div>
                                    <div className="w-[10%] text-center px-4 py-3 font-medium">Product Name</div>
                                    <div className="w-[8%] text-center px-4 py-3 font-medium">Quantity</div>
                                    <div className="w-[8%] text-center px-4 py-3 font-medium">Price</div>
                                    <div className="w-[8%] text-center px-4 py-3 font-medium">Discount</div>
                                    <div className="w-[8%] text-center px-4 py-3 font-medium">Total</div>
                                    <div className="w-[8%] text-center px-4 py-3 font-medium">Status</div>
                                    <div className="w-[10%] text-center px-4 py-3 font-medium">Phone</div>
                                    <div className="w-[10%] text-center px-4 py-3 font-medium">State</div>
                                    <div className="w-[10%] text-center px-4 py-3 font-medium">Note</div>
                                    <div className="w-[12%] text-center px-4 py-3 font-medium">Actions</div>
                                </div>

                                {/* Data Rows */}
                                {currentOrder.length > 0 ? (
                                    currentOrder.map((order, index) => (
                                        <div
                                            key={order.id}
                                            className="flex hover:bg-gray-50 text-sm"
                                        >
                                            <div className="w-[6%] text-center px-4 py-3">{index + 1+indexOfFirstOrder}</div>
                                            <div className="w-[10%] text-center px-4 py-3">{order.productName}</div>
                                            <div className="w-[8%] text-center px-4 py-3">{order.quantity}</div>
                                            <div className="w-[8%] text-center px-4 py-3">₹{order.price}</div>
                                            <div className="w-[8%] text-center px-4 py-3">₹{order.discount}</div>
                                            <div className="w-[8%] text-center px-4 py-3">₹{order.total}</div>
                                            <div className="w-[8%] text-center px-4 py-3">{order.status}</div>
                                            <div className="w-[10%] text-center px-4 py-3">{order.phone}</div>
                                            <div className="w-[10%] text-center px-4 py-3">{order.state}</div>
                                            <div className="w-[12%] text-center px-4 py-3">{order.notes || "-"}</div>
                                            <div className="w-[10%] text-center px-4 py-3 flex justify-center items-center gap-2">
                                                {/* Edit Button */}
                                                <div
                                                    onClick={() => {
                                                        setShowOrder("EditForm")
                                                        setselectedOrder(order)
                                                    }}
                                                    className="cursor-pointer hover:bg-gray-300 p-1 rounded-md">
                                                    <Pencil />
                                                </div>

                                                {/* Delete Button */}
                                                <div
                                                    onClick={() => {
                                                        setselectedOrderId(order._id);
                                                        setIsDeleteOpen(true);
                                                    }}
                                                    className="cursor-pointer hover:bg-gray-300 p-1 rounded-md text-red-600"
                                                >
                                                    <Trash />
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-gray-300 mb-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 7h18M3 12h18M3 17h18"
                                                />
                                            </svg>
                                            No data
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-end align-middle items-center py-3 px-6">
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
                    </div>
                )}
                {ShowOrder === "AddForm" && (
                    <AddOrder setShowOrder={setShowOrder} />
                )}
                {ShowOrder === "EditForm" && (
                    <EditOrder setShowOrder={setShowOrder} selectedOrder={selectedOrder} />
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
                                    Are you sure you want to delete this Quote?
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


        </>
    )
}

export default Order