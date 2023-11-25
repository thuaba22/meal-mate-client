import Navbar from "../../components/shared/Navbar/Navbar";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import menuImg from "../../assets/meal_BG.jpg";
import Banner from "../../components/Banner/Banner";
import MealsByCategory from "../../components/MealsByCategory/MealsByCategory";
import Footer from "../../components/shared/Footer/Footer";
import AboutMealMate from "../../components/AboutMealMate/AboutMealMate";

const Home = () => {
  return (
    <div>
      <PageTitle title="MealMate | Home"></PageTitle>
      <Navbar></Navbar>
      <Banner img={menuImg}></Banner>
      <MealsByCategory></MealsByCategory>
      <AboutMealMate></AboutMealMate>
      <Footer></Footer>
    </div>
  );
};

export default Home;
