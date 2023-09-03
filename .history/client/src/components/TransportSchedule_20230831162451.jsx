import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportSchedules } from "../store/slices/transportScheduleSlice"; // Import your action

const AddTransportSchedule = () => {
  const [selectedTransport, setSelectedTransport] = useState("");
  const [selectedGate, setSelectedGate] = useState("");

  const dispatch = useDispatch();
  //   const drivers = useSelector((state) => state.drivers.drivers);
  //   const locations = useSelector((state) => state.locations.locations);
  const gates = useSelector((state) => state.gates.gates);
  const transports = useSelector((state) => state.transports.transports);

  const handleAddSchedule = () => {
    if (selectedTransport && selectedGate) {
      const newSchedule = {
        transport_id: selectedTransport,
        gate_id: selectedGate,
        // Set other properties as needed, except 'delivered_hour'
      };
      dispatch(fetchTransportSchedules(newSchedule));
      // Reset the select inputs after adding
      setSelectedTransport("");
      setSelectedGate("");
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Add Transport Schedule</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="transport"
            className="block text-sm font-medium text-gray-700"
          >
            Select Transport
          </label>
          <select
            id="transport"
            className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedTransport}
            onChange={(e) => setSelectedTransport(e.target.value)}
          >
            <option value="">Select a Transport</option>
            {transports.map((transport) => (
              <option key={transport.id} value={transport.id}>
                Transport ID: {transport.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="gate"
            className="block text-sm font-medium text-gray-700"
          >
            Select Gate
          </label>
          <select
            id="gate"
            className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedGate}
            onChange={(e) => setSelectedGate(e.target.value)}
          >
            <option value="">Select a Gate</option>
            {gates.map((gate) => (
              <option key={gate.id} value={gate.id}>
                Gate ID: {gate.id}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleAddSchedule}
      >
        Add Schedule
      </button>
    </div>
  );
};

export default AddTransportSchedule;
