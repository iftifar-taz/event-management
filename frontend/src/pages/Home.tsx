import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <Link
        to="/dashboard"
        className="font-semibold text-indigo-600 hover:text-indigo-500 pl-1"
      >
        Dashboard
      </Link>
    </>
  );
};

export default Home;
