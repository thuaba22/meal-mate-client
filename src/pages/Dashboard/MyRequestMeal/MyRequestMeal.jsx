import { useState, useEffect, useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import Select from "react-select";
import { AuthContext } from "../../../providers/AuthProvider";
import PageTitle from "../../../components/shared/PageTitle/PageTitle";
import Navbar from "../../../components/shared/Navbar/Navbar";
import Footer from "../../../components/shared/Footer/Footer";
import Modal from "react-modal";

const MyMealRequest = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const fetchRequestedMeals = async () => {
      try {
        const userEmail = auth?.user?.email;

        const response = await fetch(
          `http://localhost:5000/meals/request-multiple/${userEmail}?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();

        setRequestedMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchRequestedMeals();
  }, [auth?.user?.email, currentPage]);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value.value);
  };

  const openModal = (mealId) => {
    setMealToDelete(mealId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setMealToDelete(null);
    setModalIsOpen(false);
  };

  const handleCancelRequest = async () => {
    if (mealToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/meals/request-multiple/${mealToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setRequestedMeals((prevMeals) =>
            prevMeals.filter((meal) => meal._id !== mealToDelete)
          );
        } else {
          console.error("Failed to cancel meal request.");
        }
      } catch (error) {
        console.error("Error canceling meal request:", error);
      }

      closeModal();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <PageTitle title="MealMate | My Meal Requests"></PageTitle>

      <Navbar></Navbar>
      <div className="mt-20 w-[90%] mx-auto mb-20">
        <div className="overflow-x-auto">
          <div className="flex ml-2 gap-2 items-center">
            <div>
              <label>Filter by Status:</label>
              <Select
                value={{ value: statusFilter, label: statusFilter }}
                onChange={handleStatusFilterChange}
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "delivered", label: "Delivered" },
                ]}
                className=""
                isClearable
                placeholder="All"
              />
            </div>
          </div>

          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          ) : (
            <table className="table mt-10">
              <thead>
                <tr>
                  <th>Meal Title</th>
                  <th>Likes count</th>
                  <th>Reviews count</th>
                  <th>Status</th>
                  <th>Cancel Button</th>
                </tr>
              </thead>
              <tbody>
                {requestedMeals.map((meal) => (
                  <tr key={meal._id}>
                    <td>{meal.meals.title}</td>
                    <td>{meal.meals.likes}</td>
                    <td>{meal.meals.reviews.length}</td>
                    <td>{meal.requestStatus}</td>
                    <td>
                      {meal.requestStatus === "Pending" && (
                        <button
                          onClick={() => openModal(meal._id)}
                          className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
        </div>
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cancel Meal Request"
        style={customStyles}
      >
        <div>
          <h2 className="text-[#216D30] font-semibold">
            Are you sure you want to cancel your meal?
          </h2>
          <div>
            <button
              className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
              onClick={handleCancelRequest}
            >
              Yes
            </button>
            <button
              className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] btn-xs"
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
      </Modal>

      <Footer></Footer>
    </div>
  );
};

export default MyMealRequest;
