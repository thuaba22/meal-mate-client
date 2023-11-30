import { toast } from "react-toastify";
import Footer from "../../../../components/shared/Footer/Footer";
import Navbar from "../../../../components/shared/Navbar/Navbar";
import PageTitle from "../../../../components/shared/PageTitle/PageTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UpdateMeal = () => {
  const { mealId } = useParams();
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const [mealType, setMealType] = useState("breakfast");
  const auth = useContext(AuthContext);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch meal data based on mealId and populate the form
    fetch(`http://localhost:5000/meals/${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        // Set form values using setValue
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
        // Set selected tags
        setSelected(data.ingredients);
        // Set meal type
        setMealType(data.meal_category);
      })
      .catch((error) => {
        console.error("Error fetching meal data: ", error);
      });
  }, [mealId, setValue]);

  const handleDateChange = (e) => {
    setValue("post_time", e.target.value);
  };

  const onSubmit = (data) => {
    // Set the form data in the state
    setFormData(data);

    // Ensure that formData is defined
    if (!formData) {
      // Handle the case where form data is not defined
      console.error("Form data is not defined.");
      return;
    }

    // Set the ingredients field in the form data
    data.ingredients = selected;
    data.meal_category = mealType;
    data.price = parseFloat(data.price);
    data.rating = parseInt(data.rating);
    data.reviews = parseInt(data.reviews);
    data.likes = parseInt(data.likes);

    // Make API request to update meal data
    fetch(`http://localhost:5000/meals/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success) {
          toast.success("Meal Updated Successfully!");
          reset(); // Reset the form after successful update
        }
      });
  };

  return (
    <div>
      <PageTitle title="Meal Mate | Update Meal"></PageTitle>

      <Navbar></Navbar>
      <div className="bg-white p-10">
        <h2 className="text-5xl font-bold text-center text-[#216D30]">
          Update Meal
        </h2>
        <hr className="border-2 border-[#45D62D] w-[100px] mx-auto mt-3 mb-4" />
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

          {/* Add other form controls here */}
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
          {/* Additional form controls */}
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
              <em>press enter or comma to add new tag</em>
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
                <input
                  type="datetime-local"
                  className="border-2"
                  name="post_time"
                  defaultValue={watch("post_time")}
                  onChange={handleDateChange}
                  placeholder="Select Time/Date"
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
            value="Update Meal"
            className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white btn-block"
            required
          />
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdateMeal;
