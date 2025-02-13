import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <nav >
        <ul className='flex gap-6 p-3 sidebar-list-item '>
        <NavLink to='/'><li className='link text-3xl'>Home</li></NavLink>
        
            {isUserSignedIn ? (
                <>
                <NavLink to='/SignUp'><li className='link'>Account</li></NavLink>
                <li className='link '><button className='btn btn-sm btn-success me-2' onClick={handleSignOut}>Sign Out</button></li>
                </>
            ) : (
                <>
                <NavLink to='/Login'><li className='link'>Login</li></NavLink>
                <NavLink to='/SignUp'><li className='link'>Signup</li></NavLink>
                </>
            )}
            <>
            <li className=' navside '>
            <NavLink to='/Login'><BsFillBellFill className='icon '/> </NavLink>
            <NavLink to='/Login'><BsFillEnvelopeFill className='icon'/></NavLink>
            <NavLink to='/Login'><BsPersonCircle className='icon'/></NavLink>
            </li>
            </>
        </ul>
    </nav>
  )
}

export default Navbar