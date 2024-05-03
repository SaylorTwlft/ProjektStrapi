import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'

import Homepage from './pages/Homepage'
import ProductDetails from './pages/ProductDetails'
import ProductEditor from './pages/ProductEditor'
import SiteHeader from './components/SiteHeader'

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/edit/:id" element={<ProductEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
