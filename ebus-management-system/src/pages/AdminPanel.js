import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BusContext } from "../context/BusContext";

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 9px rgba(102,126,234,0.12);
  padding: 2rem;
`;

const ModalBg = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.19);
  display: flex; align-items:center; justify-content:center;
  z-index:99;
`;
const ModalCard = styled.div`
  background: #fff; padding: 2rem; border-radius: 1rem; min-width: 320px;
`;

function AdminPanel() {
  const { buses, setBuses } = useContext(BusContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", lat: "", lng: "", status: "On Time" });

  function submitBus(e) {
    e.preventDefault();
    setBuses([...buses, { ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) }]);
    setModalOpen(false);
    setForm({ id: "", lat: "", lng: "", status: "On Time" });
  }
  function deleteBus(id) {
    setBuses(buses.filter(bus => bus.id !== id));
  }

  function editBus(bus) {
    setForm(bus);
    setModalOpen(true);
  }

  return (
    <div>
      <h2 style={{color:'#667eea'}}>Admin Panel</h2>
      <Card>
        <button className="btn" style={{marginBottom:18}} onClick={() => setModalOpen(true)}>+ Add New Bus </button>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Status</th>
          </tr>
        </thead>
   <tbody>
   {buses.map((bus, i) => (
    <tr key={i}>
      <td>{bus.id}</td>
      <td>{bus.lat.toFixed(5)}</td>
      <td>{bus.lng.toFixed(5)}</td>
      <td>{bus.status}</td>
      <span>
        <button className="edit" style={{background:'#667eea', color:'white'}} onClick={() => editBus(bus)}>Edit</button>
        <button className="edit" onClick={() => deleteBus(bus.id)}>Delete</button>
      </span>
    </tr>
   ))}</tbody>
   </table>
      </Card>
      {modalOpen && (
        <ModalBg>
          <ModalCard>
            <h3 style={{color:'#764ba2'}}>Add Bus</h3>
            <form onSubmit={submitBus} style={{display:"flex",flexDirection:"column"}}>
              <input required placeholder="Bus ID" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} /><hr></hr>
              <input required placeholder="Latitude" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})} /><hr></hr>
              <input required placeholder="Longitude" value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})} /><hr></hr>
              <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="On Time">On Time</option>
                <option value="Delayed">Delayed</option>
                <option value="Maintenance">Maintenance</option>
              </select><hr></hr>
              <button className="btn" type="submit">Add</button>
              <button className="btn" type="button" style={{background: '#f44336'}} onClick={()=>setModalOpen(false)}>Cancel</button>
            </form>
          </ModalCard>
        </ModalBg>
      )}
    </div>
  );
}


export default AdminPanel;
