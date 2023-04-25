import BlogList from "../BlogList/BlogList";
import useGetRequest from "../../utils/fetch";

const Home = () => {
  const url = "http://localhost:8000/blogs"
  const {data, isLoading, error} = useGetRequest({url})

  return (
    <div className="home">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {data && <BlogList blogs={data} title="All Blogs" />}
    </div>
  );
}
 
export default Home;