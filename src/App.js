import './App.css';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/Sidebar/SideBar';
import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <SideBar/>
      <Button variant={'link-button'}>Click Me</Button>
    </div>
  );
}

export default App;
