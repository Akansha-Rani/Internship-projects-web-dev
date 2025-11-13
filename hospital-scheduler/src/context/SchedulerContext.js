import React, { createContext, useState } from "react";

export const SchedulerContext = createContext();

export function SchedulerProvider({ children }) {
  // Sample operations (for Operations & History tables)
  const [operations, setOperations] = useState([
    { date: "2025-10-28", patient: "John Doe", doctor: "Dr. Sharma", type: "Bypass Surgery" },
    { date: "2025-10-29", patient: "Priya Singh", doctor: "Dr. Mehta", type: "Knee Replacement" },
    { date: "2025-10-30", patient: "Rahul Verma", doctor: "Dr. Rao", type: "Brain MRI" }
  ]);

  function addOperation(op) {
    setOperations(prev => [...prev, op]);
  }

  return (
    <SchedulerContext.Provider value={{ operations, addOperation }}>
      {children}
    </SchedulerContext.Provider>
  );
}
