import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../../../providers/AuthProvider";
import Navbar from "../../../components/shared/Navbar/Navbar";
import Footer from "../../../components/shared/Footer/Footer";
import { AwesomeButton } from "react-awesome-button";
import { toast } from "react-toastify";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const auth = useContext(AuthContext);

  useEffect(() => {
    // Fetch reviews based on user email and current page
    const userEmail = auth?.user?.email;

    fetch(
      `http://localhost:5000/meals/user-reviews/${userEmail}?page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
        setLoading(false);
      });
  }, [auth?.user?.email, currentPage]);

  const handleUpdateReview = async (mealId, email, user, comment) => {
    try {
      const response = await fetch(
        `http://localhost:5000/meals/review/${mealId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, user, comment }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setReviewText("");
        toast.success("Your Review Has Been Updated Successfully");
      } else {
        console.error("Failed to update review.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (mealId, email, user) => {
    try {
      const response = await fetch(
        `http://localhost:5000/meals/review/${mealId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, user }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // If the delete is successful, update the reviews state
        const updatedReviews = reviews.filter(
          (review) => review._id !== mealId
        );
        setReviews(updatedReviews);
        toast.success("Review deleted successfully");
      } else {
        console.error("Failed to delete review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 w-[90%] mx-auto mb-20">
        <div className="overflow-x-auto">
          {/* Loading spinner or reviews table */}
          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          ) : (
            <>
              <table className="table mt-10">
                <thead>
                  <tr>
                    <th>Meal Title</th>
                    <th>Likes count</th>
                    <th>Reviews count</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>View Meal</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.title}</td>
                      <td>{review.likes}</td>
                      <td>{review.reviews.length}</td>
                      <td>
                        <button
                          className="btn btn-xs bg-[#45D62D] hover:bg-[#45D62D] text-white"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          Update
                        </button>
                        <dialog
                          id="my_modal_5"
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box space-y-3">
                            <h3 className="font-bold text-[#216D30] text-lg">
                              Want To Update Your Review?
                            </h3>
                            <textarea
                              className="textarea w-[90%] textarea-success"
                              placeholder="Type Here.."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                            <AwesomeButton
                              type="primary"
                              onPress={() =>
                                handleUpdateReview(
                                  review._id,
                                  auth.user.email,
                                  auth.user.displayName,
                                  reviewText
                                )
                              }
                            >
                              Submit
                            </AwesomeButton>

                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteReview(
                              review._id,
                              auth.user.email,
                              auth.user.displayName
                            )
                          }
                          className="btn bg-[#FF4500] text-white hover:bg-[#FF4500] btn-xs"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/meal/${review._id}`} // Assuming the route to view a meal is "/meal/:id"
                          className="btn bg-[#1E90FF] text-white hover:bg-[#1E90FF] btn-xs"
                        >
                          View Meal
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-4">
                <button
                  className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs mx-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs mx-1"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyReviews;
