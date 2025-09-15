import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarsList from './CarsList';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import RemoveCar from './RemoveCar';
import HandlingList from './HandlingList';
import AddHandling from './AddHandling';
import UpdateHandling from './UpdateHandling';
import RemoveHandling from './RemoveHandling';
import NotificationList from './NotificationList'
import CreateNotification from './CreateNotification';
import ActivateNotification from './ActivateNotification';
import DeactivateNotification from './DeactivateNotification';
import UpdateNotification from './UpdateNotification';
import RemoveNotification from './RemoveNotification';
import Home from './Home';
import Layout from './Layout';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/update/:id" element={<UpdateCar />} />
          <Route path="/cars/remove/:id" element={<RemoveCar />} />
          
          <Route path="/handlings/:carId" element={<HandlingList />} />
          <Route path="/handlings/add" element={<AddHandling />} />
          <Route path="/handlings/update/:handlingId" element={<UpdateHandling />} />
          <Route path="/handlings/remove/:id" element={<RemoveHandling />} />
          
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/notifications/create" element={<CreateNotification />} />
          <Route path="/notifications/activate/:id" element={<ActivateNotification />} />
          <Route path="/notifications/deactivate/:id" element={<DeactivateNotification />} />
          <Route path="/notifications/update/:id" element={<UpdateNotification />} />
          <Route path="/notifications/remove/:id" element={<RemoveNotification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
