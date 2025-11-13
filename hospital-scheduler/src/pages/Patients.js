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

export default function Patients() {
  const [patients, setPatients] = useState([
  { name: "John Doe", age: 37, contact: "9991122334" },
  { name: "Priya Singh", age: 29, contact: "9884455522" },
  { name: "Rahul Verma", age: 45, contact: "9958811223" },
  { name: "Aisha Khan", age: 34, contact: "9822233445" }
]);
  const [form, setForm] = useState({ name: "", age: "", contact: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (form.name && form.age && form.contact) {
      setPatients(prev => [...prev, form]);
      setForm({ name: "", age: "", contact: "" });
    }
  }

  return (
    <Wrapper>
      <h1 style={{ color: "#298D53" }}>Patients</h1>
      <Form onSubmit={handleAdd}>
        <Input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
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
        <Button type="submit">Add Patient</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <TH>Name</TH>
            <TH>Age</TH>
            <TH>Contact</TH>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr key={idx}>
              <TD>{p.name}</TD>
              <TD>{p.age}</TD>
              <TD>{p.contact}</TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
