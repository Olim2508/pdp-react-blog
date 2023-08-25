import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesRequest, getPostsRequest, getUserMe} from '../../api';
import BlogList from '../../components/BlogList';
import {Link} from 'react-router-dom';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const isLoading = useSelector((state) => state.categoriesReducer.isLoading);
  const error = useSelector((state) => state.categoriesReducer.error);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    // getCategoriesRequest(dispatch);
  }, []);
  console.log('categories', categories);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserMe());
    }
  }, []);

  return (
    <div className="home">
      {/* {user && isAuthenticated && <h1 className={'user-header'}>Hello {user.email}</h1>}*/}
      <h2>Categories</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {/* {posts && <BlogList blogs={posts} />}*/}
    </div>
  );
};

export default CategoryList;
