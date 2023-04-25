import {useHistory, useParams} from "react-router-dom";
import useGetRequest from "../../utils/fetch";

const BlogDetail = () => {
    const {id} = useParams()
    const url = `http://localhost:8000/blogs/${id}`
    const {data: blog, isLoading, error} = useGetRequest({url})
    const history = useHistory()

    const handleDelete = (id) => {
        const url = `http://localhost:8000/blogs/${id}`
        const headers = { 'Content-Type': 'application/json' }
        const options = {
          method: "DELETE",
          headers: headers,
        }
        fetch(url, options)
        .then(() => {
          console.log("blog deleted")
            history.push("/")
        })
    }

  return (
    <div className="blog-details">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {blog && (
            <article>
              <h2>{ blog.title }</h2>
              <p>Written by { blog.author }</p>
              <div>{ blog.body }</div>
                <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </article>
        )}
    </div>
  );
}

export default BlogDetail;