import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Router';

function App(): JSX.Element {

  return (
    <RouterProvider router={routes}/>
  );
}

export default App;

