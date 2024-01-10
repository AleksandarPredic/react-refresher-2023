import PostList from "../components/PostList/PostList.jsx";
import {Outlet} from 'react-router-dom';

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
  const response = await fetch(
    'http://localhost:8080/posts', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });

  const resData = await response.json();

  return resData.posts;
}
