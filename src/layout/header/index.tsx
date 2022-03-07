import React from 'react';
import logo from '../../assets/logo.svg';
import './index.scss';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="website-title">Color Avatar</div>
      <a href="xxx" className="github-link">Github</a>
    </div>
  );
}

export default Header;
