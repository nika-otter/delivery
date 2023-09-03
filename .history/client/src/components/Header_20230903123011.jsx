import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-lg">Delivery Manager</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:underline">
              manager
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              administrator
            </a>
          </li>
        </ul>
        <div className="text-white">
          {/* You can put user-related information here */}
          {/* For example: <span>Welcome, John Doe</span> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
