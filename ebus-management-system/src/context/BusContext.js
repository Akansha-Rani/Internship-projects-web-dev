import React, { createContext, useState, useEffect } from "react";

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([
    { id: "BUS 01", lat: 28.61, lng: 77.20, status: "On Time" },
    { id: "BUS 02", lat: 28.615, lng: 77.215, status: "Delayed" },
    { id: "BUS 03", lat: 29.615, lng: 78.215, status: "Maintenance" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev =>
        prev.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <BusContext.Provider value={{ buses, setBuses }}>
      {children}
    </BusContext.Provider>
  );
};
