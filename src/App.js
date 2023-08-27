import Navbar from './components/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './components/BlogDetail';
import React from 'react';
import BlogUpdate from './components/BlogUpdate';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import CategoryList from './pages/CategoryList';
import CategoryCreate from './pages/CategoryCreate';


// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <React.Fragment>
            <div className={'content'}>
              <Route exact path={'/'}>
                <Home/>
                {/* <CategoryList/>*/}
              </Route>
              <Route path={'/create'}>
                <CreateBlog/>
              </Route>
              <Route path={'/blogs/:id'}>
                <BlogDetail/>
              </Route>
              <Route path={'/update/:id'}>
                <BlogUpdate/>
              </Route>
              <Route path={'/sign-up/'}>
                <SignUp/>
              </Route>
              <Route path={'/log-in/'}>
                <LogIn/>
              </Route>
              <Route path={'/categories/'}>
                <CategoryList/>
              </Route>
              <Route path={'/category/create'}>
                <CategoryCreate/>
              </Route>
              {/* <Route path="*">*/}
              {/*    <Index/>*/}
              {/* </Route>*/}
            </div>
          </React.Fragment>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
