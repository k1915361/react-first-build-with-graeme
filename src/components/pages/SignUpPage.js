import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
import { useToken } from '../../auth/useToken'

const SignUpPage = () => {
    const [token, setToken] = useToken()

    const [errorMessage, setErrorMessage] = useState('')
    
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confrirmPasswordValue, setConfirmSetPasswordValue] = useState('');

    const history = useNavigate();

    const onSignUpClicked = async () => {
        // const response = await axios.post('/api/signup', {
        //     email: emailValue,
        //     password: passwordValue
        // })
        // const { token } = response.data;
        // setToken(token)
        // history.push('/')
    }

    return (
        <div className="content-container">
        <h1>Sign Up</h1>
        {errorMessage && <div className='fail'>{errorMessage}</div>}
        <input 
            value={emailValue}
            onChange={e => setEmailValue(e.target.value)}
            placeholder="someone@gmail.com" />
        <input 
            type="password"
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
            placeholder="password" />
        <input 
            type="password"
            value={confrirmPasswordValue}
            onChange={e => setConfirmSetPasswordValue(e.target.value)}
            placeholder="password" />    
        <hr />
        <button 
            disabled={
                !emailValue || !passwordValue ||
                passwordValue !== confrirmPasswordValue
            }
            onClick={onSignUpClicked}>Log In</button>
        <button onClick={() => history.push('/signin')}>Already have an account? Log In</button>
        </div>
    );
}

export default SignUpPage;
