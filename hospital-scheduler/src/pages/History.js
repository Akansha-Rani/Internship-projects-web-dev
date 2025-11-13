import React, { useContext } from "react";
import styled from "styled-components";
import { SchedulerContext } from "../context/SchedulerContext";

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

export default function History() {
  const { operations } = useContext(SchedulerContext);

  return (
    <Wrapper>
      <h1 style={{ color: "#298D53" }}>Operation History</h1>
      <Table>
        <thead>
          <tr>
            <TH>Date</TH>
            <TH>Patient</TH>
            <TH>Doctor</TH>
            <TH>Type</TH>
          </tr>
        </thead>
        <tbody>
          {operations.map((op, idx) => (
            <tr key={idx}>
              <TD>{op.date}</TD>
              <TD>{op.patient}</TD>
              <TD>{op.doctor}</TD>
              <TD>{op.type}</TD>
            </tr>
          ))}
        </tbody>
      </Table>
      {operations.length === 0 && (
        <div style={{ marginTop: "2rem", color: "#298D53" }}>
          No operations scheduled yet.
        </div>
      )}
    </Wrapper>
  );
}
