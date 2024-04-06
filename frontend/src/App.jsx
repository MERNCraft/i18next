/**
 * src/App.jsx
 */

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from './contexts'
import {
  Frame,
  Home,
  Away,
  NotFound
} from './pages'


function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Frame />}
          >
            <Route index element={<Home />} />
            <Route path="/away" element={<Away />} />
            <Route
              path="*"
              element={
                <NotFound
                  current={location.href}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
