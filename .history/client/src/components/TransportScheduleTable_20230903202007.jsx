import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportSchedules } from "../store/slices/transportScheduleSlice";
import { fetchLocations } from "../store/slices/locationSlice";
import { fetchDrivers } from "../store/slices/driverSlice";
import { fetchTransports } from "../store/slices/transportSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TransportScheduleTable = () => {
  const dispatch = useDispatch();

  const transportSchedules = useSelector(
    (state) => state.transportSchedules.transportSchedules
  );
  const loading = useSelector((state) => state.transportSchedules.loading);
  const error = useSelector((state) => state.transportSchedules.error);
  const locations = useSelector((state) => state.locations.locations);
  const drivers = useSelector((state) => state.drivers.drivers);
  const transports = useSelector((state) => state.transports.transports);
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = (canvas.height * pdfWidth) / imgWidth;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 300;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("download.pdf");
    });
  };

  const getGate = (gateId) => {
    const gate = locations.find((location) => location.id == gateId);
    return gate ? gate.address : "";
  };
  const getDriverName = (transportId) => {
    const transport = transports.find(
      (transport) => transport.id == transportId
    );
    const driver = drivers.find((driver) => driver.id == transport.driver_id);
    return driver ? `${driver.first_name} ${driver.family_name}` : "";
  };
  const getDriverPhoneNumber = (transportId) => {
    const transport = transports.find(
      (transport) => transport.id == transportId
    );
    const driver = drivers.find((driver) => driver.id == transport.driver_id);
    return driver ? `${driver.phone_number}` : "";
  };

  useEffect(() => {
    dispatch(fetchTransportSchedules());
    dispatch(fetchLocations());
    dispatch(fetchDrivers());
    dispatch(fetchTransports());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div ref={pdfRef} className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Transport Schedules</h2>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-gray-600 text-center">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Gate</th>
            <th className="py-2 px-3">Transport ID</th>
            <th className="py-2 px-3">Delivered hour</th>
            <th className="py-2 px-3">Driver's name</th>
            <th className="py-2 px-3">Driver's phone number</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {transportSchedules.map((schedule) => (
            <tr key={schedule.id} className="text-gray-600">
              <td className="py-3 px-4">{schedule.id}</td>
              <td className="py-3 px-4">{getGate(schedule.gate_id)}</td>
              <td className="py-3 px-4">{schedule.transport_id}</td>
              <td className="py-3 px-4">{schedule.delivered_hour}</td>
              <td className="py-3 px-4">
                {getDriverName(schedule.transport_id)}
              </td>
              <td className="py-3 px-4">
                {getDriverPhoneNumber(schedule.transport_id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default TransportScheduleTable;
