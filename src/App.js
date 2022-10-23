import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { MovieDetail } from "./pages/Movies";
import RootTemplate from "./pages/RootTemplate";

function App() {
  return (
    <Router>
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<RootTemplate />}>
          <Route index element={<Dashboard />} />
          <Route path='/movies/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
