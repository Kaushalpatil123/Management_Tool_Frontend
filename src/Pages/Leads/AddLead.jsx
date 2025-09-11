import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { X } from "lucide-react";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AddLead = ({ setIsOpen, isOpen }) => {
    const [value, setValue] = React.useState(null);
    const [country, setCountry] = React.useState(null);

    const options = countryList().getData();
    const changeHandler = (value) => {
        setCountry(value);
    };
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm"
                // onClick={() => setIsOpen(false)}
                />
            )}

            {/* Form Sidebar */}
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
                        <h2 className="text-xl font-semibold">Add New Lead</h2>

                    </div>

                    {/* Form */}
                    <div className="p-6 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium">Date</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-full'
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Type</label>
                            <select className="w-full border border-gray-300 rounded p-3">
                                <option>Corporate</option>
                                <option>Individual</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter name"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded p-3"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Source</label>
                            <select className="w-full border border-gray-300 rounded p-3">
                                <option>Corporate</option>
                                <option>Individual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country</label>
                            <Select
                                options={options}
                                value={country}
                                onChange={changeHandler}
                                placeholder="Select a country"
                                className=""
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddLead