import { useState } from "react";
import { Search, RefreshCw, Inbox, ChevronRight, ChevronLeft, EllipsisVertical, ArrowLeft } from "lucide-react";
import AddQuotes from "./AddQuotes";
import Header from "../../Components/Header/Header";

const Quotes = () => {


  const [Quote] = useState([
    {
      Number: "2",
      Client: "ccscc",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    },
    {
      Number: "2",
      Client: "gdfg",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "gjkghkhjk",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "jfgjfgj",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "jfgjfg",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    }, {
      Number: "2",
      Client: "Corporate",
      Date: "09/09/2025",
      ExpiredDate: "09/10/2025",
      SubTotal: "$ 753,056.00	",
      country: "$ 753,056.00	",
      Status: "Draft",
    },

  ]);

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
  return (

    <>
      <div className="h-full w-full">
         <div className="h-[15%] w-full ">
          <Header HeaderValue={"Add Lead"}/> 
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
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.Number}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.Client}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.Date}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.ExpiredDate}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.SubTotal}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.country}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center">{lead.Status}</div>
                          <div className="px-4 py-3 w-[12.5%] text-center flex justify-center align-middle items-center"><EllipsisVertical /></div>

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
        </div>





      </div>


    </>
  )
}

export default Quotes