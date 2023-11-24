import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaUser, FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };
  return (
    <div className="bg-[#ECFCE8]">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden hover:text-[#1967d2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm text-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/meals">Meals</Link>
              </li>
              <li>
                <Link to="/upcomingMeals">Upcoming Meals</Link>
              </li>
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-[#216D30] font-bold px-1">
            <li>
              <Link className="" to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/meals">Meals</Link>
            </li>
            <li>
              <Link to="/upcomingMeals">Upcoming Meals</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="m-1">
              {user && (
                <div className="flex items-center gap-3">
                  <FaBell className="text-[#216D30] mr-2 text-xl"></FaBell>
                  <img
                    className="w-[30%] rounded-full cursor-pointer"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
              )}
            </div>
            {user ? (
              <ul
                tabIndex={0}
                className="menu menu-sm text-sm dropdown-content space-y-2 mt-3 z-[1] p-4 shadow bg-base-100 rounded-box"
              >
                <p className="text-[#216D30] font-bold">{user.displayName}</p>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="btn pt-3 capitalize bg-[#45D62D] text-white hover:bg-[#45D62D]"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <div className="flex gap-2 items-center">
                <FaBell className="text-[#216D30] mr-2 text-xl"></FaBell>

                <FaUser className="text-[#216D30] text-xl"></FaUser>
                <Link to="/login">
                  <button className="btn capitalize ml-2 bg-[#45D62D] text-white hover:bg-[#45D62D]">
                    Join Us
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
