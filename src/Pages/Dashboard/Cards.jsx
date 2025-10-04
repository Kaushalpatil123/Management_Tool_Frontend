import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../Store/slices/orderSlice';
import { fetchLeads } from '../../Store/slices/leadslice';
import { fetchInvoices } from '../../Store/slices/invoiceSlice';
import { fetchQuotes } from '../../Store/slices/QuoteSlice';

const Cards = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);
    const { items: leads } = useSelector((state) => state.leads);
    const { invoices } = useSelector((state) => state.invoices);
    const { quotes } = useSelector((state) => state.quotes);

    const [OrdertotalSum, setOrdertotalSum] = useState(0);
    const [LeadtotalSum, setLeadtotalSum] = useState(0);
    const [InvoicetotalSum, setInvoicetotalSum] = useState(0);
    const [QuotetotalSum, setQuotetotalSum] = useState(0);



    console.log("gsgdsd", leads)
    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchLeads());
        dispatch(fetchInvoices());
        dispatch(fetchQuotes());

    }, [dispatch]);

    useEffect(() => {
        setOrdertotalSum(orders.length);
        setLeadtotalSum(leads.length);
        setInvoicetotalSum(invoices.length)
        setQuotetotalSum(quotes.length)
    }, [orders, leads, invoices, quotes]);

    return (
        <div className='w-full px-7'>

            <div className="flex justify-between align-middle items-center gap-4 py-6 w-full">
                <a href="/orders" class="block max-w-sm w-[25%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-300">Order</h5>
                    <p class="font-semibold text-gray-700 text-center text-xl dark:text-gray-400">{OrdertotalSum}</p>
                </a>
                <a href="leads" class="block max-w-sm w-[25%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-300">Leads</h5>
                    <p class="font-semibold text-gray-700 text-center text-xl dark:text-gray-400">{LeadtotalSum}</p>
                </a>
                <a href="/invoices" class="block max-w-sm w-[25%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-300">Invoice</h5>
                    <p class="font-semibold text-gray-700 text-center text-xl dark:text-gray-400">{InvoicetotalSum}</p>
                </a>
                <a href="/quotes" class="block max-w-sm w-[25%] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-300">Quote</h5>
                    <p class="font-semibold text-gray-700 text-center text-xl dark:text-gray-400">{QuotetotalSum}</p>
                </a>


            </div>
        </div>
    )
}

export default Cards