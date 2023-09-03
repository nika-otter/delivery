import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TransportTable from "../../components/Transport";
import AddTransportSchedule from "../../components/TransportSchedule";

const Admin = () => {
  return (
    <>
      <Header />
      <TransportTable />
      {/* <AddTransportSchedule /> */}
      <Footer />
    </>
  );
};

export default Admin;
