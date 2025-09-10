import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Quote,
  Filter,
  Tag,
  ShoppingCart,
} from "lucide-react"; 

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { name: "Invoices", icon: <FileText size={18} />, path: "/invoices" },
    { name: "Quotes", icon: <Quote size={18} />, path: "/quotes" },
    { name: "Leads", icon: <Filter size={18} />, path: "/leads" },
    { name: "Products", icon: <Tag size={18} />, path: "/products" },
    { name: "Order", icon: <ShoppingCart size={18} />, path: "/orders" },
  ];

  return (
    <div className="flex pl-6 pt-10">
      <div className=" overflow-y-auto w-64 bg-white">
        {/* Logo */}
        <div className="flex items-center space-x-2 px-6 py-4">
          <div className="w-8 h-8 bg-blue-600 rounded">
            {/* placeholder for logo */}
          </div>
          <h1 className="text-lg font-bold text-gray-800">Managemnt Tool</h1>
        </div>

        {/* Menu */}
        <ul className="px-2 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium
                  ${isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
