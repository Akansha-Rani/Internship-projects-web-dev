import React, { useContext } from 'react';
import styled from 'styled-components';
import { SchedulerContext } from "../context/SchedulerContext";

const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px #d8eccc;
  overflow: hidden;
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

export default function OperationTable() {
  const { operations } = useContext(SchedulerContext);

  return (
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
  );
}
