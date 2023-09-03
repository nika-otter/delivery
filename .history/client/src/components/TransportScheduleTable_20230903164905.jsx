import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportSchedules } from "../store/slices/transportScheduleSlice";

const TransportScheduleTable = () => {
  const dispatch = useDispatch();

  const transportSchedules = useSelector(
    (state) => state.transportSchedules.transportSchedules
  );
  const loading = useSelector((state) => state.transportSchedules.loading);
  const error = useSelector((state) => state.transportSchedules.error);
  const locations = useSelector((state) => state.locations.locations);
  const drivers = useSelector((state) => state.drivers.drivers);

  useEffect(() => {
    dispatch(fetchTransportSchedules());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Transport Schedules</h2>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-gray-600 text-center">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3">Gate ID</th>
            <th className="py-2 px-3">Transport ID</th>
            <th className="py-2 px-3">Delivered Hour</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {transportSchedules.map((schedule) => (
            <tr key={schedule.id} className="text-gray-600">
              <td className="py-3 px-4">{schedule.id}</td>
              <td className="py-3 px-4">{schedule.gate_id}</td>
              <td className="py-3 px-4">{schedule.transport_id}</td>
              <td className="py-3 px-4">{schedule.delivered_hour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportScheduleTable;
