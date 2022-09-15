import { ReactElement, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppNavbar, AppRoute} from './components';
import { themeContext } from './utils/Theme';

export default function App(): ReactElement {
  const { style } = useContext(themeContext);
  return (
    <div className="App" style={style}>
      <BrowserRouter >
        <AppNavbar />
        <AppRoute/>
      </BrowserRouter>
    </div>
  );
}