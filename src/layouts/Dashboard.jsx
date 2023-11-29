import { FaComment, FaHome, FaUser, FaUserCheck } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen  text-white bg-[#216D30]">
        <div>
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/my-profile">
                <FaUser /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/requested-meals">
                <FaUserCheck />
                Requested Meals
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-reviews">
                <FaComment />
                My Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHome />
                HomePage
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
