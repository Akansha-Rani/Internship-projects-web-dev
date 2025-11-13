import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SchedulerContext } from "../context/SchedulerContext";

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px #d8eccc;
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 5px;
  padding: 0.5rem;
`;

export default function OperationForm() {
  const { addOperation } = useContext(SchedulerContext);
  const [form, setForm] = useState({
    date: "",
    patient: "",
    doctor: "",
    type: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addOperation(form);
    setForm({ date: "", patient: "", doctor: "", type: "" });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="patient"
        placeholder="Patient Name"
        value={form.patient}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="doctor"
        placeholder="Doctor Name"
        value={form.doctor}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="type"
        placeholder="Operation Type"
        value={form.type}
        onChange={handleChange}
        required
      />
      <button style={{
        background: "#298D53",
        color: "#fff",
        padding: "0.75rem 1.25rem",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer"
      }}>Add</button>
    </Form>
  );
}
