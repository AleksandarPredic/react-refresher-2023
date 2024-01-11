import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../../components/Modal/Modal.jsx';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (! post) {
    return (
      <Modal showModal closeUrl={'/'}>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal showModal closeUrl={'/'}>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

// Loader also, as action, receives and object, which has a {request} object in it, but more importantly, has a {params} object
// Using this params object, we can access the dynamic route key we created. In this case it was an id: params.id. Route definition was path: ':id'
export async function loader({params}) {
  try {
    // TODO: unify all the requests in one class, so we don't have the similar code repeating for each request
    const response = await fetch(
    'http://localhost:8080/posts/' + params.id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

    if (! response.ok) {
      const errorData = await response.json();
      console.error('Response error:', errorData);

      return null;
    }

    const resData = await response.json();

    return resData.post ? resData.post : null;

  } catch (error) {
    // Handle the "Failed to fetch" error or any other errors
    console.error('Error fetching post:', error.message);

    return null;
  }
}