import React from 'react';
import OperationForm from '../components/OperationForm';
import OperationTable from '../components/OperationTable';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  min-height: 100vh;
  padding: 2rem;
`;

export default function Operations() {
  return (
    <Wrapper>
      <h1 style={{ color: "#298D53" }}>Schedule Operation</h1>
      <OperationForm />
      <OperationTable />
    </Wrapper>
  );
}
