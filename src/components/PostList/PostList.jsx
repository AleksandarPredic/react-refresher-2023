import Post from "../Post/Post.jsx";
import classes from "./PostList.module.css";
import {useLoaderData} from 'react-router-dom';

function PostList() {
  // With this hook we get the data from the route loader function. See main.js
  const posts = useLoaderData();

  const listItems = posts !== null ? posts.map(
    post => <Post
      // Create a slug from string
      key={post.id}
      id={post.id}
      author={post.author}
      body={post.body}
    />
  ) : [];

  let content = null;
  if (posts === null) {
    content = <h2>Error fetching posts!</h2>;
  }

  if (listItems.length < 1 && posts !== null) {
    content = <h2>No posts</h2>;
  }

  if (listItems.length > 0 && posts !== null) {
    content = listItems;
  }

  return (
    <>
      <ul
        className={classes.posts}
      >
        {content}
      </ul>
    </>
  );
}

export default PostList;