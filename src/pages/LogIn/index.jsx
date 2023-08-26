import {useEffect, useState} from 'react';
import {logIn} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {authTypes} from '../../redux/actions/authActions';
import {useHistory} from 'react-router-dom';
import {getFieldError} from '../../utils/utils';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const success = useSelector((state) => state.authReducer.success);
  const error = useSelector((state) => state.authReducer.error);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

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
    const data = {username: email, password};
    console.log('data', data);
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
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {getFieldError('email', error) && (
          <div className="error">{getFieldError('email', error)}</div>
        )}
        {isLoading ? <button disabled>Logging in...</button> : <button>Log In</button>}
      </form>
    </div>
  );
};

export default LogIn;
