import {
  FaComment,
  FaHome,
  FaUser,
  FaUserCheck,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { GiHotMeal } from "react-icons/gi";
import useAdminStatus from "../hooks/useAdmin";
import PageTitle from "../components/shared/PageTitle/PageTitle";

const Dashboard = () => {
  const { isAdmin } = useAdminStatus();
  return (
    <div className="flex">
      <PageTitle title="MealMate | Dashboard"></PageTitle>

      <div className="w-64 min-h-screen  text-white bg-[#216D30]">
        <div>
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/admin-profile">
                    <FaUser /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users">
                    <MdAdminPanelSettings />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-meal">
                    <FaUtensils />
                    Add Meal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-meals">
                    <GiMeal />
                    All meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-reviews">
                    <FaComment />
                    All reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/serve-meals">
                    <GiHotMeal />
                    Serve Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/upcoming-meals">
                    <GiHotMeal />
                    Upcoming meals
                  </NavLink>
                </li>
              </>
            ) : (
              <>
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
                    <FaComment></FaComment>
                    My Reviews
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider divider-warning"></div>
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
