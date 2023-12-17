import Home from '../view/pages/home';
import Detail from '../view/pages/detail';
import Partner from '../view/pages/partner';
import Login from '../view/pages/login';
import Register from '../view/pages/register';
import Sewa from '../view/pages/rentalList';
import Checkout from '../view/pages/checkout';
import About from '../view/pages/about';
import Checking from '../view/pages/checking';
import TaC from '../view/pages/tac';
import addVehicle from '../view/pages/AddRentalVehicle';
import ForgotPassword from '../view/pages/forgot-password';
import userProfile from '../view/pages/userProfile-page';
import userHistoryPage from '../view/pages/userHistory';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/partner': Partner,
  '/login': Login,
  '/register': Register,
  '/sewa': Sewa,
  '/checkout/:id': Checkout,
  '/about': About,
  '/checking/:id': Checking,
  '/tac': TaC,
  '/addvehicle': addVehicle,
  '/forgot-password': ForgotPassword,
  '/user': userProfile,
  '/history': userHistoryPage,
};

export default routes;
