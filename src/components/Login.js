import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import './login.css';

const LOGIN_URL = "http://gojim-backend.eastasia.cloudapp.azure.com/login"; 

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pwd, mfa_code: ""}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response.data));
            const accessToken = response.data.access_token;
            const roles = response.data.roles;
            setAuth({ email, pwd, roles, accessToken });
            console.log(setAuth)
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

    }

    const handlePwdBlur = (e) => {
        e.preventDefault();
    }

    const handlePwdFocus = () => {
        pwdRef.current.type = 'password';
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className="login-container">
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"

                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            onBlur={handlePwdBlur}
                            onFocus={handlePwdFocus}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?
                        <span className="line">
                            <Link to="/signup" className='login_button'> Sign Up</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login