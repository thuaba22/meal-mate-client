import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpcomingAdmin = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch upcoming meals from your API endpoint
    fetch(`http://localhost:5000/upcoming-meals?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching upcoming meals: ", error);
      });
  }, [currentPage]);

  const handlePublishClick = (mealId) => {
    // Publish the meal if it has at least 10 likes
    fetch(`http://localhost:5000/upcoming-meals/publish/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          // Update the local state to remove the published meal
          setUpcomingMeals((meals) =>
            meals.filter((meal) => meal._id !== mealId)
          );

          toast.success("Meal published successfully!");
        } else {
          toast.error(responseData.message);
        }
      })
      .catch((error) => {
        console.error("Error publishing meal: ", error);
        toast.error("Failed to publish meal. Please try again.");
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-center text-[#216D30]">
        Upcoming Meals
      </h2>
      <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />
      <table className="table mt-10">
        <thead>
          <tr>
            <th>Meal Title</th>
            <th>Likes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map((meal) => (
            <tr key={meal._id}>
              <td>{meal.title}</td>
              <td>{meal.likes}</td>
              <td>
                {meal.likes >= 10 ? (
                  <button
                    className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
                    onClick={() => handlePublishClick(meal._id)}
                  >
                    Publish
                  </button>
                ) : (
                  <span>Not Enough Likes</span>
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

export default UpcomingAdmin;
