import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

export const App = () => {
  return (
    <Router>
      <Routes>
        {
          localStorage.getItem('accessToken')
            ? <Route path="/*" element={<PrivateRoutes />} />
            : <Route path="/*" element={<PublicRoutes />} />
        }

        <Route path='*' element={<Navigate to='/login' replace />} />

      </Routes>
    </Router>
  )
}

export default App;
