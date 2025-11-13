import React, { useContext } from "react";
import styled from "styled-components";
import { SchedulerContext } from "../context/SchedulerContext";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  min-height: 100vh;
  padding: 2rem;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const LinkButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 0.7rem 1.1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
const CardRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  min-width: 200px;
  box-shadow: 0 2px 8px #d8eccc;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Section = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;


const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px #d8eccc;
  margin-top: 1rem;
  overflow: hidden;
`;

const TH = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.8rem;
`;

const TD = styled.td`
  padding: 0.9rem;
  border-bottom: 1px solid #e5ffe5;
`;

const doctorList = [
  { name: "Dr. Sharma", status: "Online" },
  { name: "Dr. Mehta", status: "Offline" },
  { name: "Dr. Rao", status: "Online" },
  { name: "Dr. Gupta", status: "Online" },
];

const patientList = [
  { name: "John Doe" },
  { name: "Priya Singh" },
  { name: "Rahul Verma" },
  { name: "Aisha Khan" },
];

export default function Dashboard() {
  const { operations } = useContext(SchedulerContext);
  const navigate = useNavigate();

  function handleQuickNav(to) {
    navigate(to);
  }
  return (
      <Wrapper>
      <h1 style={{ color: "#298D53", marginBottom: "2rem" }}>Dashboard</h1>

      <CardRow>
        <Card>
          Total Operations<br />
          <span style={{ fontSize: "2rem" }}>{operations.length}</span>
        </Card>
        <Card>
          Doctors<br />
          <span style={{ fontSize: "2rem" }}>{doctorList.length}</span>
        </Card>
        <Card>
          Patients<br />
          <span style={{ fontSize: "2rem" }}>{patientList.length}</span>
        </Card>
      </CardRow>

      <QuickLinks>
        <LinkButton onClick={() => handleQuickNav('/operations')}>Add Operation</LinkButton>
        <LinkButton onClick={() => handleQuickNav('/doctors')}>Add Doctor</LinkButton>
        <LinkButton onClick={() => handleQuickNav('/patients')}>Add Patient</LinkButton>
      </QuickLinks>

      <Section>
        <h2 style={{ color: "#298D53" }}>Recent Scheduled Operations</h2>
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
            {operations.slice(-5).reverse().map((op, idx) => (
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
          <div style={{ marginTop: "1rem", color: "#298D53" }}>
            No operations scheduled yet.
          </div>
        )}
      </Section>

      <Section>
        <h2 style={{ color: "#298D53" }}>Doctor Availability</h2>
        <Table>
          <thead>
            <tr>
              <TH>Doctor</TH>
              <TH>Status</TH>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((doc, idx) => (
              <tr key={idx}>
                <TD>{doc.name}</TD>
                <TD style={{ color: doc.status === "Online" ? "#52D682" : "grey", fontWeight: "bold" }}>
                  {doc.status}
                </TD>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <h2 style={{ color: "#298D53" }}>Operations Stats (This Month)</h2>
        <Card style={{ display: "inline-block" }}>
          <span style={{ fontSize: "2rem" }}>{operations.length}</span><br />
          Operations scheduled
        </Card>
      </Section>
    </Wrapper>
      
  );
}

