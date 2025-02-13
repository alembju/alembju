import { useRef, useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginAsIRB = () => {
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

   

    ////////////////////////////////////////////////////////////////////////////login from stiudent///////////////
    
   
    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3000/register')
        .then((res) => {
            console.log(res.data)
        })
    }
    /////////////////////////////popup///////////
    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }


    const handleLogin =  async (event) => {
        event.preventDefault();
        try {
            const response = await axios
            .post('http://localhost:3000/LoginIRB', { username, password })
            const token = response.data.token
            
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/IRBAcces')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <div className='page2'>
        <section className='section'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin} className='formw html'>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button className='buttona'>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/SighenupAsIRB" className='buttonr'>Sign Up</Link>
                </span>
            </p>
        </section>
        </div>
    )
}

export default LoginAsIRB