import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateBlog from "./components/CreateBlog/CreateBlog";
import BlogDetail from "./components/BlogDetail/BlogDetail";



function App() {
  return (
    <Router>
        <div className="App">
            <Navbar/>
            <Switch>
                <div className={'content'}>
                    <Route exact path={"/"}>
                        <Home/>
                    </Route>
                    <Route path={"/create"}>
                        <CreateBlog/>
                    </Route>
                    <Route path={"/blogs/:id"}>
                        <BlogDetail/>
                    </Route>
                    {/*<Route path="*">*/}
                    {/*    <NotFound/>*/}
                    {/*</Route>*/}
                </div>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
