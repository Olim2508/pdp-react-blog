import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {createCategory, createPostRequest, getCategoriesRequest} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {postsTypes} from '../../redux/actions/blogActions';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {getFieldError} from '../../utils/utils';
import * as Yup from 'yup';

const BlogForm = ({isUpdate = false, initialValues, onSubmit, categories}) => {
  const isLoading = useSelector((state) => state.postsReducer.isLoading);
  const success = useSelector((state) => state.postsReducer.success);
  const error = useSelector((state) => state.postsReducer.error);


  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
  });

  return (
    <div className="create">
      {/* <h2>{isUpdate ? 'Update Blog' : 'Add a New Blog'}</h2>*/}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <label>Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label>Category</label>
          <Field as="select" name="category">
            <option value="">Select a category</option>
            {categories && (
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={category.id == initialValues.category}
                >
                  {category.title}
                </option>
              ))
            )}
          </Field>
          <ErrorMessage name="category" component="div" className="error" />

          <label>Author</label>
          <Field type="text" name="author" />
          <ErrorMessage name="author" component="div" className="error" />

          <label>Content</label>
          <Field as="textarea" type="text" name="content" />
          <ErrorMessage name="author" component="div" className="error" />

          {getFieldError('non_field_errors', error) && (
            <div className="error">{getFieldError('non_field_errors', error)}</div>
          )}

          {isLoading ? (
            <button type="submit" disabled style={{marginTop: '20px'}}>
              {isUpdate ? 'Updating Blog...' : 'Creating Blog'}
            </button>
          ) : (
            <button type="submit">{isUpdate ? 'Update' : 'Create'}</button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default BlogForm;
