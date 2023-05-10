import {useState} from 'react';
import {signUp} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../Modal';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const getFieldError = (fieldName) => {
  //   if (error) {
  //     if (fieldName in error) {
  //       return error[fieldName][0];
  //     }
  //   }
  //   return null;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked');
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
