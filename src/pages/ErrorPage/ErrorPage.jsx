import { Link } from "react-router-dom";
import PageTitle from "../../components/shared/PageTitle/PageTitle";

const Error = () => {
  return (
    <div className="container md:w-[90%] p-10 mt-10 bg-[#f0f6fe] mx-auto flex flex-col md:flex-row justify-between items-center">
      <PageTitle title="Meal Mate | ErrorPage"></PageTitle>

      <div>
        <img
          src="https://i.postimg.cc/nLR34vG2/404-error-with-cute-animal-concept-illustration-114360-1900.png"
          alt=""
        />
      </div>
      <div className="text-center space-y-3">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-[#216D30] font-semibold">
          We Are Sorry, Page Not Found
        </p>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
