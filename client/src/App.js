import React from 'react';
import WeatherApp from './component/WeatherApp';

import styled from 'styled-components';



const Apps = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`
function App() {
  return (
    <Apps>
        <WeatherApp />
    </Apps>
  );
}

export default App;
