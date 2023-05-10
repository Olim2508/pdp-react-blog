import {Link} from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className={'navbar'}>
      <h1>My Blog</h1>
      <div className={'links'}>
        <Link to={'/'}>Home</Link>
        <Link to={'/create'}>Create blog</Link>
        <Link to={'/sign-up'}>Sign up</Link>
        <Link to={'/log-in'}>Log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
