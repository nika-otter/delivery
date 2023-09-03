import React from "react";
import Header from "../../components/Header";
import Login from "../../components/Login";
import AddTransportSchedule from "../../components/TransportSchedule";
import Footer from "../../components/Footer";

const Manager = () => {
  return (
    <>
      <Header />
      <Login />
      <AddTransportSchedule />
      <Footer />
    </>
  );
};

export default Manager;
