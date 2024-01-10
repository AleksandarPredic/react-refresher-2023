import Post from "../Post/Post.jsx";
import classes from "./PostList.module.css";
import {useState, useEffect} from "react";

function PostList() {
  const [posts, setPosts] = useState(null);
  const [postLoadingError, setPostLoadingError] = useState(null);

  // https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161598#overview
  // Similar to componentDidMount and componentDidUpdate
  // https://react.dev/reference/react/useEffect#useeffect
  useEffect(() => {
    console.log('useEffect')
    async function fetchPosts() {
      const response = await fetch(
        'http://localhost:8080/posts', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      });

      console.log(response);

      const resData = await response.json();

      setPosts(resData.posts);
    }

    fetchPosts();
  }, []);

  function addNewPostHandler(post) {
    const postStoredResponse = (async () => {
      const response = await fetch(
        'http://localhost:8080/posts', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {'Content-Type': 'application/json'},
        }
      );

      return await response.json();
    })().then((response) => {
        console.log(response)

        // We need to use the function when updating state based on previous state
        // We are accepting the previous state automatically as an argument and then we are adding new post on top of that
        // This will ensure that if we have multiple state updating for the same state element, they run one after another, so we don't override some state out of order
        setPosts((previousPostsInState) => [post, ...previousPostsInState]);
      })
      .catch(error => {
        console.log('Error storing posts', error);

        setPostLoadingError('There was an error loading posts!');
      });
  }

  const listItems = posts !== null ? posts.map(
    post => <Post
      // Create a slug from string
      key={(post.author + post.id).replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}
      author={post.author}
      body={post.body}
    />
  ) : [];

  let content = null;
  if (posts === null) {
    content = <h2>Loading posts...</h2>;
  }

  if (listItems.length < 1 && posts !== null) {
    content = <h2>No posts</h2>;
  }

  if (listItems.length > 0 && posts !== null) {
    content = listItems;
  }

  if (postLoadingError) {
    content = postLoadingError;
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