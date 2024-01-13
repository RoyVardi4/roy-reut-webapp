import { useUser } from './context/user';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const App = () => {
  const {user} = useUser()

  return (
    <Router>
      <Routes>
        {user ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
