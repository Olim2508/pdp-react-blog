import {useEffect, useState} from 'react';
import {getPostDetailRequest, signUp} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../../components/Modal';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';

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

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  useEffect(() => {
    if (success) {
      dispatch({type: authTypes.SIGN_UP_RESET});
      history.push('/log-in');
    }
  }, [success]);

  const onSubmit = (values) => {
    const full_name = `${values.first_name} ${values.last_name}`;
    const user = {full_name, email: values.email, password: values.password};
    dispatch(signUp(user));
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <label>First name</label>
          <Field type="text" name="first_name" />
          <ErrorMessage name="first_name" component="div" className="error" />

          <label>Last name</label>
          <Field type="text" name="last_name" />
          <ErrorMessage name="last_name" component="div" className="error" />

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
              Signing up...
            </button>
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
