import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {createPostRequest, getPostDetailRequest, updatePostRequest} from '../../api';
import {postsTypes} from '../../redux/actions/types';

const BlogUpdate = () => {
  const {id} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');

  const post = useSelector((state) => state.postsReducer.post);
  const isLoading = useSelector((state) => state.postsReducer.isLoading);
  // const error = useSelector((state) => state.postsReducer.error);
  const success = useSelector((state) => state.postsReducer.success);

  useEffect(() => {
    getPostDetailRequest(dispatch, id);
  }, []);

  useEffect(() => {
    if (success) {
      setTitle(post.title);
      setBody(post.body);
      setAuthor(post.author);
    }
  }, [success]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const blog = {title, body, author};
    updatePostRequest(dispatch, id, blog);
    if (success) {
      dispatch({type: postsTypes.GET_POST_DETAIL_RESET});
    }
    history.push(`/blogs/${id}`);
  };

  return (
    <div className="create">
      <h2>Update blog</h2>
      {isLoading ? <p>Loading...</p> : (
            <form onSubmit={handleUpdate}>
              <label>Blog title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Blog body:</label>
              <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <label>Blog author:</label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>
                <option value="olim">olim</option>
              </select>
              {isLoading ? <button disabled>Updating Blog...</button> : <button>Update</button>}
            </form>
        )}

    </div>
  );
};

export default BlogUpdate;
