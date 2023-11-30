import { useState, useEffect } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Error fetching users");
        }

        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching users");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const makeAdmin = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/admin/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If the update is successful, update the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );

        console.log("User updated successfully:", data);
      } else {
        console.error("Failed to update user:", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-5xl mt-10 font-bold text-center text-[#216D30]">
        Manage Users
      </h2>
      <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />{" "}
      <table className="table mt-10">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Make Admin</th>
            <th>Subscription Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role !== "admin" ? (
                  <button
                    className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
                    onClick={() => makeAdmin(user._id)}
                    disabled={user.role === "admin"}
                  >
                    {user.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                ) : (
                  "Admin"
                )}
              </td>
              <td>{user.badge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;