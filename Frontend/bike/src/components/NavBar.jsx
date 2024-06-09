// import React from "react";
// import { MdOutlineTwoWheeler } from "react-icons/md";
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <>
//       <div className="bg-white">
//         <nav
//           className="flex items-center justify-between p-6 lg:px-8"
//           aria-label="Global"
//         >
//           <div className="flex items-center lg:flex-1">
//             <Link to="/" className="-m-1.5 p-1.5 flex items-center">
//               <MdOutlineTwoWheeler className="h-8 w-auto text-indigo-600" />
//               <span className="ml-3 text-xl font-bold text-gray-900">
//                 Bike Warriors
//               </span>
//             </Link>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             <Link
//               to="/"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Home
//             </Link>
//             <Link
//               to="/sports"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Sports
//             </Link>
//             <Link
//               to="/adventure"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Adventure
//             </Link>
//             <Link
//               to="/cruiser"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Cruiser
//             </Link>
//             <Link
//               to="/electric"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Electric
//             </Link>
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             <a
//               href="#"
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               Log in <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import { MdOutlineTwoWheeler } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="bg-white">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              <MdOutlineTwoWheeler className="h-8 w-auto text-indigo-600" />
              <span className="ml-3 text-xl font-bold text-gray-900">
                Bike Warriors
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className={`hidden lg:flex lg:gap-x-12`}>
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/sports"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sports
            </Link>
            <Link
              to="/adventure"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Adventure
            </Link>
            <Link
              to="/cruiser"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cruiser
            </Link>
            <Link
              to="/electric"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Electric
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-2 px-6 pt-2 pb-6">
              <Link
                to="/"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Home
              </Link>
              <Link
                to="/sports"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Sports
              </Link>
              <Link
                to="/adventure"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Adventure
              </Link>
              <Link
                to="/cruiser"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Cruiser
              </Link>
              <Link
                to="/electric"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Electric
              </Link>
              <a
                href="#"
                className="block text-sm font-semibold leading-6 text-gray-900"
                onClick={handleMenuClick}
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
