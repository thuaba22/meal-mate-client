import { useLoaderData } from "react-router-dom";
import Footer from "../../components/shared/Footer/Footer";
import Navbar from "../../components/shared/Navbar/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../components/CheckOutForm/CheckOutForm";
import PageTitle from "../../components/shared/PageTitle/PageTitle";

const stripePromise = loadStripe(import.meta.env.VITE_paymentKey);

const CheckOut = () => {
  const packageInfo = useLoaderData();
  return (
    <div>
      <Navbar></Navbar>
      <PageTitle title="Meal Mate | CheckOut"></PageTitle>
      <div className="h-[700px]">
        <div className="flex justify-center gap-3 mt-6 mb-6 items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#216D30]">
              Package Name: <span>{packageInfo.package_name}</span>
            </h1>
          </div>
          <div>
            <img className="w-[50px]" src={packageInfo.package_badge} alt="" />
          </div>
        </div>
        <div className="h-[30%] w-[50%] text-[#68A26C] pt-10 space-y-2 pb-6 px-4 text-center  mx-auto bg-[#ECFCE8]">
          <h2 className="text-2xl font-bold">Package Info:</h2>
          <p className="font-bold">{packageInfo.details}</p>
          <p className="font-bold">Price: {packageInfo.package_price} $</p>
        </div>
        <div className="w-[50%] mt-6 mx-auto">
          <h2 className="text-3xl text-center mb-6 text-[#216D30]">
            Pay For Your Desired Packages
          </h2>
          <div className="w-[60%] mx-auto">
            <Elements stripe={stripePromise}>
              <CheckOutForm packageInfo={packageInfo}></CheckOutForm>
            </Elements>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CheckOut;
