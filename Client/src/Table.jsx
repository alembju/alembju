import React, {useEffect, useState} from 'react'
import { LuArrowBigRight } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import  { useNavigate } from 'react-router-dom';

function Table() {
  const location = useLocation()
  const [state, setLocationState] = useState({FormData})

  //location state
  useEffect (()=>{
    let state = location.state
    setLocationState(state)
  }, [location.state])

  const navigate = useNavigate();
   const handleRowClick = () => {
    navigate('/form');
   }
  return (
    <div className='table-container'>
      <table>
        <thead>
            <tr>
            </tr>
        </thead>
        <tbody>
        {state && (
            <tr onClick={handleRowClick}>
                 <LuArrowBigRight /><tr>{state.email}</tr>
                 <LuArrowBigRight /><tr>{state.firstname}</tr>
                 <LuArrowBigRight /><tr>{state.lastname}</tr>
                 <LuArrowBigRight /><tr>{state.phoneno}</tr>
                 <LuArrowBigRight /><tr>{state.password}</tr>
            </tr>
              )}
            

        </tbody>

      </table>
    </div>
  )
}

export default Table