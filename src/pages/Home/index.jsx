import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPostsRequest, getUserMe} from '../../api';
import BlogList from '../../components/BlogList';
import {Link} from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.postsReducer.posts);
  const isLoading = useSelector((state) => state.postsReducer.isLoading);
  const error = useSelector((state) => state.postsReducer.error);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const user = useSelector((state) => state.authReducer.user);

  // useEffect(() => {
  //   getPostsRequest(dispatch);
  // }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserMe());
    }
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      {/* <Link to={'/categories'}>Categories</Link>*/}
      {/* {user && isAuthenticated && <h1 className={'user-header'}>Hello {user.email}</h1>}*/}
      {/* <h2>All posts</h2>*/}
      {/* {error && <p>{error}</p>}*/}
      {/* {isLoading && <p>Loading...</p>}*/}
      {/* {posts && <BlogList blogs={posts} />}*/}
    </div>
  );
};

export default Home;
