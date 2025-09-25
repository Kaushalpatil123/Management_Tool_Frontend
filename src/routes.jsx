import Dashboard from "./Pages/Dashboard/Dashboard";
import Invoice from "./Pages/Invoices/Invoice";
import Leads from "./Pages/Leads/Leads";
import Quotes from "./Pages/Quotes/Quotes";
import Orders from "./Pages/Order/Order";

const routes = [
  { path: "/", element: Dashboard },
  { path: "/invoices", element: Invoice },
  { path: "/leads", element: Leads },
  { path: "/quotes", element: Quotes }, 
    { path: "/orders", element: Orders },

];

export default routes;
