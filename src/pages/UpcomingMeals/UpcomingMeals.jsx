import { useState, useEffect } from "react";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import { RotatingLines } from "react-loader-spinner";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Select from "react-select";

const UpcomingMeals = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUpcomingMeals, setFilteredUpcomingMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://meal-mate-server.vercel.app/upcoming-meals")
        .then((response) => response.json())
        .then((data) => {
          setUpcomingMeals(data);
          setFilteredUpcomingMeals(data);
          setLoading(false);

          // Extract unique categories from upcoming meals
          const uniqueCategories = [
            ...new Set(data.map((meal) => meal.meal_category)),
          ];
          setCategories(
            uniqueCategories.map((category) => ({
              value: category,
              label: category,
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
    }, 2000);
  }, []);

  useEffect(() => {
    // Filter upcoming meals based on the search query
    const filtered = upcomingMeals.filter((meal) =>
      meal.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter upcoming meals based on the selected category
    if (selectedCategory) {
      setFilteredUpcomingMeals(
        filtered.filter((meal) => meal.meal_category === selectedCategory.value)
      );
    } else {
      setFilteredUpcomingMeals(filtered);
    }
  }, [searchQuery, selectedCategory, upcomingMeals]);

  useEffect(() => {
    // Filter upcoming meals based on the price range
    const filtered = upcomingMeals.filter(
      (meal) =>
        (!priceRange.min || meal.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || meal.price <= parseFloat(priceRange.max))
    );
    setFilteredUpcomingMeals(filtered);
  }, [priceRange, upcomingMeals]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceFilter = () => {
    // Filter upcoming meals based on the price range
    const filtered = upcomingMeals.filter(
      (meal) =>
        (!priceRange.min || meal.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || meal.price <= parseFloat(priceRange.max))
    );
    setFilteredUpcomingMeals(filtered);
    setCurrentPage(1);
  };

  const handleLike = (mealId) => {
    // Send a request to the server to increment the like count for the given mealId
    fetch(`https://meal-mate-server.vercel.app/upcoming-meals/${mealId}/like`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the like count in the state
        const updatedMeals = upcomingMeals.map((meal) =>
          meal._id === mealId ? { ...meal, likes: data.likes } : meal
        );
        setUpcomingMeals(updatedMeals);
      })
      .catch((error) => {
        console.error("Error liking meal: ", error);
      });
  };

  const indexOfLastItem = currentPage * 6; // You can adjust this as needed
  const indexOfFirstItem = indexOfLastItem - 6;
  const currentItems = filteredUpcomingMeals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUpcomingMeals.length / 6); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <PageTitle title="MealMate | Upcoming Meals" />

      <Navbar />
      <div className="mt-20 w-[80%] mx-auto mb-20">
        <div className="overflow-x-auto">
          <div className="flex ml-2 gap-2 items-center">
            <div>
              {/* Search input */}
              <input
                type="text"
                placeholder="Search by Meal Title"
                value={searchQuery}
                onChange={handleSearch}
                className="input input-bordered input-success max-w-xs"
              />
            </div>
            {/* Category dropdown */}
            <div className="">
              <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                options={categories}
                className=""
                isClearable
                placeholder="All Categories"
              />
            </div>
          </div>

          {/* Price range inputs */}
          <div className="mt-2 ml-2">
            <label>Filter by Price Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="input input-bordered input-success "
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="input input-bordered input-success "
              />
            </div>
            <button
              onClick={handlePriceFilter}
              className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] mt-2"
            >
              Apply
            </button>
          </div>

          {/* Loading spinner or upcoming meals cards */}
          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {currentItems.map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-[#ECFCE8] p-4 rounded shadow"
                  >
                    <img
                      className="w-full h-48 object-cover mb-4 rounded"
                      src={meal.image}
                      alt={meal.title}
                    />
                    <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
                    <p className="text-gray-600 mb-2">{meal.meal_category}</p>
                    <p className="text-gray-600 mb-4">
                      Distributor: {meal.admin_name}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Post Time: {meal.post_time}
                    </p>
                    <p className="text-green-600 font-semibold mb-2">
                      {meal.price}$
                    </p>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleLike(meal._id)}
                        className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] mr-2"
                      >
                        Like ({meal.likes})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`btn ${
                      number === currentPage ? "bg-[#45D62D] text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpcomingMeals;
