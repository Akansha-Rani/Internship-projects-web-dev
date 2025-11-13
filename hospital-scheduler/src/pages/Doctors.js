import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  min-height: 100vh;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px #d8eccc;
  margin-top: 2rem;
`;

const TH = styled.th`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
`;

const TD = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5ffe5;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 0.5rem;
  border-radius: 5px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
`;

export default function Doctors() {
  const [doctors, setDoctors] = useState([
  { name: "Dr. Sharma", specialization: "Cardiology", contact: "9876543210" },
  { name: "Dr. Mehta", specialization: "Orthopedics", contact: "9955661133" },
  { name: "Dr. Rao", specialization: "Neurology", contact: "9888777665" },
  { name: "Dr. Gupta", specialization: "General Surgery", contact: "9934556677" }
]);
  const [form, setForm] = useState({ name: "", specialization: "", contact: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (form.name && form.specialization && form.contact) {
      setDoctors(prev => [...prev, form]);
      setForm({ name: "", specialization: "", contact: "" });
    }
  }

  return (
    <Wrapper>
      <h1 style={{ color: "#298D53" }}>Doctors</h1>
      <Form onSubmit={handleAdd}>
        <Input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add Doctor</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <TH>Name</TH>
            <TH>Specialization</TH>
            <TH>Contact</TH>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d, idx) => (
            <tr key={idx}>
              <TD>{d.name}</TD>
              <TD>{d.specialization}</TD>
              <TD>{d.contact}</TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
