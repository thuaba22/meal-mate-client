import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Rating from "../../components/MealsByCategory/Rating";
import { FaThumbsUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useContext, useState } from "react";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const MealDetails = () => {
  // Fetch meal details using useLoaderData hook
  const meals = useLoaderData();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // State variable to track the number of likes
  const [likes, setLikes] = useState(meals.likes);

  // State variable to track whether the user has liked the meal
  const [liked, setLiked] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(meals.reviews);

  // State variable to track the meal request status
  const [mealRequestStatus, setMealRequestStatus] = useState("NotRequested");
  // Function to handle the like button click
  const handleLike = async () => {
    try {
      // Check if the user has already liked the meal
      if (!liked) {
        // Send a PUT request to update the likes for the meal
        const response = await fetch(
          `http://localhost:5000/meals/like/${meals._id}`,
          {
            method: "PUT",
          }
        );

        // Check if the request was successful
        if (response.ok) {
          // Update the likes in the state variable
          setLikes(likes + 1);
          // Set liked to true
          setLiked(true);
        } else {
          console.error("Failed to update likes.");
        }
      }
    } catch (error) {
      console.error("Failed to update likes.", error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch("http://localhost:5000/meals/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId: meals._id,
          user: auth.user.displayName,
          comment: reviewText,
          email: auth.user.email,
        }),
      });

      if (response.ok) {
        // Update the reviews state with the new review
        setReviews([
          ...reviews,
          { user: auth.user.displayName, comment: reviewText },
        ]);
        toast("Thank You For Your Valuable Reviews!");
        // Clear the review text
        setReviewText("");
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const handleMealRequest = async () => {
    try {
      const userResponse = await fetch(
        `http://localhost:5000/users/${auth.user.email}`
      );
      const userData = await userResponse.json();

      if (userData.badge === "Bronze") {
        toast("You have a Bronze badge. Consider buying a package!");
        const redirectTo = navigate(location?.state ? location.state : "/");
        setTimeout(() => {
          navigate(redirectTo);
        }, 1500);
        return;
      }

      setMealRequestStatus("Pending");

      const response = await fetch(
        "http://localhost:5000/meals/request-multiple",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meals,
            userData,
          }),
        }
      );

      if (response.ok) {
        // Display a toast message
        toast("Meal request sent successfully!");
      } else {
        console.error("Failed to send meal request.");
      }
    } catch (error) {
      console.error("Failed to request meal.", error);
    }
  };

  return (
    <div>
      <PageTitle title="MealMate | Meal Details"></PageTitle>

      {/* Navbar component */}
      <Navbar></Navbar>

      <div>
        {/* Meal image */}
        <img
          className="w-[600px] mx-auto mt-20 mb-6"
          src={meals.image}
          alt=""
        />

        <div className="w-[48%] mx-auto flex mb-10 justify-between items-center">
          {/* Rating component */}
          <Rating value={meals.rating} />

          {/* Request A Meal button */}
          {mealRequestStatus === "Pending" ? (
            <button className="btn btn-outline bg-gray-400 text-white cursor-not-allowed">
              Pending
            </button>
          ) : (
            <button
              onClick={handleMealRequest}
              className="btn btn-outline bg-[#45D62D] text-white"
            >
              Request A Meal
            </button>
          )}

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-outline bg-[#45D62D] text-white"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Give Review
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box space-y-3">
              <h3 className="font-bold text-[#216D30] text-lg">
                Please Feel Free To Share
              </h3>
              <textarea
                className="textarea w-[90%] textarea-success"
                placeholder="Type Here.."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <AwesomeButton type="primary" onPress={handleSubmitReview}>
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

          {/* Like button with conditional style and disabled attribute based on 'liked' state */}
          <button
            onClick={handleLike}
            className={`btn btn-outline ${
              liked ? "bg-[#ff5757] text-white" : "bg-[#45D62D] text-white"
            }`}
          >
            <FaThumbsUp /> {likes}
          </button>
        </div>

        {/* Meal details */}
        <div className="w-[48%] mx-auto">
          <h2 className="text-3xl font-bold text-[#216D30]">{meals.title}</h2>

          {/* Distributor info, posting date, and total likes */}
          <div className="mt-4 text-[#68a26c] text-md font-semibold">
            <p>
              Distributor Name:{" "}
              <span className="text-[#216D30]">{meals.admin_name}</span>
            </p>
            <p>
              Posting Date:{" "}
              <span className="text-[#216D30]">{meals.post_time}</span>
            </p>
            <p>
              Total Likes: <span className="text-[#216D30]">{likes}</span>
            </p>
          </div>

          {/* Ingredients list */}
          <div className="mb-6">
            <p className="text-[#68a26c] text-md font-semibold">
              Ingridients:
              <ul className="text-[#216D30] ml-4 list-disc pl-4">
                {meals.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </p>
          </div>

          {/* Meal description */}
          <div className="mt-4 text-[#68a26c] text-md font-semibold">
            <p>
              Meal Description: <br />
              <span className="text-[#216D30]">{meals.meal_description}</span>
            </p>
          </div>

          {/* Reviews using Swiper */}
          <div className="mt-4 text-[#68a26c] text-md font-semibold">
            <p>Reviews: </p>
            {reviews?.length > 0 ? (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col items-center mx-24 my-16">
                      <p className="py-3 text-[#68a26c]">{review.user}</p>
                      <h3 className="text-2xl text-[#216D30]">
                        {review.comment}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
