import React from 'react';
import logo from '../src/Assets/logo.png';

function Header() {
  return (
    <div className="flex relative gap-2 self-start text-base text-black-00 whitespace-nowrap pt-10 pl-10">
      <img
        loading="lazy"
        src={logo}  
        alt="logo"
        className="shrink-0 aspect-square w-36 h-12"
      />
    </div>
  );
}

export default Header;
