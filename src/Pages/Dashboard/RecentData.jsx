import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes } from '../../Store/slices/QuoteSlice';
import { fetchInvoices } from '../../Store/slices/invoiceSlice';

const RecentData = () => {
    const dispatch = useDispatch();
    const { invoices } = useSelector((state) => state.invoices);
    const { quotes } = useSelector((state) => state.quotes);

    useEffect(() => {
        dispatch(fetchQuotes());
        dispatch(fetchInvoices());
    }, [dispatch]);

    // 🔹 Sort by updatedAt and take latest 5
    const latestInvoices = [...(invoices || [])]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);

    const latestQuotes = [...(quotes || [])]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Recent Invoices */}
            <div className="bg-white shadow-md rounded-2xl p-4">
                <h2 className="text-lg font-semibold text-purple-800 mb-4">
                    Recent Invoices
                </h2>
                <div className="w-full text-left">
                    <div className="flex py-2 text-gray-500 bg-gray-100 text-sm justify-center items-center">
                        <div className="w-[25%] flex justify-center">Sr. No</div>
                        <div className="w-[25%] flex justify-center">Client</div>
                        <div className="w-[25%] flex justify-center">Total</div>
                        <div className="w-[25%] flex justify-center">Status</div>
                    </div>

                    {latestInvoices.map((invoice, index) => (
                        <div key={invoice._id} className="flex">
                            <div className="py-3 w-[25%] flex justify-center">{index + 1}</div>
                            <div className="py-3 w-[25%] flex justify-center">{invoice.client}</div>
                            <div className="py-3 w-[25%] flex justify-center font-medium">
                                {invoice.total.toLocaleString()} $
                            </div>
                            <div className="py-3 w-[25%] flex justify-center">
                                <span
                                    className={`px-3 py-1 rounded-md text-sm 
                                        ${invoice.status === "Sent" ? "bg-yellow-100 text-yellow-600" :
                                            invoice.status === "Draft" ? "bg-gray-100 text-gray-600" :
                                                invoice.status === "Cancelled" ? "bg-red-100 text-red-600" :
                                                    "bg-green-100 text-green-600"}`}
                                >
                                    {invoice.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Quotes */}
            <div className="bg-white shadow-md rounded-2xl p-4">
                <h2 className="text-lg font-semibold text-purple-800 mb-4">
                    Recent Quotes
                </h2>
                <div className="w-full text-left">
                    <div className="flex py-2 text-gray-500 bg-gray-100 text-sm justify-center items-center">
                        <div className="w-[25%] flex justify-center">Sr. No</div>
                        <div className="w-[25%] flex justify-center">Client</div>
                        <div className="w-[25%] flex justify-center">Total</div>
                        <div className="w-[25%] flex justify-center">Status</div>
                    </div>

                    {latestQuotes.map((quote, index) => (
                        <div key={quote._id} className="flex">
                            <div className="py-3 w-[25%] flex justify-center">{index + 1}</div>
                            <div className="py-3 w-[25%] flex justify-center">{quote.client}</div>
                            <div className="py-3 w-[25%] flex justify-center font-medium">
                                {quote.total.toLocaleString()} $
                            </div>
                            <div className="py-3 w-[25%] flex justify-center">
                                <span
                                    className={`px-3 py-1 rounded-md text-sm 
                                        ${quote.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                                            quote.status === "Decline" ? "bg-red-100 text-red-600" :
                                                "bg-green-100 text-green-600"}`}
                                >
                                    {quote.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentData;
