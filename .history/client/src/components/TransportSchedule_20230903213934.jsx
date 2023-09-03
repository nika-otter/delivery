import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransportSchedule,
  fetchTransportSchedules,
} from "../store/slices/transportScheduleSlice"; // Import your action
import { fetchTransports } from "../store/slices/transportSlice";
import { fetchGates } from "../store/slices/gateSlice";
import { fetchLocations } from "../store/slices/locationSlice";

const AddTransportSchedule = () => {
  const [selectedGate, setSelectedGate] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");
  const [deliveredHour, setDeliveredHour] = useState("");
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransports());
    dispatch(fetchGates());
    dispatch(fetchLocations());
    dispatch(fetchTransportSchedules());
  }, [dispatch]);

  const gates = useSelector((state) => state.gates.gates);
  const transports = useSelector((state) => state.transports.transports);
  const locations = useSelector((state) => state.locations.locations);
  const transportSchedules = useSelector(
    (state) => state.transportSchedules.transportSchedules
  );
  const handleAddSchedule = () => {
    if (selectedGate || selectedTransport || deliveredHour) {
      console.log("Add schedule");
      const newScheduleData = {
        gate_id: selectedGate,
        transport_id: selectedTransport,
        delivered_hour: deliveredHour,
      };

      dispatch(addTransportSchedule(newScheduleData));

      // Reset the form after adding
      setSelectedGate("");
      setSelectedTransport("");
      setDeliveredHour("");
    }
  };

  // Function to check if a transport has been selected
  const isTransportSelected = () => {
    return selectedTransport !== "";
  };

  const filteredTransports = transports.filter(
    (transport) =>
      !transportSchedules.some(
        (schedule) => schedule.transport_id === transport.id
      )
  );
  return (
    <>
      {user ? (
        <div className="py-4">
          <h2 className="text-2xl font-semibold mb-4">
            Add Transport Schedule
          </h2>
          <div className="grid grid-cols-1 gap-4">
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
                {filteredTransports.map((transport) => (
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
                disabled={!isTransportSelected()} // Disable the input if no transport is selected
              >
                <option value="">Select a Gate</option>
                {/* {console.log("selectedTransport", selectedTransport)}
            {console.log("gates", gates[0].location_id)} */}
                {console.log("locations", locations)}
                {gates
                  .filter(
                    (gate) => gate.location_id == selectedTransport.location_id
                  )
                  .map((gate) => (
                    <option key={gate.id} value={gate.id}>
                      {/* Gate ID: {gate.id} Location: {gate.location_id} Gate:{" "} */}
                      {gate.gate}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="deliveredHour"
                className="block text-sm font-medium text-gray-700"
              >
                Delivered Hour
              </label>
              <input
                type="text"
                id="deliveredHour"
                className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={deliveredHour}
                onChange={(e) => setDeliveredHour(e.target.value)}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={handleAddSchedule}
          >
            Add Schedule
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddTransportSchedule;
