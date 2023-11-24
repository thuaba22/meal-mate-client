const Logo = () => {
  return (
    <div className="flex items-center">
      <img
        className="w-[15%]"
        src="https://i.postimg.cc/cCDgVv41/mealmate-removebg-preview.png"
        alt="logo"
      />
      <h1 className="text-md md:text-4xl font-semibold text-[#216D30]">
        Meal<span className=" text-[#45D62D]">Mate</span>
      </h1>
    </div>
  );
};

export default Logo;
