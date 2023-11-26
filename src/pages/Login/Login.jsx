import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      setLoginError("");
      await signIn(data.email, data.password);

      toast("Login successful!");

      const redirectTo = navigate(location?.state ? location.state : "/");
      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("form", {
        type: "manual",
        message: "Login failed. Please try again.",
      });
      setLoginError(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();

      toast.success("Login successful!");

      const redirectTo = navigate(location?.state ? location.state : "/");
      setTimeout(() => {
        navigate(redirectTo);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageTitle title="MealMate | Join US"></PageTitle>

      <Navbar></Navbar>
      <div className="hero container w-full md:min-h-screen  bg-white">
        <div className="hero-content flex">
          <div>
            <img src="https://i.postimg.cc/2yctBcKr/login.png" alt="" />
          </div>
          <div className="card  md:w-[500px] border bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)}>
                <h1 className="md:text-3xl text-[#1967d2] text-center font-bold">
                  Login
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="email"
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
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="password"
                      className={`input input-bordered w-full ${
                        errors.password ? "input-error" : ""
                      }`}
                    />
                    <span
                      className="absolute top-4 right-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-[#1967d2]"></FaEyeSlash>
                      ) : (
                        <FaEye className="text-[#1967d2]"></FaEye>
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-[#1967d2] hover:bg-[#1967d2] text-white mb-1">
                    Login
                  </button>
                  {loginError && <p className="text-[#1967d2]">{loginError}</p>}
                  <p className="block mb-5 text-center text-base font-normal leading-relaxed text-gray-700 antialiased">
                    Don&#39;t have an account? Please{" "}
                    <Link
                      className="font-medium text-black transition-colors hover:text-[#1967d2]"
                      to="/register"
                    >
                      Register
                    </Link>
                  </p>
                  <hr className="border-black border-1 w-1/4 mx-auto" />
                </div>
              </form>
              <div className="mt-5">
                <button
                  onClick={handleGoogle}
                  className="btn bg-[#1967d2] hover:bg-[#1967d2] text-white w-full"
                >
                  <FaGoogle className="text-3xl"></FaGoogle> Login with Google
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

export default Login;
