import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css'

function NotFound() {

  return (
    <div className="body">
      <div className="notfound-container">
          <h1>Opps! Không tìm thấy trang này</h1>
          <Link to="/home">
              <i className="fas fa-arrow-left"></i>&nbsp;Quay về trang chủ
          </Link>
      </div>
    </div>
  );
}

export default NotFound;