import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BusContext } from "../context/BusContext";

const Tile = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 9px rgba(102,126,234,0.08);
  margin-bottom: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const Badge = styled.span`
  background: ${(props) => props.status === "On Time" ? "#e8f5e9" : "#ffebee"};
  color: ${(props) => props.status === "On Time" ? "#1e8b4d" : "#b71c1c"};
  border-radius: 16px;
  padding: 0.5rem 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  margin-left: 0.8rem;
`;

function Dashboard() {
  const { buses } = useContext(BusContext);

  // --- Search/filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- Filtered buses logic
  const filteredBuses = buses.filter(bus => {
    const matchesSearch =
      bus.id.toLowerCase().includes(search.toLowerCase()) ||
      (bus.status && bus.status.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      statusFilter === "All" || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 style={{color:'#667eea'}}>Bus Dashboard</h2>
      <Tile>
        <div style={{display:'flex', gap:'1.5rem', marginBottom:'1rem', alignItems:'center'}}>
          <input
            type="text"
            placeholder="Search by ID or Status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{padding:"0.5rem",borderRadius:8,border:"1px solid #ccc",flex:"2"}}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{padding:"0.5rem 1rem",borderRadius:8,border:"1px solid #ccc",flex:"1"}}
          >
            <option value="All">All</option>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <h3>Available Buses</h3>
        <ul>
          {filteredBuses.length === 0 ? (
            <li style={{color:'#cc0000'}}>No buses match your criteria.</li>
          ) : (
            filteredBuses.map(bus => (
              <li key={bus.id} style={{marginBottom:20}}>
                <b>{bus.id}</b> - Lat: {bus.lat.toFixed(5)}, Lng: {bus.lng.toFixed(5)}
                <Badge status={bus.status}>{bus.status}</Badge>
              </li>
            ))
          )}
        </ul>
      </Tile>
    </div>
  );
}
export default Dashboard;
