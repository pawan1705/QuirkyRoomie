import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('bg.jpg')] bg-cover bg-center ">
      {/* <Navbar /> */}
      <Header />
    </div>
  );
};

export default Home;
