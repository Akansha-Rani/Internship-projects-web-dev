import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BusContext } from "../context/BusContext";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LiveMap() {
  const { buses } = useContext(BusContext);

  const center = buses.length > 0
    ? [buses[0].lat, buses[0].lng]
    : [28.6139, 77.2090]; 

  return (
    <div>
      <h2 style={{color:'#667eea'}}>Live Bus Location</h2>
      <MapContainer center={center} zoom={14} style={{ height: "450px", width: "100%", borderRadius: "12px", marginBottom: "2rem" }}>
        console.log("Buses:", buses);
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {buses.map(bus => (
          <Marker key={bus.id} position={[bus.lat, bus.lng]}>
            <Popup>
              <b>{bus.id}</b><br />
              Lat: {bus.lat.toFixed(5)}<br />
              Lng: {bus.lng.toFixed(5)}<br />
              Status: {bus.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p>Click bus markers for details.</p>
    </div>
  );
}

export default LiveMap;
