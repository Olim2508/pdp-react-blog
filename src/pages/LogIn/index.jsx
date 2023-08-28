import {useEffect, useState} from 'react';
import {createCategory, logIn} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {authTypes} from '../../redux/actions/authActions';
import {useHistory} from 'react-router-dom';
import {getFieldError} from '../../utils/utils';
import {ErrorMessage, Field, Form, Formik} from 'formik';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const success = useSelector((state) => state.authReducer.success);
  const error = useSelector((state) => state.authReducer.error);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (success) {
      dispatch({type: authTypes.LOGIN_RESET});
      history.push('/');
    }
  }, [success]);


  const onSubmit = (values) => {
    const data = {username: values.email, password: values.password};
    dispatch(logIn(data));
    history.push('/');
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>

          <label>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="error" />

          {getFieldError('non_field_errors', error) && (
            <div className="error">{getFieldError('non_field_errors', error)}</div>
          )}

          {isLoading ? (
            <button type="submit" disabled style={{marginTop: '20px'}}>
              Logging in...
            </button>
          ) : (
            <button type="submit">Log in</button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default LogIn;
