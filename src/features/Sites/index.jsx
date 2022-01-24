import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TemplateHome from './pages/TemplateHome/TemplateHome';

function Products(props) {

  return (
    <Fragment>
        <Routes>
            <Route path="*" element={<TemplateHome />} />
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="not-found" element={<NotFound />} />
        </Routes>
    </Fragment>
  );
}

export default Products;