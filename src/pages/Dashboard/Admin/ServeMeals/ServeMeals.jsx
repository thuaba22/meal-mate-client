import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ServeMeals = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch requested meals from your API endpoint
    fetch(
      `https://meal-mate-server.vercel.app/meals/request?page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRequestedMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching requested meals: ", error);
      });
  }, [currentPage]);

  const handleServeClick = (mealId) => {
    // Update the status of the meal to "Delivered"
    fetch(`https://meal-mate-server.vercel.app/meals/request/${mealId}`, {
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(5).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={`btn ${
              number + 1 === currentPage ? "bg-[#45D62D] text-white" : ""
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServeMeals;
