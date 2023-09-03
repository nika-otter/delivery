import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TransportTable from "../../components/Transport";
import AddTransportSchedule from "../../components/TransportSchedule";
import Login from "../../components/Login";

const Admin = () => {
  return (
    <>
      <Header />
      <Login />
      <TransportTable />
      <AddTransportSchedule />
      <Footer />
    </>
  );
};

export default Admin;
