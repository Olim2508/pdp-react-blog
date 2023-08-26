import {useEffect, useState} from 'react';
import {getPostDetailRequest, signUp} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../../components/Modal';
import {useHistory} from 'react-router-dom';
import {authTypes} from '../../redux/actions/authActions';
import {getFieldError} from '../../utils/utils';

const SignUp = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const success = useSelector((state) => state.authReducer.success);
  const error = useSelector((state) => state.authReducer.error);


  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    if (success) {
      dispatch({type: authTypes.SIGN_UP_RESET});
      history.push('/log-in');
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const full_name = `${first_name} ${last_name}`;
    const user = {full_name, email, password};
    dispatch(signUp(user));
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {getFieldError('first_name', error) && (
          <div className="error">{getFieldError('first_name', error)}</div>
        )}
        <label>Last name</label>
        <input
          type="text"
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        {getFieldError('last_name', error) && (
          <div className="error">{getFieldError('last_name', error)}</div>
        )}
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {getFieldError('email', error) && (
          <div className="error">{getFieldError('email', error)}</div>
        )}
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {getFieldError('password', error) && (
          <div className="error">{getFieldError('password', error)}</div>
        )}
        {getFieldError('non_field_errors', error) && (
          <div className="error">{getFieldError('non_field_errors', error)}</div>
        )}
        {isLoading ? <button disabled style={{marginTop: '20px'}}>Signing up...</button> : <button>Sign Up</button>}
      </form>
    </div>
  );
};

export default SignUp;
