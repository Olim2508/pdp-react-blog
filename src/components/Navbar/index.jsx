import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../api';


const Navbar = () => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    console.log('logged out');
    dispatch(logOut());
  };

  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  return (
    <nav className={'navbar'}>
      <h1>My Blog</h1>
      <div className={'links'}>
        <Link to={'/'}>Home</Link>
        {isAuthenticated ? (
                <>
                  <Link to={'/create'}>Create blog</Link>
                  <a onClick={logOutHandler}>Log out</a>
                </>
              ) : (
                <>
                  <Link to={'/sign-up'}>Sign up</Link>
                  <Link to={'/log-in'}>Log in</Link></>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
