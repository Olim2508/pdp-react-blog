
const BlogForm = ({header, handleSubmit}) => {
  return (
    <div className="create">
      <h2>{header}</h2>
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
        {/* {isLoading ? <button disabled>Adding Blog...</button> : <button>Add Blog</button>}*/}
      </form>
    </div>
  );
};

export default BlogForm;
