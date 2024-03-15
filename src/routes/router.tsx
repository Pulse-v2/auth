import React from 'react';
import {Route,BrowserRouter as Router, Routes} from 'react-router-dom';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import NewPassword from '../components/NewPassword';


function AppRouter () {
    return (
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
                path='/*'
                element={
                  <>
                    <Routes>
                      <Route path='/forgot' element={<ForgotPassword />} />
                      <Route path='/newpass' element={<NewPassword />} />
                    </Routes>
                  </>
                }
            />
          </Routes>
        </Router>
    )
}

export default AppRouter;
