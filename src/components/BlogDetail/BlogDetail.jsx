import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePostRequest, getPostDetailRequest} from "../../api";
import {postsTypes} from "../../redux/actions/types";

const BlogDetail = () => {
    const {id} = useParams()
    // const url = `http://localhost:8001/blogs/${id}`
    // const {data: blog, isLoading, error} = useGetRequest({url})
    const history = useHistory()

    // redux
    const dispatch = useDispatch()
    const post = useSelector((state) => state.postsReducer.post);
    const isLoading = useSelector((state) => state.postsReducer.isLoading);
    const error = useSelector((state) => state.postsReducer.error);
    const success = useSelector((state) => state.postsReducer.success);

    useEffect(() => {
        getPostDetailRequest(dispatch, id)
    }, []);

    const handleDelete = (id) => {
        // const url = `http://localhost:8001/blogs/${id}`
        // const headers = { 'Content-Type': 'application/json' }
        // const options = {
        //   method: "DELETE",
        //   headers: headers,
        // }
        // fetch(url, options)
        // .then(() => {
        //   console.log("blog deleted")
        //     history.push("/")
        // })
        deletePostRequest(dispatch, id)
        if (success) {
            dispatch({type: postsTypes.GET_POSTS_RESET})
        }
        history.push("/")
    }

  return (
    <div className="blog-details">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {post && (
            <article>
              <h2>{ post.title }</h2>
              <p>Written by { post.author }</p>
              <div>{ post.body }</div>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
            </article>
        )}
    </div>
  );
}

export default BlogDetail;