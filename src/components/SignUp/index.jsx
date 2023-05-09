import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {createPostRequest} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {postsTypes} from '../../redux/actions/types';

const SignUp = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');

  const isLoading = useSelector((state) => state.postsReducer.isLoading);
  const success = useSelector((state) => state.postsReducer.success);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author};
    console.log(blog);
    createPostRequest(dispatch, blog);
    if (success) {
      dispatch({type: postsTypes.GET_POSTS_RESET});
    }
    history.push('/');
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
        {isLoading ? <button disabled>Adding Blog...</button> : <button>Add Blog</button>}
      </form>
    </div>
  );
};

export default SignUp;
