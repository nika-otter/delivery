import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransports } from "../store/slices/transportSlice";

const TransportTable = () => {
  const dispatch = useDispatch();
  const transports = useSelector((state) => state.transports.transports);
  const loading = useSelector((state) => state.transports.loading);
  const error = useSelector((state) => state.transports.error);

  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    dispatch(fetchTransports());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter transports based on selected location and status
  const filteredTransports = transports.filter((transport) => {
    const isLocationMatch =
      selectedLocation === "all" || transport.location_id === selectedLocation;
    const isStatusMatch =
      selectedStatus === "all" || transport.transport_status === selectedStatus;
    console.log(transport.location_id, selectedLocation);
    console.log(isLocationMatch && isStatusMatch);
    return isLocationMatch && isStatusMatch;
  });

  const locationOptions = [
    ...new Set(transports.map((transport) => transport.location_id)),
  ];
  const statusOptions = [
    ...new Set(transports.map((transport) => transport.transport_status)),
  ];

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Transport List</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Location:
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">Show All</option>
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Status:
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">Show All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-gray-600 text-left">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Driver ID</th>
            <th className="py-2 px-3">Location ID</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Shipped Date</th>
            <th className="py-2 px-3">Delivered Date</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredTransports.map((transport) => (
            <tr key={transport.id} className="text-gray-600">
              <td className="py-3 px-4">{transport.id}</td>
              <td className="py-3 px-4">{transport.driver_id}</td>
              <td className="py-3 px-4">{transport.location_id}</td>
              <td className="py-3 px-4">{transport.transport_status}</td>
              <td className="py-3 px-4">{transport.shipped_date}</td>
              <td className="py-3 px-4">{transport.delivered_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTable;
