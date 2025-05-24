import AppRoutes from './routes/layouts/AppRoutes';
import useAutoLogout from './utils/setupAutoLogout';

function App() {
  useAutoLogout();
  return <AppRoutes />;
}
export default App;
