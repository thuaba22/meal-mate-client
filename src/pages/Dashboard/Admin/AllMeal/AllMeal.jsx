import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Select from "react-select";
import PageTitle from "../../../../components/shared/PageTitle/PageTitle";
import Navbar from "../../../../components/shared/Navbar/Navbar";
import Footer from "../../../../components/shared/Footer/Footer";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/meals")
        .then((response) => response.json())
        .then((data) => {
          setMeals(data);
          setFilteredMeals(data);
          setLoading(false);

          // Extract unique categories from meals
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
    // Filter meals based on the search query
    const filtered = meals.filter((meal) =>
      meal.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter meals based on the selected category
    if (selectedCategory) {
      setFilteredMeals(
        filtered.filter((meal) => meal.meal_category === selectedCategory.value)
      );
    } else {
      setFilteredMeals(filtered);
    }
  }, [searchQuery, selectedCategory, meals]);

  useEffect(() => {
    // Filter meals based on the price range
    const filtered = meals.filter(
      (meal) =>
        (!priceRange.min || meal.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || meal.price <= parseFloat(priceRange.max))
    );
    setFilteredMeals(filtered);
  }, [priceRange, meals]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceFilter = () => {
    // Filter meals based on the price range
    const filtered = meals.filter(
      (meal) =>
        (!priceRange.min || meal.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || meal.price <= parseFloat(priceRange.max))
    );
    setFilteredMeals(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (mealId) => {
    // Make API request to delete meal
    fetch(`http://localhost:5000/meals/${mealId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success) {
          // Remove the deleted meal from the state
          setMeals((prevMeals) =>
            prevMeals.filter((meal) => meal._id !== mealId)
          );
          toast.success("Meal deleted successfully");
        } else {
          // Handle error
          console.error("Error deleting meal:", responseData.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting meal:", error);
      });
  };

  const indexOfLastItem = currentPage * 6; // You can adjust this as needed
  const indexOfFirstItem = indexOfLastItem - 6;
  const currentItems = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMeals.length / 6); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <PageTitle title="MealMate | Dashboard | All Meals" />

      <Navbar />
      <div className="mt-20 w-[90%] mx-auto mb-20">
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

          {/* Loading spinner or meals table */}
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
              <table className="table mt-10">
                <thead>
                  <tr>
                    <th>Meal_Image</th>
                    <th>Title</th>
                    <th>Meal_Category</th>
                    <th>Distributor</th>
                    <th>Meal Posting Date</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((meal) => (
                    <tr key={meal._id}>
                      <td>
                        <img className="w-[100px]" src={meal.image} alt="" />
                      </td>
                      <td>{meal.title}</td>
                      <td>{meal.meal_category}</td>
                      <td>{meal.admin_name}</td>
                      <td>{meal.post_time}</td>
                      <td>{meal.price}$</td>
                      <td>
                        <Link to={`/meal/${meal._id}`}>
                          <button className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs">
                            Details
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/dashboard/update-meal/${meal._id}`}>
                          <button className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs">
                            <FaRegEdit />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link>
                          <button
                            onClick={() => handleDelete(meal._id)}
                            className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
                          >
                            <MdDelete />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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

export default AllMeals;
