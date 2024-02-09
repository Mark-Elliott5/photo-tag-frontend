import NavBar from './components/NavBar';
import StopwatchContextProvider from './context/StopwatchContext';

function App() {
  return (
    <>
      <StopwatchContextProvider>
        <NavBar />
      </StopwatchContextProvider>
    </>
  );
}

export default App;
