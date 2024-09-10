import React from "react";
import { Link } from "react-router-dom";

const Drawer = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white border-r border-gray-700">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      <ul className="mt-6">
        <li>
          <Link
            to="dashboard"
            className="block p-3 hover:bg-gray-700 border-b border-gray-600 hover:border-gray-400"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="todo"
            className="block p-3 hover:bg-gray-700 border-b border-gray-600 hover:border-gray-400"
          >
            Todo
          </Link>
        </li>
        <li>
          <Link
            to="category"
            className="block p-3 hover:bg-gray-700 border-b border-gray-600 hover:border-gray-400"
          >
            Cateogry
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
