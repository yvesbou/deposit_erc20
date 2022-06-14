import React, {useContext} from 'react'
import Wallet from './Wallet';
import Logo from './Logo';


const Navbar = () => {

  return (
    <div className='Navbar'>
        <Logo/>
        <Wallet/>
    </div>
  )
}

export default Navbar;