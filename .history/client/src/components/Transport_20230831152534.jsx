import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransports } from "../store/slices/transportSlice";

const TransportTable = () => {
  const dispatch = useDispatch();
  const transports = useSelector((state) => state.transports.transports);
  const loading = useSelector((state) => state.transports.loading);
  const error = useSelector((state) => state.transports.error);

  useEffect(() => {
    dispatch(fetchTransports());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Transport List</h2>
      {/* <table className="min-w-full border rounded-lg overflow-hidden">
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
          {transports.map((transport) => (
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
      </table> */}
    </div>
  );
};

export default TransportTable;
