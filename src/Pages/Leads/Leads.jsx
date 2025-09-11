import { useState } from "react";
import { Search, RefreshCw, Inbox, ChevronRight, ChevronLeft } from "lucide-react";
import AddLead from "./AddLead";
const Leads = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [leads] = useState([
    {
      branch: "Mumbai",
      type: "Corporate",
      name: "Rajesh Sharma",
      status: "Active",
      source: "Website",
      country: "India",
      phone: "+91 9876543210",
      email: "rajesh@example.com",
    },
    {
      branch: "Pune",
      type: "Individual",
      name: "Sneha Patil",
      status: "Pending",
      source: "Referral",
      country: "India",
      phone: "+91 9123456780",
      email: "sneha@example.com",
    },
    {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    },
    {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    },
    {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    }, {
      branch: "Delhi",
      type: "Corporate",
      name: "Amit Verma",
      status: "Closed",
      source: "Email Campaign",
      country: "India",
      phone: "+91 9988776655",
      email: "amit@example.com",
    },
  ]);


  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  // Calculate indexes
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <div className="h-full w-full">
        <div className="h-[15%] "></div>
        <div className="w-full h-full flex justify-center">
          <div
            className="bg-white rounded-xl p-6 w-[90%] max-h-[70vh] flex flex-col"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">←</button>
              <h2 className="text-lg font-semibold">Lead List</h2>
            </div>

            {/* Search + Actions */}
            <div className="flex justify-end items-center gap-2 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="search"
                  className="border border-[#f0f0f0] rounded-lg pl-8 pr-3 py-2 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              <button className="flex items-center gap-1 border border-[#f0f0f0] rounded-lg px-3 py-2 text-sm hover:bg-gray-50 font-semibold">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#0050c8] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow">
                Add New Lead
              </button>
            </div>

            {/* Table */}
            <div className="rounded-lg overflow-x-auto flex-1">
              <div className="w-full text-sm text-left">
                <div className="bg-gray-50 text-gray-600 font-medium sticky w-full">
                  <div className="flex w-full justify-around font-bold">
                    <div className="px-4 py-3 w-[12.5%] text-center">Branch</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Type</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Name</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Status</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Source</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Country</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Phone</div>
                    <div className="px-4 py-3 w-[12.5%] text-center">Email</div>
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
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.branch}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.type}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.name}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.status}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.source}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.country}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.phone}</div>
                        <div className="px-4 py-3 w-[12.5%] text-center">{lead.email}</div>
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
        </div>



      </div>
      {isOpen && (
        <AddLead setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
    </>
  )
}

export default Leads