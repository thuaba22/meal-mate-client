import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import ReactPaginate from "react-paginate";
import { RotatingLines } from "react-loader-spinner";

import "./MealsByCategory.css";
import Rating from "./Rating";
const MealsByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("All Meals");
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const auth = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetch("https://meal-mate-server.vercel.app/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (meals.length > 0) {
      if (activeCategory === "All Meals") {
        setFilteredMeals(meals);
      } else {
        const filtered = meals.filter(
          (meal) => meal.meal_category === activeCategory
        );
        setFilteredMeals(filtered);
      }
    }
  }, [activeCategory, meals]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-24 mb-10">
      <p className="text-[#68A26C] mb-4 text-center">---TRY & DISCOVER---</p>
      <h2 className="text-5xl text-center text-[#216D30]">
        Explore Your Favorite Meals
      </h2>
      <hr className="border-2 border-[#45D62D] w-1/4 mx-auto mt-3 mb-4" />
      <div className="flex flex-col md:flex-row justify-center mt-10 mb-5 gap-5">
        <button
          className={`btn btn-outline btn-success ${
            activeCategory === "All Meals" && "bg-[#D2EDCF]"
          }`}
          onClick={() => handleCategoryClick("All Meals")}
        >
          All Meals
        </button>
        <button
          className={`btn btn-outline btn-success ${
            activeCategory === "breakfast" && "bg-[#D2EDCF]"
          }`}
          onClick={() => handleCategoryClick("breakfast")}
        >
          Breakfast
        </button>
        <button
          className={`btn btn-outline btn-success  ${
            activeCategory === "lunch" && "bg-[#D2EDCF]"
          }`}
          onClick={() => handleCategoryClick("lunch")}
        >
          Lunch
        </button>
        <button
          className={`btn btn-outline btn-success ${
            activeCategory === "dinner" && "bg-[#D2EDCF]"
          }`}
          onClick={() => handleCategoryClick("dinner")}
        >
          Dinner
        </button>
      </div>
      <div className="container mt-10 w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {loading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        ) : (
          currentItems.map((meal) => (
            <motion.div
              key={meal.meal_id}
              className="card bg-[#ECFCE8] border"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <figure>
                <img
                  className="h-[200px] w-full"
                  src={meal.image}
                  alt="mealImage"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-[#216D30] text-[18px]">
                    {meal.title}
                  </h2>
                  <div className="badge bg-[#68A26C] text-white">
                    {meal.meal_category}
                  </div>
                </div>
                <div>
                  <Rating value={meal.rating} />
                  <p className="text-[#68A26C]">
                    Price: <span className="font-bold">{meal.price} $</span>
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <Link to={`/meal/${meal._id}`}>
                    <button
                      onClick={() => {
                        if (!auth.user) {
                          toast.error(
                            "You have to log in first to view details"
                          );
                        }
                      }}
                      className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredMeals.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <div className="w-[10%] mt-10 mx-auto">
        <Link to="/meals">
          <button className="btn w-full px-6 btn-outline btn-success">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MealsByCategory;
