import {Route, Routes} from 'react-router-dom';

import Home from './Pages/Home';
import Cart from './Pages/Cart';
import FullPizza from './Pages/FullPizza';
import NotFound from './Pages/NotFound';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';


function App() {
    return (
      <Routes>
          <Route path="/" element={<MainLayout/>}>
              <Route path="" element={<Home/>}/>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/pizza/:id" element={<FullPizza/>}/>
              <Route path="/cart" element={<Cart/>}/>
          </Route>
      </Routes>
    );
}

export default App;
