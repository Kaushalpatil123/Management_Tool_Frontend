import { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Inbox,
  ChevronRight,
  Trash,
  ChevronLeft,
  Pencil,
} from "lucide-react";
import AddLead from "./AddLead";
import Header from "../../Components/Header/Header";
import { toast } from "react-toastify";
import EditLead from "./EditLead";
import { deleteLead, fetchLeads } from "../../Store/slices/leadslice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
const Leads = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setisloading] = useState(false);

  // const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  // 🔴 Delete modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedrow, setselectedrow] = useState("");
  const [iseditOpen, setiseditOpen] = useState(false);
  const dispatch = useDispatch();
  const { items: leads } = useSelector((state) => state.leads);

  console.log("dfsf", leads)

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);




  // ✅ Delete Lead Function
  const handleDelete = async () => {
    setisloading(true)
    try {
      await dispatch(deleteLead(selectedLeadId)).unwrap(); // ✅ unwrap for error handling
      toast.success("Lead deleted successfully!");
    } catch (error) {
      toast.error("Error deleting lead");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteOpen(false);
      setSelectedLeadId(null);
      dispatch(fetchLeads());
      setisloading(false)
    }
  };

  // ✅ Filtering for search
  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ✅ Pagination
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

  const Refresh = () => {
    dispatch(fetchLeads());
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
              <h2 className="text-lg font-semibold">Lead List</h2>
            </div>

            {/* Search + Actions */}
            <div className="flex justify-end items-center gap-2 mb-4">
              {/* Search Bar */}
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



              {/* Add Lead Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#0050c8] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow cursor-pointer"
              >
                Add New Lead
              </button>
            </div>

            {/* Table */}
            <div className="rounded-lg overflow-x-auto flex-1">
              <div className="w-full text-sm text-left">
                {/* Table Head */}
                <div className="bg-gray-50 text-gray-600 font-medium sticky top-0 w-full">
                  <div className="flex w-full justify-around font-bold">
                    <div className="p-2 w-[5%] text-center">Sr.No</div>
                    <div className="p-2 w-[12.5%] text-center">Branch</div>
                    <div className="p-2 w-[12.5%] text-center">Type</div>
                    <div className="p-2 w-[12.5%] text-center">Name</div>
                    <div className="p-2 w-[12.5%] text-center">Status</div>
                    <div className="p-2 w-[12.5%] text-center">Source</div>
                    <div className="p-2 w-[12.5%] text-center">Country</div>
                    <div className="p-2 w-[12.5%] text-center">Phone</div>
                    <div className="p-2 w-[12.5%] text-center">Email</div>
                    <div className="p-2 w-[12.5%] text-center">Actions</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div>
                  {currentLeads.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <div className="flex flex-col items-center">
                        <Inbox className="w-10 h-10 mb-2 text-gray-300" />
                        <span>No data</span>
                      </div>
                    </div>
                  ) : (
                    currentLeads.map((lead, index) => (
                      <div key={index} className="flex w-full">
                         <div className="p-2 w-[5%] text-center">
                          {index+1}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.branch}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.type}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.name}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.status}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.source}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.country}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.phone}
                        </div>
                        <div className="p-2 w-[12.5%] text-center break-all text-wrap">
                          {lead.email}
                        </div>

                        {/* Actions */}
                        <div className="p-2 w-[12.5%] flex justify-center items-center gap-2">
                          {/* Edit Button */}
                          <div
                            onClick={() => {
                              setselectedrow(lead);
                              setiseditOpen(true);
                            }}
                            className="cursor-pointer hover:bg-gray-300 p-1 rounded-md">
                            <Pencil />
                          </div>

                          {/* Delete Button */}
                          <div
                            onClick={() => {
                              setSelectedLeadId(lead._id);
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
      </div>

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
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


      {iseditOpen && (
        <EditLead
          setIsOpen={setiseditOpen}   // Use edit modal setter
          isOpen={iseditOpen}          // Use edit modal state
          selectedrow={selectedrow}
          Refresh={Refresh}
          setisloading={setisloading}
        />
      )}


      {/* Add Lead Modal */}
      {isOpen && <AddLead
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        Refresh={Refresh}
        setisloading={setisloading}
      />}
    </>
  );
};

export default Leads;
