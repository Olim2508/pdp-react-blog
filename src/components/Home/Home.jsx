import BlogList from "../BlogList/BlogList";
import useGetRequest from "../../utils/fetch";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchData, fetchPosts, getPostsRequest} from "../../api";

const Home = () => {
  const url = "http://localhost:8001/blogs"
  const {data, isLoading, error} = useGetRequest({url})

  // with redux
  const posts = useSelector((state) => {
    return state.postsReducer.posts
  });
  const loading = useSelector((state) => state.postsReducer.isLoading);

  useEffect(() => {
    fetchPosts()
  }, []);

  console.log("posts-----", posts)
  console.log("loading-----", loading)

  return (
    <div className="home">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {data && <BlogList blogs={data} title="All Blogs" />}
    </div>
  );
}
 
export default Home;