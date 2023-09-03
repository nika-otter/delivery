import React from "react";
import Header from "../../components/Header";
import Login from "../../components/Login";
import AddTransportSchedule from "../../components/TransportSchedule";
import Footer from "../../components/Footer";
import TransportScheduleTable from "../../components/TransportScheduleTable";

const Manager = () => {
  return (
    <>
      <Header />
      <Login />
      <AddTransportSchedule />
      <TransportScheduleTable />
      <Footer />
    </>
  );
};

export default Manager;
