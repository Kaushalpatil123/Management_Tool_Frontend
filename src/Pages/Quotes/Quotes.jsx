import { useState, useEffect } from "react";
import { Search, RefreshCw, Inbox, ChevronRight, ChevronLeft, EllipsisVertical, ArrowLeft,Pencil,Trash } from "lucide-react";
import AddQuotes from "./AddQuotes";
import Header from "../../Components/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

import config from "../../config/api";
const Quotes = () => {
  const backendURL = config.backendUrl

  const [Quote, setQuotes] = useState([]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedQuoteId, setselectedQuoteId] = useState(null);
  // const [selectedrow, setselectedrow] = useState("");
  // const [iseditOpen, setiseditOpen] = useState(false);
  console.log("dADada", Quote)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/quotes`); // replace with your backend URL
        setQuotes(res.data);
        console.log("Fetched Quotes:", res.data);
      } catch (err) {
        console.error("Error fetching quotes:", err);
      }
    };

    fetchQuotes();
  }, [backendURL]);

  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search input state
  const [ShowQuote, setShowQuote] = useState("Table"); // 🔍 search input state

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  const filteredLeads = Quote.filter((lead) =>
    Object.values(lead).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  // Calculate indexes
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
    try {
      //  await axios.delete(`http://localhost:5000/api/quotes/${selectedQuoteId}`);
    await axios.delete(`${backendURL}/api/quotes/${selectedQuoteId}`);
      // setLeads(leads.filter((lead) => lead._id !== selectedQuoteId));
      toast.success("Quote deleted successfully!");
    } catch (error) {
      toast.error("Error deleting lead");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteOpen(false);
      setselectedQuoteId(null);
    }
  };
  return (

    <>
      <div className="h-full w-full">
        <div className="h-[15%] w-full ">
          <Header HeaderValue={"Add Lead"} />
        </div>
        <div className="w-full h-full flex justify-center">
          {ShowQuote === "Table" && (
            <div
              className="bg-white rounded-xl p-6 w-[90%] max-h-[70vh] flex flex-col"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft /></button>
                <h2 className="text-lg font-semibold">Quotes For Customers</h2>
              </div>

              {/* Search + Actions */}
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

                <button className="flex items-center gap-1 border border-[#f0f0f0] rounded-lg px-3 py-2 text-sm hover:bg-gray-50 font-semibold">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>

                <button
                  onClick={() => setShowQuote("Editform")}
                  className="bg-[#0050c8] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow">
                  Add New Quotes (for Customers)
                </button>
              </div>

              {/* Table */}
              <div className="rounded-lg overflow-x-auto flex-1">
                <div className="w-full text-sm text-left">
                  <div className="bg-gray-50 text-gray-600 font-medium sticky w-full">
                    <div className="flex w-full justify-around font-bold">
                      <div className="px-4 py-3 w-[12.5%] text-center">Number</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Client</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Date</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Expired Date	</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Sub Total	</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Total</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Status</div>
                      <div className="px-4 py-3 w-[12.5%] text-center">Action</div>
                    </div>
                  </div>
                  <div>
                    {currentLeads.length === 0 ? (
                      <div>
                        <div colSpan="8" className="text-center py-10 text-gray-400">
                          <div className="flex flex-col items-center">
                            <Inbox className="w-10 h-10 mb-2 text-gray-300" />
                            <span>No data</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      currentLeads.map((lead, index) => (
                        <div key={index} className=" flex w-full">
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.number}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.client}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{formatDate(lead.date)}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{formatDate(lead.expireDate)}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.subTotal}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.total}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.status}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center flex justify-center align-middle items-center">
                            <div
                              // onClick={() => {
                              //   setselectedrow(lead);
                              //   setiseditOpen(true);
                              // }}
                              className="cursor-pointer hover:bg-gray-300 p-1 rounded-md">
                              <Pencil />
                            </div>

                            {/* Delete Button */}
                            <div
                              onClick={() => {
                                setselectedQuoteId(lead._id);
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
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-end align-middle items-center py-4">
                <div className="flex gap-1 items-center">
                  <ChevronLeft
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={` ${currentPage === 1
                      ? "text-gray-400  cursor-not-allowed"
                      : ""
                      }`} />
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === currentPage ||
                          page === currentPage + 1 ||
                          (currentPage === totalPages && page === currentPage - 1)
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
                    disabled={currentPage === totalPages}
                    className={` ${currentPage === totalPages
                      ? "text-gray-400  cursor-not-allowed"
                      : ""
                      }`} />
                </div>
              </div>
            </div>

          )}


          {ShowQuote === "Editform" && (

            <AddQuotes setShowQuote={setShowQuote} />

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
                    Are you sure you want to delete this lead?
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


    </>
  )
}

export default Quotes