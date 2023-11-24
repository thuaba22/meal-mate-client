/* eslint-disable react/prop-types */
import { Parallax } from "react-parallax";

const Banner = ({ img }) => {
  return (
    <div className="mb-10">
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero h-[500px]">
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Your Campus Dining, Your Way
              </h1>
              <p className="text-lg text-white mb-6">
                Welcome to our whimsical world of delicious delights. Savor each
                bite as we bring you a delightful dining experience, crafted
                with love and care just for you!
              </p>
              <div className="relative w-[70%] mx-auto">
                <input
                  type="text"
                  placeholder="Search Here.."
                  className="input input-bordered w-full pr-16"
                />
                <button className="btn bg-[#45D62D] text-white hover:bg-[#45D62D] absolute top-0 right-0 rounded-l-none">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
      </Parallax>
    </div>
  );
};

export default Banner;
