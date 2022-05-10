import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import draw1 from './draw1';

const Paper_App = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    draw1();
  }, []);
  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" />
}

export default Paper_App;