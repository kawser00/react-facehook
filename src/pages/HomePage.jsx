import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <p>HomePage</p>
      <Link to="/me">Go to Profile Page</Link>
    </div>
  );
};

export default HomePage;
