import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Posts, {loader as postsLoader} from './routes/Posts.jsx'
import './index.css'
import RootLayout from "./routes/RootLayout";
import PostNew, {action as newPostAction} from "./routes/PostNew/PostNew";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        // Loaders lesson: https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161626#overview
        // If in this loader function we return promise, react router will wait for it to be resolved until it renders the <Posts /> component
        // We don't have to return a promise here, but if we use await, then we can
        // Important: This component will not be rendered until we get the data, dus we will see an empty screen only if this component has never been rendered before, if we refresh the page on this component

        // Important, any data returned here, will be available in any component that this route uses, and not only in this post component, but in all child components as well.
        // We can use it via import {useLoaderData} from 'react-router-dom'; See src/components/PostList/PostList.jsx

        // react-router-dom is also offering a way to avoid having blank page until the data loads, but this is beyond the scope of this course
        loader: postsLoader,
        children: [
          {
            path: '/create-post',
            element: <PostNew />,
            // We can use react-router-dom action, which accepts a function, which is triggered when the form is submitted in this route
            // Important: This action will run when the form is submitted in the
            action: newPostAction
          }
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
