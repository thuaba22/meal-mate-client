import Navbar from "../../components/shared/Navbar/Navbar";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import menuImg from "../../assets/meal_BG.jpg";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <PageTitle title="MealMate | Home"></PageTitle>
      <Navbar></Navbar>
      <Banner img={menuImg}></Banner>
    </div>
  );
};

export default Home;
