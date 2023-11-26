import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Rating from "../../components/MealsByCategory/Rating";
import { FaThumbsUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

const MealDetails = () => {
  // Fetch meal details using useLoaderData hook
  const meals = useLoaderData();

  // State variable to track the number of likes
  const [likes, setLikes] = useState(meals.likes);

  // State variable to track whether the user has liked the meal
  const [liked, setLiked] = useState(false);

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

  return (
    <div>
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
          <button className="btn btn-outline bg-[#45D62D] text-white">
            Request A Meal
          </button>

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
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {meals.reviews.map((review, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
