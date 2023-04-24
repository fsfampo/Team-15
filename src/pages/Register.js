import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import "../styles/signup.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import img1 from '../assets/signup/bags.jpg'
import img2 from '../assets/signup/band.jpg';
import img3 from '../assets/signup/box.jpg';
import img4 from '../assets/signup/dumbbell.jpg';
import img5 from '../assets/signup/equip.jpg';
import img6 from '../assets/signup/pose.jpg';
import img7 from '../assets/signup/squat.jpg';
import img8 from '../assets/signup/stretch.jpg';
import img9 from '../assets/signup/weight.jpg';
import img10 from '../assets/signup/weights.jpg';
import img11 from '../assets/signup/yoga.jpg';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://gojim-backend.eastasia.cloudapp.azure.com/signup";
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const nav = useNavigate();

    const [first_name, setFName] = useState('');
    const [fNameFocus, setFNameFocus] = useState(false);

    const [last_name, setLName] = useState('');
    const [lNameFocus, setLNameFocus] = useState(false);

    const [role, setRole] = useState('');

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [qrImg, setqrImg] = useState('');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [currentImage, setCurrentImage] = useState(images[0]);

    const [gender, setGender] = useState('');

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
    }, [])

    useEffect(() => {
        setFName(first_name);
    }, [first_name])

    useEffect(() => {
        setLName(last_name);
    }, [last_name])

    useEffect(() => {
        setqrImg(qrImg);
    }, [qrImg])

    useEffect(() => {
        setRole(role);
    }, [role])

    useEffect(() => {
        setValidName(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    useEffect(() => {
        setGender(gender);
    }, [gender])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ first_name: first_name, last_name: last_name, role: role, email: email, password: pwd, gender: gender }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log("STRINGIFY: " + JSON.stringify(response)); 
            const qrImage = response.data.qr_image;
            setqrImg(qrImage);
            setSuccess(true);

            setEmail('');
            setPwd('');
            setMatchPwd('');
            //nav("/login");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Already in Use');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className="container">
                    <section className="image-container">
                        <img className="images" src={currentImage} alt="Bags" />
                    </section>
                    <section className="signup-container">
                        <h2>Scan this code for log in!</h2>
                        <img className="qrImg" src={`data:image/png;base64,${qrImg}`} alt="QR code" />
                        <button className="qr-button">Log In</button>
                    </section>
                </section>
            ) : (
                <section className="container">
                    <section className="image-container">
                        <img className="images" src={currentImage} alt="Bags" />
                    </section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <section className="signup-container">
                        <h1 className="head">Sign Up</h1>
                        <form className='signup-form' onSubmit={handleSubmit}>
                            <label htmlFor="first_name"></label>
                            <input
                                type="text"
                                id="first_name"
                                className="signup_input"
                                placeholder="First Name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setFName(e.target.value)}
                                value={first_name}
                                required
                                onFocus={() => setFNameFocus(true)}
                                onBlur={() => setFNameFocus(false)}
                            />

                            <label htmlFor="last_name"></label>
                            <input
                                type="text"
                                id="last_name"
                                className="signup_input"
                                placeholder="Last Name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setLName(e.target.value)}
                                value={last_name}
                                required
                                onFocus={() => setLNameFocus(true)}
                                onBlur={() => setLNameFocus(false)}
                            />

                            <label htmlFor="role"></label>
                            <select id="role" className="signup_select" required value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="" disabled selected >Role:</option>
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>


                            <label htmlFor="email">
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>

                                <span className={validName || !email ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="signup_input"
                                placeholder="Email Addresss"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="uidnote" className={emailFocus && email && !validName && email.length > 0 ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must be a valid email address.
                            </p>


                            <label htmlFor="password">
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="signup_input"
                                placeholder="Password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label htmlFor="confirm_pwd">
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                className="signup_input"
                                placeholder="Confirm Password"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <div className="signup_input">
                                <div className="radio-buttons">
                                    <label htmlFor="gender" className="input-label">Gender:</label>
                                    <div className="radio-button-container">
                                        <input className="radio-button" type="radio" id="male" name="gender" value="male" onClick={(e) => setGender(e.target.value)} defaultChecked={true} />
                                        <label htmlFor="male" className="input-label">Male</label>
                                    </div>
                                    <div className="radio-button-container">
                                        <input className="radio-button" type="radio" id="female" name="gender" value="female" onClick={(e) => setGender(e.target.value)} />
                                        <label htmlFor="female" className="input-label">Female</label>
                                    </div>
                                </div>
                            </div>

                            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            Already Have an Account?
                            <span className="line">
                                <Link to="/Login" className='login_button'> Login</Link>
                            </span>
                        </p>
                    </section>
                </section>
            )}
        </>
    )
}

export default Register