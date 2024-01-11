import PostList from "../components/PostList/PostList.jsx";
import {Outlet, redirect} from 'react-router-dom';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  try {
    const response = await fetch(
      'http://localhost:8080/posts', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });

    if (! response.ok) {
      const errorData = await response.json();
      console.error('Response error:', errorData);

      return null;
    }

    const resData = await response.json();

    return resData.posts;

  } catch (error) {
    // Handle the "Failed to fetch" error or any other errors
    console.error('Error fetching data:', error.message);

    return null;
  }
  
}
