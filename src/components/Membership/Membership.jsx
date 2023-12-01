import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Membership = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/premium")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPackages(data);
      });
  }, []);

  return (
    <div className="mt-24 mb-24">
      <p className="text-[#68A26C] mb-4 text-center">---Membership---</p>
      <h2 className="text-5xl text-center text-[#216D30]">
        Explore Our Membership Packages
      </h2>
      <hr className="border-2 border-[#45D62D] w-1/4 mx-auto mt-3 mb-4" />

      <div className="container mt-10 w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {packages.map((membership) => (
          <div key={membership._id} className="card bg-[#216D30] shadow-xl">
            <Link to={`/checkout/${membership._id}`}>
              <figure className="px-10 pt-10">
                <img
                  src={membership.package_badge}
                  alt="Shoes"
                  className="rounded-xl w-[70%]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white text-3xl font-bold">
                  {membership.package_name}
                </h2>
                <p className="text-white">
                  Price: {membership.package_price} $
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
