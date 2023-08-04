import { createBrowserRouter } from 'react-router-dom';
import paths from './paths';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Todo from '@/pages/Todo';
import Error from '@/pages/Error';

const routes = createBrowserRouter([
  { path: paths.home, element: <Home /> },
  { path: paths.login, element: <Login /> },
  { path: paths.signup, element: <Signup /> },
  { path: paths.todo + '/:id', element: <Todo /> },
  { path: paths.error, element: <Error /> }
]);

export default routes;
