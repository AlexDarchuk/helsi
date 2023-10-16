import { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box } from '@mui/material';

import { ReactComponent as Pulse } from '../assets/heart-pulse-fill.svg';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const HeartIconContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const HeartIcon = styled(Pulse)`
  width: 150px;
  fill: red;
  animation: ${pulse} 1s infinite;
`;

const Loader: FC = () => {
  return (
    <HeartIconContainer>
      <HeartIcon />
    </HeartIconContainer>
  );
};

export default Loader;
