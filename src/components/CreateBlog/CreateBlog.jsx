import { useState } from "react";
import {useHistory} from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {title, body, author}
    console.log(blog)
    const headers = { 'Content-Type': 'application/json' }
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(blog)
    }
    setIsLoading(true)
    fetch("http://localhost:8000/blogs", options)
        .then(() => {
          console.log("new blog added")
          setIsLoading(false)
          history.push("/")
        })
  }

  return (
          <div className="create">
      <h2>Add a New Blog</h2>
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
        ></textarea>
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
}

export default CreateBlog;