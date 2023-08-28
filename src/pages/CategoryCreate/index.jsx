import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {createCategory} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {getFieldError} from '../../utils/utils';
import * as Yup from 'yup';

const CategoryCreate = () => {
  const categoryState = useSelector((state) => state.categoriesReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  const onSubmit = (values) => {
    dispatch(createCategory(values));
    history.push('/categories/');
  };

  return (
    <div className="create">
      <h2>Create New Category</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>

          <label>Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className="error" />

          {getFieldError('non_field_errors', categoryState.error) && (
            <div className="error">{getFieldError('non_field_errors', categoryState.error)}</div>
          )}

          {categoryState.isLoading ? (
            <button type="submit" disabled style={{marginTop: '20px'}}>
              Creating category...
            </button>
          ) : (
            <button type="submit">Create Category</button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CategoryCreate;
