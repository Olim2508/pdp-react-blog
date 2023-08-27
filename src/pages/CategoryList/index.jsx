import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesRequest, getUserMe} from '../../api';
import {Link} from 'react-router-dom';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const isLoading = useSelector((state) => state.categoriesReducer.isLoading);
  const error = useSelector((state) => state.categoriesReducer.error);
  // const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  // const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, []);
  console.log('categories', categories);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(getUserMe());
  //   }
  // }, []);

  return (
    <div className="home">
      {/* {user && isAuthenticated && <h1 className={'user-header'}>Hello {user.email}</h1>}*/}
      <h2>Categories</h2>
      <Link to={'/category/create/'}>Create new category</Link>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {categories && (
        <div className="blog-list">
          {categories.map((blog) => (
            <div className="blog-preview" key={blog.id} >
              {/* <Link to={`/blogs/${blog.id}`}>*/}
              <h2>{ blog.title }</h2>
              {/* </Link>*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
