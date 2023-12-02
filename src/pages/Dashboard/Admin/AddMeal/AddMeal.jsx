import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../../../components/shared/Footer/Footer";
import Navbar from "../../../../components/shared/Navbar/Navbar";
import PageTitle from "../../../../components/shared/PageTitle/PageTitle";
import { AuthContext } from "../../../../providers/AuthProvider";
import { TagsInput } from "react-tag-input-component";

const AddMeals = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [mealType, setMealType] = useState("breakfast"); // Default meal type
  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState("addMeal");
  const auth = useContext(AuthContext);

  const handleDateChange = (date, name) => {
    setValue(name, date);
  };

  const onSubmit = async (data) => {
    // Set the ingredients field in the form data
    data.ingredients = selected;
    data.meal_category = mealType;
    data.price = parseFloat(data.price);
    data.rating = parseInt(data.rating);
    data.reviews = parseInt(data.reviews);
    data.likes = parseInt(data.likes);

    try {
      // Make API request to post meal data to the appropriate collection
      const endpoint =
        activeTab === "addMeal"
          ? "https://meal-mate-server.vercel.app/meals"
          : "https://meal-mate-server.vercel.app/upcoming-meals";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.insertedId) {
        toast.success("Meal Added Successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Error adding meal. Please try again.");
    }
  };

  return (
    <div>
      <PageTitle title="Meal Mate | Add Meals"></PageTitle>

      <Navbar></Navbar>
      <div className="bg-white p-10">
        <h2 className="text-5xl font-bold text-center text-[#216D30]">
          Add A Meal
        </h2>
        <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />

        <div className="mb-4">
          <button
            className={`btn ${
              activeTab === "addMeal" ? "bg-[#45D62D]" : "bg-gray-300"
            } hover:bg-[#45D62D] text-white`}
            onClick={() => setActiveTab("addMeal")}
          >
            Add Meal
          </button>
          <button
            className={`btn ${
              activeTab === "addToUpcoming" ? "bg-[#45D62D]" : "bg-gray-300"
            } hover:bg-[#45D62D] text-white ml-2`}
            onClick={() => setActiveTab("addToUpcoming")}
          >
            Add to Upcoming Meal
          </button>
        </div>

        {activeTab === "addMeal" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Meal Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Meal Title"
                    className="input input-bordered w-full"
                    {...register("title", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Meal Type</span>
                </label>
                <label className="input-group">
                  <select
                    name="meal_category"
                    className="select select-primary w-full"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Meal Image URL
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="image"
                    placeholder="Meal Image URL"
                    className="input input-bordered w-full"
                    {...register("image", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Ingredients</span>
                </label>
                <pre>{JSON.stringify(selected)}</pre>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name="fruits"
                  placeHolder="enter fruits"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Description</span>
                </label>
                <label className="input-group">
                  <textarea
                    name="meal_description"
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    {...register("meal_description", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Price</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    {...register("price", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Rating</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    className="input input-bordered w-full"
                    {...register("rating", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Time/Date</span>
                </label>
                <label className="input-group">
                  <DatePicker
                    className="border-2"
                    showIcon
                    selected={watch("post_time")}
                    onChange={(date) => handleDateChange(date, "post_time")}
                    isClearable
                    placeholderText="Select Time/Date"
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Reviews</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="reviews"
                    placeholder="Reviews"
                    className="input input-bordered w-full"
                    defaultValue={0}
                    {...register("reviews", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Likes</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="likes"
                    placeholder="Likes (Default: 0)"
                    className="input input-bordered w-full"
                    {...register("likes", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Admin/distributor Name
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="admin_name"
                    placeholder="Admin/distributor Name"
                    // Add defaultValue with auth data
                    defaultValue={auth?.user?.displayName}
                    className="input input-bordered w-full"
                    {...register("admin_name", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Admin/distributor Email
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="admin_email"
                    // Add defaultValue with auth data
                    defaultValue={auth?.user?.email}
                    placeholder="Admin/distributor Email"
                    className="input input-bordered w-full"
                    {...register("admin_email", {
                      required: true,
                      pattern: /^\S+@\S+$/i, // Basic email validation pattern
                    })}
                  />
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Add Meal"
              className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white btn-block"
              required
            />
          </form>
        )}

        {activeTab === "addToUpcoming" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Meal Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Meal Title"
                    className="input input-bordered w-full"
                    {...register("title", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Meal Type</span>
                </label>
                <label className="input-group">
                  <select
                    name="meal_category"
                    className="select select-primary w-full"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Meal Image URL
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="image"
                    placeholder="Meal Image URL"
                    className="input input-bordered w-full"
                    {...register("image", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Ingredients</span>
                </label>
                <pre>{JSON.stringify(selected)}</pre>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name="fruits"
                  placeHolder="enter fruits"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Description</span>
                </label>
                <label className="input-group">
                  <textarea
                    name="meal_description"
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    {...register("meal_description", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Price</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    {...register("price", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Rating</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    className="input input-bordered w-full"
                    {...register("rating", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Time/Date</span>
                </label>
                <label className="input-group">
                  <DatePicker
                    className="border-2"
                    showIcon
                    selected={watch("post_time")}
                    onChange={(date) => handleDateChange(date, "post_time")}
                    isClearable
                    placeholderText="Select Time/Date"
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Reviews</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="reviews"
                    placeholder="Reviews"
                    className="input input-bordered w-full"
                    defaultValue={0}
                    {...register("reviews", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">Likes</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="likes"
                    placeholder="Likes (Default: 0)"
                    className="input input-bordered w-full"
                    {...register("likes", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Admin/distributor Name
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="admin_name"
                    placeholder="Admin/distributor Name"
                    // Add defaultValue with auth data
                    defaultValue={auth?.user?.displayName}
                    className="input input-bordered w-full"
                    {...register("admin_name", { required: true })}
                  />
                </label>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-[#216D30]">
                    Admin/distributor Email
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="admin_email"
                    // Add defaultValue with auth data
                    defaultValue={auth?.user?.email}
                    placeholder="Admin/distributor Email"
                    className="input input-bordered w-full"
                    {...register("admin_email", {
                      required: true,
                      pattern: /^\S+@\S+$/i, // Basic email validation pattern
                    })}
                  />
                </label>
              </div>
            </div>

            <input
              type="submit"
              value="Add Upcoming Meal"
              className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white btn-block"
              required
            />
          </form>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddMeals;
