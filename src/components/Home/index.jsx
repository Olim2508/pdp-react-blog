import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostsRequest} from "../../api";
import BlogList from "../BlogList";

const Home = () => {
  // const url = "http://localhost:8001/blogs"
  // const {data, isLoading, error} = useGetRequest({url})

  // with redux
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsReducer.posts);
  const isLoading = useSelector((state) => state.postsReducer.isLoading);
  const error = useSelector((state) => state.postsReducer.error);

  useEffect(() => {
    getPostsRequest(dispatch)
  }, []);

  return (
    <div className="home">
        <h2>All posts</h2>
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {posts && <BlogList blogs={posts} />}
    </div>
  );
}
 
export default Home;