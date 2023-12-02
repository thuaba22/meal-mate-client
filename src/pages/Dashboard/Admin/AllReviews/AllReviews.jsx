/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://meal-mate-server.vercel.app/meals/reviews?page=${currentPage}&limit=${reviewsPerPage}`
        );

        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }

        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching reviews");
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  const handleDelete = async (mealId, comment) => {
    try {
      const response = await fetch(
        `https://meal-mate-server.vercel.app/meals/reviews/${mealId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting review");
      }

      const updatedReviews = reviews.filter(
        (review) => !(review._id === mealId && review.reviewComment === comment)
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // When changing the page, reset the reviews to show loading state until the new reviews are fetched
    setReviews([]);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-5xl mt-10 font-bold text-center text-[#216D30]">
        All Reviews
      </h2>
      <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />
      <table className="table">
        <thead>
          <tr>
            <th>Meal Title</th>
            <th>Reviews</th>
            <th>Likes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.title}</td>
              <td>
                {review.reviewUser}: {review.reviewComment}
              </td>
              <td>{review.likes}</td>
              <td>
                <button
                  onClick={() => handleDelete(review._id, review.reviewComment)}
                >
                  <FaTrash />
                </button>
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

export default AllReviews;
