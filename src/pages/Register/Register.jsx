import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      setRegisterError("");

      if (!/(?=.*[A-Z])(?=.*[^A-Z0-9\s]).{6,}/.test(data.password)) {
        setError(
          "password",
          { type: "manual" },
          "It should contain at least 6 characters, 1 uppercase & 1 special character"
        );
        return;
      }

      const auth = getAuth();

      // create user
      await createUser(data.email, data.password, data.name, data.photoURL);

      // Extract necessary information
      toast("Registration successful!");

      // Send user data to the server
      fetch("https://meal-mate-server.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          photoURL: data.photoURL,
        }),
      });

      // Show a success toast message
      reset();
      return signOut(auth)
        .then(() => {
          console.log("User signed out after registration.");
        })
        .catch((error) => {
          console.log("Error signing out:", error);
        });
    } catch (error) {
      console.error(error);
      setRegisterError(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      toast.success("Google Sign-In successful!");

      // You can use the user information as needed
      const { email, displayName: name, photoURL } = user;

      // Send user data to the server
      fetch("https://meal-mate-server.vercel.app/users", {
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

      e.stopPropagation();

      // Redirect or perform other actions as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageTitle title="MealMate | Register"></PageTitle>

      <Navbar></Navbar>
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex">
          <div>
            <img
              src="https://i.postimg.cc/bvXNsPHb/mobile-login-concept-illustration-114360-232.png"
              alt=""
            />
          </div>
          <div className="card md:w-[500px] border bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <h1 className="text-3xl text-[#216D30] font-bold">Sign Up</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: "Name is required" })}
                    className={`input input-bordered ${
                      errors.name ? "input-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo_URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="photo_url"
                    {...register("photoURL", {
                      required: "Photo URL is required",
                    })}
                    className={`input input-bordered ${
                      errors.photoURL ? "input-error" : ""
                    }`}
                  />
                  {errors.photoURL && (
                    <span className="text-red-500">
                      {errors.photoURL.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: "Email is required" })}
                    className={`input input-bordered ${
                      errors.email ? "input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`input input-bordered w-full ${
                        errors.password ? "input-error" : ""
                      }`}
                    />
                    <span
                      className="absolute top-4 right-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="inline-flex items-center mt-3">
                    <label
                      className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                      htmlFor="checkbox"
                      data-ripple-dark="true"
                    >
                      {/* ... checkbox input ... */}
                    </label>
                    {/* ... terms and conditions label ... */}
                  </div>
                  {registerError && (
                    <p className="text-[#216D30]">{registerError}</p>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white"
                  >
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
              <div className="form-control mt-5">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn bg-[#45D62D] hover:bg-[#45D62D] text-white w-full"
                >
                  <FaGoogle className="text-3xl"></FaGoogle> Register with
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
