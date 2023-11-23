import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 0.8s linear infinite;
  margin: 5px 5px;
`;

const Loader = ({isLoading}) => {
  return <>{isLoading && (<StyledLoader />)}</>;
};

export default Loader;
