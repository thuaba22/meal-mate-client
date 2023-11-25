/* eslint-disable react/prop-types */
import "./Rating.css";
const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="rating">
      {stars.map((star) => (
        <span key={star} className={star <= value ? "filled" : ""}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
