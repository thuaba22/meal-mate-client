import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ServeMeals = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);

  useEffect(() => {
    // Fetch requested meals from your API endpoint
    fetch("http://localhost:5000/meals/request")
      .then((response) => response.json())
      .then((data) => {
        setRequestedMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching requested meals: ", error);
      });
  }, []);

  const handleServeClick = (mealId) => {
    // Update the status of the meal to "Delivered"
    fetch(`http://localhost:5000/meals/request/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          // Update the local state to reflect the change
          setRequestedMeals((meals) =>
            meals.map((meal) =>
              meal._id === mealId
                ? { ...meal, requestStatus: "Delivered" }
                : meal
            )
          );

          toast.success("Meal served successfully!");
        } else {
          toast.error("Failed to serve meal. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error serving meal: ", error);
        toast.error("Failed to serve meal. Please try again.");
      });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-center text-[#216D30]">
        Serve Meals
      </h2>
      <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />{" "}
      <table className="table mt-10">
        <thead>
          <tr>
            <th>Meal Title</th>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requestedMeals.map((meal) => (
            <tr key={meal._id}>
              <td>{meal.meals.title}</td>
              <td>{meal.userData.email}</td>
              <td>{meal.userData.name}</td>
              <td>{meal.requestStatus}</td>

              <td>
                {meal.requestStatus === "Pending" ? (
                  <button
                    className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
                    onClick={() => handleServeClick(meal._id)}
                  >
                    Serve
                  </button>
                ) : (
                  <span>Already Served</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServeMeals;
