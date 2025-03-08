import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";
import FeatureProduct from "./../components/FeatureProduct";
import { Outlet } from 'react-router-dom';

const Home = () => {
  const data = {
    name: "Bisht store",
  };

  return (
    <>
      <HeroSection data={data} />
      {/* <Outlet/> */}
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
