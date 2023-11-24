import { Helmet } from "react-helmet";

/* eslint-disable react/prop-types */
const PageTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;
