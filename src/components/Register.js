import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import "./signup.css"
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://localhost:8888/signup";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

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

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
            const response = await axios.put(REGISTER_URL,
                JSON.stringify({ first_name: first_name, last_name: last_name, role: role, email: email, pwd: pwd, speciality: "", location: "", gender: ""}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPwd('');
            setMatchPwd('');
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
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/signup">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="signup-container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign Up</h1>
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
                        <select defaultValue="user" id="role" className="signup_select" required onChange={(e)=>{this.setRole({value: e.target.value})}}>
                            <option value="" disabled selected>Choose an option</option>
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

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already Have an Account?
                        <span className="line">
                            <Link to="/Login" className='login_button'> Login</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register