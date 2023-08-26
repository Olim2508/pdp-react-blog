import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {createPostRequest} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {postsTypes} from '../../redux/actions/blogActions';

const CategoryCreate = () => {
  const [title, setTitle] = useState('');

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
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {isLoading ? <button disabled>Adding Blog...</button> : <button>Add Blog</button>}
      </form>
    </div>
  );
};

export default CategoryCreate;
