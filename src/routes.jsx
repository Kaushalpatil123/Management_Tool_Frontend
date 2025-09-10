import Dashboard from "./Pages/Dashboard/Dashboard";
import Invoice from "./Pages/Invoices/Invoice";
import Leads from "./Pages/Leads/Leads";
import Quotes from "./Pages/Quotes/Quotes";

const routes = [
  { path: "/", element: Dashboard },
  { path: "/invoices", element: Invoice },
  { path: "/leads", element: Leads },
  { path: "/quotes", element: Quotes },
];

export default routes;
