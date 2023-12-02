import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const userEmail = auth?.user?.email;

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch(
          `https://meal-mate-server.vercel.app/users/admin/${userEmail}`
        );
        const data = await response.json();

        if (response.ok) {
          setIsAdmin(data.admin);
        } else {
          console.error("Error fetching admin status:", data.error);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [userEmail]);

  return { isAdmin, loading };
};

export default useAdminStatus;
