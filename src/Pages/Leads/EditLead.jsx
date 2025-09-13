import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { X } from "lucide-react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import config from "../../config/api";

const EditLead = ({ setIsOpen, isOpen, selectedrow }) => {
    const backendURL = config.backendUrl
    const [date, setDate] = useState(null);
    const [type, setType] = useState("Corporate");
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("Direct");
    const [country, setCountry] = useState(null);

    const options = countryList().getData();

    useEffect(() => {
        if (selectedrow) {
            setDate(dayjs(selectedrow.date));
            setType(selectedrow.type || "Corporate");
            setName(selectedrow.name || "");
            setBranch(selectedrow.branch || "");
            setPhone(selectedrow.phone || "");
            setEmail(selectedrow.email || "");
            setStatus(selectedrow.status || "");
            setSource(selectedrow.source || "Direct");

            // Set country object for react-select
            if (selectedrow.country) {
                const countryObj = options.find(
                    (c) => c.label === selectedrow.country
                );
                setCountry(countryObj || null);
            }
        }
    }, [selectedrow, options]);

    const changeCountry = (value) => {
        setCountry(value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedLead = {
            date: date ? date.format("YYYY-MM-DD") : null,
            type,
            name,
            branch,
            phone,
            email,
            status,
            source,
            country: country ? country.label : "",
        };

        try {
            await axios.put(`${backendURL}/api/leads/${selectedrow._id}`, updatedLead);
            toast.success("Lead updated successfully! 🎉");
            setIsOpen(false);
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Failed to update lead!");
        }
    };


    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm" />}

            <div
                className={`fixed top-0 right-0 h-full w-[25%] shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="form w-full bg-white h-full shadow-lg overflow-y-auto">
                    <div className="flex align-middle items-center py-6 px-3 gap-3 border-b border-gray-300">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-800 hover:bg-gray-300 rounded-md p-1"
                        >
                            <X />
                        </button>
                        <h2 className="text-xl font-semibold">Edit Lead</h2>
                    </div>

                    <form onSubmit={handleUpdate} className="p-6 flex flex-col gap-4">
                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                            >
                                <option>Corporate</option>
                                <option>Individual</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter name"
                                required
                            />
                        </div>

                        {/* Branch */}
                        <div>
                            <label className="block text-sm font-medium">Branch</label>
                            <input
                                type="text"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter branch"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium">Phone</label>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter status"
                                required
                            />
                        </div>

                        {/* Source */}
                        <div>
                            <label className="block text-sm font-medium">Source</label>
                            <select
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="w-full border border-gray-300 rounded p-3"
                            >
                                <option>Direct</option>
                                <option>Referral</option>
                                <option>Website</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium">Country</label>
                            <Select
                                options={options}
                                value={country}
                                onChange={changeCountry}
                                placeholder="Select a country"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditLead;
