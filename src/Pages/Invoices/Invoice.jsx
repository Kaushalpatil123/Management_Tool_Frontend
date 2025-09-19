import { useState, } from "react";
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
const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const InvoicePerPage = 10;

  const [ShowInvoice, setShowInvoice] = useState("Table"); // 🔍 search input state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInvoiceId, setselectedInvoiceId] = useState(null);
  const [selectedInvoice, setselectedInvoice] = useState(""); // 🔍 search input state

  const invoices = [
    {
      number: 1,
      client: "fwef fewf",
      date: "09/09/2025",
      expiredDate: "09/10/2025",
      total: "$ 1,165,725.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 2,
      client: "John Doe",
      date: "09/08/2025",
      expiredDate: "09/15/2025",
      total: "$ 12,500.00",
      paid: "$ 5,000.00",
      status: "Sent",
      payment: "Partially Paid",
      createdBy: "Admin",
    },
    {
      number: 3,
      client: "Acme Corp",
      date: "09/05/2025",
      expiredDate: "09/12/2025",
      total: "$ 85,000.00",
      paid: "$ 85,000.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "kaushal",
    },
    {
      number: 4,
      client: "Jane Smith",
      date: "09/02/2025",
      expiredDate: "09/09/2025",
      total: "$ 3,200.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "Admin",
    },
    {
      number: 5,
      client: "XYZ Pvt Ltd",
      date: "09/01/2025",
      expiredDate: "09/08/2025",
      total: "$ 45,000.00",
      paid: "$ 20,000.00",
      status: "Sent",
      payment: "Partially Paid",
      createdBy: "kaushal",
    },
    {
      number: 6,
      client: "Global Tech",
      date: "08/30/2025",
      expiredDate: "09/06/2025",
      total: "$ 150,000.00",
      paid: "$ 00.00",
      status: "Draft",
      payment: "Unpaid",
      createdBy: "Admin",
    },
    {
      number: 7,
      client: "Smith Enterprises",
      date: "08/28/2025",
      expiredDate: "09/04/2025",
      total: "$ 72,000.00",
      paid: "$ 72,000.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "kaushal",
    },
    {
      number: 8,
      client: "ABC Ltd",
      date: "08/25/2025",
      expiredDate: "09/01/2025",
      total: "$ 60,000.00",
      paid: "$ 00.00",
      status: "Cancelled",
      payment: "Unpaid",
      createdBy: "Admin",
    },
    {
      number: 9,
      client: "Robert Johnson",
      date: "08/22/2025",
      expiredDate: "08/29/2025",
      total: "$ 12,000.00",
      paid: "$ 12,000.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "kaushal",
    },
    {
      number: 10,
      client: "Star Industries",
      date: "08/20/2025",
      expiredDate: "08/27/2025",
      total: "$ 98,500.00",
      paid: "$ 50,000.00",
      status: "Sent",
      payment: "Partially Paid",
      createdBy: "Admin",
    },
    {
      number: 11,
      client: "NextGen Co",
      date: "08/18/2025",
      expiredDate: "08/25/2025",
      total: "$ 110,000.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 12,
      client: "Michael Lee",
      date: "08/15/2025",
      expiredDate: "08/22/2025",
      total: "$ 2,800.00",
      paid: "$ 2,800.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "Admin",
    },
    {
      number: 13,
      client: "Blue Ocean Ltd",
      date: "08/12/2025",
      expiredDate: "08/19/2025",
      total: "$ 66,700.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 14,
      client: "Kevin Wright",
      date: "08/10/2025",
      expiredDate: "08/17/2025",
      total: "$ 14,500.00",
      paid: "$ 5,000.00",
      status: "Sent",
      payment: "Partially Paid",
      createdBy: "Admin",
    },
    {
      number: 15,
      client: "Nova Systems",
      date: "08/08/2025",
      expiredDate: "08/15/2025",
      total: "$ 250,000.00",
      paid: "$ 00.00",
      status: "Draft",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 16,
      client: "GreenField Ltd",
      date: "08/05/2025",
      expiredDate: "08/12/2025",
      total: "$ 90,000.00",
      paid: "$ 90,000.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "Admin",
    },
    {
      number: 17,
      client: "Delta Inc",
      date: "08/02/2025",
      expiredDate: "08/09/2025",
      total: "$ 120,000.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 18,
      client: "Laura Adams",
      date: "07/30/2025",
      expiredDate: "08/06/2025",
      total: "$ 5,600.00",
      paid: "$ 5,600.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "Admin",
    },
    {
      number: 19,
      client: "Bright Future Co",
      date: "07/28/2025",
      expiredDate: "08/04/2025",
      total: "$ 76,400.00",
      paid: "$ 00.00",
      status: "Sent",
      payment: "Unpaid",
      createdBy: "kaushal",
    },
    {
      number: 20,
      client: "William Brown",
      date: "07/25/2025",
      expiredDate: "08/01/2025",
      total: "$ 9,900.00",
      paid: "$ 9,900.00",
      status: "Paid",
      payment: "Paid",
      createdBy: "Admin",
    },
  ];



  const filteredInvoice = invoices.filter((lead) =>
    Object.values(lead).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Pagination
  const indexOfLastLead = currentPage * InvoicePerPage;
  const indexOfFirstLead = indexOfLastLead - InvoicePerPage;
  const currentInvoice = filteredInvoice.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredInvoice.length / InvoicePerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const Refresh = () => {
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
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Number</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Client</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Date</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Expired Date</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Total</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Paid</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Status</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Payment</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Created By</div>
                      <div className="px-4 py-3 flex justify-center align-middle items-center w-[10%]">Actions</div>
                    </div>
                  </div>
                  <div>
                    {currentInvoice.map((inv, i) => (
                      <div
                        key={i}
                        className=" flex hover:bg-gray-50 transition"
                      >
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.number}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.client}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap font-semibold">{inv.date}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.expiredDate}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.total}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.paid}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">
                          <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded">
                            {inv.status}
                          </span>
                        </div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">
                          <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                            {inv.payment}
                          </span>
                        </div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap">{inv.createdBy}</div>
                        <div className="px-4 py-3 w-[10%] flex justify-center align-middle items-center break-all text-wrap text-right">
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
            selectedInvoiceId={selectedInvoiceId}
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
                  // onClick={handleDelete}
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