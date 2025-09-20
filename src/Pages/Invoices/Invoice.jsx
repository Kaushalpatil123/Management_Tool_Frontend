import { useState, useEffect } from "react";
import { Plus, RefreshCcw, MoreHorizontal } from "lucide-react";
import {
  Search,
  RefreshCw,
  Inbox,
  ChevronRight,
  Trash,
  ChevronLeft,
  Pencil,
} from "lucide-react";
import Header from "../../Components/Header/Header";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, fetchInvoices } from "../../Store/slices/invoiceSlice";
import { toast } from "react-toastify";

const Invoice = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const InvoicePerPage = 10;

  const [ShowInvoice, setShowInvoice] = useState("Table"); // 🔍 search input state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInvoiceId, setselectedInvoiceId] = useState(null);
  const [selectedInvoice, setselectedInvoice] = useState(""); // 🔍 search input state
  const { invoices } = useSelector((state) => state.invoices);


  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);


  const filteredInvoice = invoices.filter((lead) =>
    Object.values(lead).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Pagination
  const indexOfLastInvoice = currentPage * InvoicePerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - InvoicePerPage;
  const currentInvoice = filteredInvoice.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoice.length / InvoicePerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const Refresh = () => {
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    if (selectedInvoiceId) {
      await dispatch(deleteInvoice(selectedInvoiceId));
      toast.success("Invoice deleted successfully! 🎉");

      setIsDeleteOpen(false);
      setselectedInvoiceId(null);
    }
  };
  return (
    <>
      <div className="h-full w-full">

        <div className="h-[15%] w-full ">
          <Header HeaderValue={"Add Invoice"} />
        </div>
        {ShowInvoice === "Table" && (
          <div className="w-full h-full flex justify-center">
            <div
              className="bg-white rounded-xl p-6 w-[90%] max-h-[70vh] flex flex-col"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >

              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">Invoice List</h2>
              </div>

              <div className="flex justify-end items-center gap-2 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // reset to first page on search
                    }}
                    className="border border-[#f0f0f0] rounded-lg pl-8 pr-3 py-2 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                </div>


                <button
                  onClick={() => setShowInvoice("Addform")}
                  className="bg-[#0050c8] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow">
                  Add New Invoice (for Customers)
                </button>
              </div>

              <div className="bg-white  overflow-auto">
                <div className="w-full text-sm">
                  <div className="sticky top-0">
                    <div className="bg-gray-50 flex w-full text-gray-600 text-left font-semibold ">
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Sr.No</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Client</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Date</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Expired Date</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Total</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Paid</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Status</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[12.5%]">Actions</div>
                    </div>
                  </div>
                  <div>
                    {currentInvoice.map((inv, i) => (
                      <div
                        key={i}
                        className=" flex hover:bg-gray-50 transition"
                      >
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">{i + 1 + indexOfFirstInvoice}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">{inv.client}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap font-semibold">{formatDate(inv.date)}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">{formatDate(inv.expireDate)}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">{inv.total}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">{inv.paid}</div>
                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap">
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded">
                            {inv.status}
                          </span>
                        </div>

                        <div className="px-4 py-3 w-[12.5%] flex justify-center align-middle items-center break-all text-wrap text-right">
                          <div
                            onClick={() => {
                              setShowInvoice("Editform")
                              setselectedInvoice(inv)
                            }}
                            className="cursor-pointer hover:bg-gray-300 p-1 rounded-md">
                            <Pencil />
                          </div>

                          {/* Delete Button */}
                          <div
                            onClick={() => {
                              setselectedInvoiceId(inv._id);
                              setIsDeleteOpen(true);
                            }}
                            className="cursor-pointer hover:bg-gray-300 p-1 rounded-md text-red-600"
                          >
                            <Trash />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          </div>
        )}
        {ShowInvoice === "Addform" && (
          <AddInvoice setShowInvoice={setShowInvoice}
            Refresh={Refresh}
          />
        )}
        {ShowInvoice === "Editform" && (
          <EditInvoice
            setShowInvoice={setShowInvoice}
            Refresh={Refresh}
            selectedInvoice={selectedInvoice}
          />
        )}
      </div >

      {isDeleteOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm z-40" />

          {/* Centered Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">
              <h2 className="text-lg font-semibold mb-4">Delete Lead</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this Invoice?
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

    </>
  )
}

export default Invoice