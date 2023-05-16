import {useEffect, useState} from 'react';
import {logIn} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {authTypes} from '../../redux/actions/authActions';
import {useHistory} from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const success = useSelector((state) => state.authReducer.success);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({type: authTypes.LOGIN_RESET});
      history.push('/');
    }
  }, [success]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {email, password};
    dispatch(logIn(data));
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {getFieldError('email') && (*/}
        {/*  <div className="error">{getFieldError('email')}</div>*/}
        {/* )}*/}
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {getFieldError('password1') && (*/}
        {/*  <div className="error">{getFieldError('password1')}</div>*/}
        {/* )}*/}
        {/* {isLoading ? <button disabled>Signing up...</button> : <button>Sign Up</button>}*/}
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
