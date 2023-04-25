import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import img1 from '../assets/login/box.jpg';
import img2 from '../assets/login/garage.jpg';
import img3 from '../assets/login/gym.jpg';
import img4 from '../assets/login/kick.jpg';
import img5 from '../assets/login/mat.jpg';
import img6 from '../assets/login/plates.jpg';
import img7 from '../assets/login/rope.jpg';
import img8 from '../assets/login/stretch.jpg';
import img9 from '../assets/login/wall.jpg';
import img10 from '../assets/login/weights.jpg';
import img11 from '../assets/login/yoga.jpg';
import { GoogleLogin } from 'react-google-login';


const LOGIN_URL = "http://gojim-backend.eastasia.cloudapp.azure.com/login";
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [success, setSuccess] = useState(false);

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            // update current image index
            const currentIndex = images.indexOf(currentImage);
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentImage(images[nextIndex]);
        }, 6000); // change image every minute

        return () => clearInterval(interval);
    }, [currentImage]);

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
                JSON.stringify({ email: email, password: pwd, mfa_code: mfaCode }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response.data.access_token;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('email', email)
            const roles = response.data.roles;
            setAuth({ email, pwd, roles, accessToken });
            console.log(localStorage);
            setEmail('');
            setPwd('');
            setMfaCode('');
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
    const onSuccess = (response) => {
        console.log(response);
        console.log(response.profileObj.email);
        localStorage.setItem('email', response.profileObj.email)
        nav("/")
        console.log("after redirect")
      };
      
      const onFailure = (error) => {

        console.error(error);
      };
      


    return (
        <>
            {success ? (
                nav("/")
            ) : (
                <section className="container">
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                    <section className="login-container">
                        <h1 className="head">Welcome Back!</h1>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                onBlur={handlePwdBlur}
                                onFocus={handlePwdFocus}
                                required
                            />
                            <input
                                type="text"
                                id="mfaCode"
                                placeholder="QR Code"
                                onChange={(e) => setMfaCode(e.target.value)}
                                value={mfaCode}
                                required
                            />
                            <button>Sign In</button>
                            <GoogleLogin
                                clientId="426633533706-bdr6hmh12goi97n5a6r66fkso4ov5vqd.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                // cookiePolicy={'single_host_origin'}
                                prompt="select_account"
                            />
                        </form>
                        <p>
                            Need an Account?
                            <span className="line">
                                <Link to="/signup" className='login_button'> Sign Up</Link>
                            </span>
                        </p>
                        <p>
                            <Link to="/forgotPassword"> Forgot Password?</Link>
                        </p>
                    </section>
                    <section className="image-container">
                        <img className="images" src={currentImage} alt="Bags" />
                    </section>
                </section>
            )}
        </>
    )
}

export default Login