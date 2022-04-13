import './App.css';
import FiberDemo from './FiberDemo';
import { useEffect, useState } from 'react';

var start = new Date().getTime();

function App() {
  const [elapsed, setElapsed] = useState();

  useEffect(() => {
    function update() {
      setElapsed(new Date().getTime() - start)
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [])

  return (
    <div className="App">
      <FiberDemo elapsed={elapsed} />
    </div>
  );
}

export default App;
