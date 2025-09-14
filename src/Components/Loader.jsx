import React from "react";

const Loader = ({ isloading }) => {
  if (!isloading) return null; // don’t render anything when not loading

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="flex space-x-3">
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce [animation-delay:0ms]"></div>
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce [animation-delay:150ms]"></div>
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce [animation-delay:300ms]"></div>
      </div>
    </div>
  );
};

export default Loader;
