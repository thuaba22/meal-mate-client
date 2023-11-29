import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photoURL");

    setRegisterError("");

    if (!/(?=.*[A-Z])(?=.*[^A-Z0-9\s]).{6,}/.test(password)) {
      setRegisterError(
        "It should contain at least 6 character, 1 uppercase & 1 special character"
      );
      return;
    }
    const auth = getAuth();
    // create user
    createUser(email, password, name, photoURL)
      .then((result) => {
        // Extract necessary information

        console.log(result.user);
        toast("Registration successful!");

        // Send user data to the server
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            photoURL,
          }),
        });

        // Show a success toast message
        formRef.current.reset();
        return signOut(auth)
          .then(() => {
            console.log("User signed out after registration.");
          })
          .catch((error) => {
            console.log("Error signing out:", error);
          });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <PageTitle title="MealMate | Register"></PageTitle>

      <Navbar></Navbar>
      <div className="hero min-h-screen  bg-white">
        <div className="hero-content flex">
          <div>
            <img
              src="https://i.postimg.cc/bvXNsPHb/mobile-login-concept-illustration-114360-232.png"
              alt=""
            />
          </div>
          <div className="card  md:w-[500px] border bg-base-100">
            <form ref={formRef} onSubmit={handleRegister} className="card-body">
              <h1 className="text-3xl text-[#216D30] font-bold">Sign Up</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo_URL</span>
                </label>
                <input
                  type="text"
                  placeholder="photo_url"
                  name="photoURL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                  />
                  <span
                    className="absolute top-4 right-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </span>
                </div>
                <div className="inline-flex items-center mt-3">
                  <label
                    className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                    data-ripple-dark="true"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                      id="checkbox"
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px cursor-pointer select-none font-light text-gray-700"
                    htmlFor="checkbox"
                  >
                    <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                      I agree the
                      <a
                        className="font-medium transition-colors hover:text-[#216D30]"
                        href="#"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </p>
                  </label>
                </div>
                {registerError && (
                  <p className="text-[#216D30]">{registerError}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white">
                  Register
                </button>
                <p className="mt-4 block text-center text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Already have an account?
                  <Link
                    className="font-medium text-black transition-colors hover:text-[#216D30]"
                    to="/login"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
