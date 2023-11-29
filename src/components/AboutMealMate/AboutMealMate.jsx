import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const AboutMealMate = () => {
  return (
    <div className="hero mt-20 mb-20 h-[700px] md:h-[800px] lg:h-[600px] bg-[#216D30]">
      <div className="hero-content flex-col gap-6 lg:flex-row-reverse">
        <div className="text-center text-white lg:text-left">
          <TypeAnimation
            sequence={[
              "Welcome",
              500,
              "Welcome To", //  Continuing previous Text
              500,
              "Welcome To The",
              500,
              "Welcome To The MealMate",
              500,
              "Welcome To The",
              500,
              "Welcome To",
              500,
              "Welcome",
              500,
              "",
              500,
            ]}
            style={{ fontSize: "2em" }}
            repeat={Infinity}
          />
          <p className="py-6">
            Welcome to our Canteen, where health, taste, and education unite.
            Our menu explores a world of flavors, catering to all dietary
            preferences while promoting sustainability.
          </p>
          <p className="py-6">
            Our onsite garden allows students to understand the journey from
            farm to plate, fostering an appreciation for ecology.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02, y: -5 }}>
          <img
            className=""
            src="https://i.postimg.cc/gjqfShCT/students-having-lunch-canteen.jpg"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMealMate;
