import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import PageTitle from "../../../components/shared/PageTitle/PageTitle";

const MyProfile = () => {
  const auth = useContext(AuthContext);
  // State to store user information
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch user information
    const fetchUserData = async () => {
      try {
        // Replace with your server URL

        const response = await fetch(
          `https://meal-mate-server.vercel.app/users/${auth?.user?.email}`
        );
        const userData = await response.json();

        if (response.ok) {
          setUser(userData);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [auth?.user?.email]); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="mt-10">
      <PageTitle title="MealMate | My Profile"></PageTitle>
      <h2 className="text-5xl font-bold text-center text-[#216D30]">
        My Profile
      </h2>
      <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />

      {user ? (
        <div className="h-[400px] flex flex-col text-[#216D30] text-md font-semibold justify-center items-center space-y-3 w-[500px] bg-[#ECFCE8] p-4 mt-10 mb-10 mx-auto">
          <img className="rounded-full" src={user.photoURL} alt="Profile" />
          <p>Name: {user.name}</p>
          <p className="">Email: {user?.email}</p>
          <div className="badge badge-lg badge-accent badge-outline">
            {user.badge}
          </div>{" "}
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default MyProfile;
