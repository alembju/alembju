import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { Link, useLocation } from 'react-router-dom';

function SighenupAsIRB() {
    // const [users, setUsers] = useState([])
    const [name,setname] = useState([])
    const [Lname,setLname] = useState([])
    const [roles,setroles] =useState([])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3000/GetStudent')
        .then((res) => {
            // console.log(res.data)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3000/SighnupIRB', {name,Lname,email,username,password,roles})
        .then(() => {
            alert('Registration Successful')
            setEmail('')
            setUsername('')
            setPassword('')
            setroles('')
            setLname('')
            setname('')
            fetchUsers();
            navigate('/LoginAsIRB')
        })
        .catch((error) => {
            console.log('Unable to register user')
        })

    }

  return (
    <><div className="page"><div className='cover w-full h-screen flex'>
          <div className='w-[80%] h-[100%] bg-[#1a1a1a] text-muted flex justify-center items-center'>
              <form className='text-center border rounded-lg w-[800px] h-[800px] p-9'
                  onSubmit={handleSubmit}>
                  {/*Username Input */}
                  <label>Name </label>
                  <br />
                  <input className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2'
                      type='text'
                      placeholder=' Enter Name..'
                      value={name}
                      onChange={(e) => setname(e.target.value)} />
                  <br />

                  {/*Username Input */}
                  <label>Last Name</label>
                  <br />
                  <input className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2'
                      type='text'
                      placeholder='Enter Last Name..'
                      value={Lname}
                      onChange={(e) => setLname(e.target.value)} />
                  <br />

                  {/* Email Input */}
                  <label>Email</label>
                  <br />
                  <input className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2'
                      type='text'
                      placeholder='Enter Email..'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  <br />

                  {/*Username Input */}
                  <label>Username</label>
                  <br />
                  <input className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2'
                      type='text'
                      placeholder=' Enter User name..'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
                  <br />

                  {/* Password Input */}
                  <label>Password</label>
                  <br />
                  <input className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2'
                      type='password'
                      placeholder='Enter Password ...'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  <br />

                  <label>Student or IRB </label>
                  <br />

                  <select type="text" className='w-[400px] h-[40px] rounded-3 bg-zinc-700 p-2' onChange={(e) => setroles(e.target.value)}>
                      <option value="Other">-----Select your Role---</option>
                      <option value="Student">Health Officer</option>
                      <option value="IRB">Subcity Health Officer</option>
                      <option value="Student">City Focal Persone</option>
                      <option value="IRB">IRB</option>
                      <option value="User">User</option>
                      <option value="IRB">Admin</option>

                  </select>
                  <br />
                  <br />
                  {/* Button */}
                  <button className='login-btn w-[200px] h-[50px] border hover:bg-teal-900'
                      type='submit'>Sign Up</button>
              </form>
          </div>
          <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
              <h2 className=' text-3xl text-white'>Sign Up</h2>
              
          </div>
       
      </div>
      </div></>
  )
}
export default SighenupAsIRB