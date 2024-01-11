# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Two branches in this project
* `master` branch - is used until we started applying `react-router-dom` loader()s and action()s and dynamic routes.
* `data_fetching_and_sbmitting_with_loaders_and_actions_also_dymanic_routing branch` - is used at the end of tutorial to apply different approact to avoid useState and use what `react-router-dom` can offer


## Legacy tutorial reminders
This is what I initially used until the course was updated.

React refresher tutorial - legacy
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/25146540#overview`

Create a new project
https://create-react-app.dev/
`npx create-react-app my-app`

All the project is built using React + Vite and the Tutorial reminders from below are valid for this project.


## Tutorial lessons and git
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161514#overview`

GitHub for refresher
`https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary-updated`

Dummy backend for this project
`https://github.com/AleksandarPredic/react-refresher-dummy-backend-2023`


## Used icons in the project
React icons package
`https://react-icons.github.io/react-icons/`
`https://www.npmjs.com/package/react-icons`


## Usage reminders summary


### Create a new project using vite
`https://vitejs.dev/guide/`
```shell
npm create vite@latest
cd my-project

npm install
npm run dev
```


### Wrapping element empty
`<><Post /></>`


### Css modules - we must add .module to the name
Post.jsx
Post.module.css

Then import it in the component to use


### Use state lesson
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161552#overview`

```javascript
const [body, setBody] = useState('');
setBody(newBody);
```

**Important**: We can have multiple `useState` usages in the same components independently.


### Updating state based on previous state - IMPORTANT
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161580#overview`

```javascript
function addNewPostHandler(post) {
// We need to use the function when updating state based on previous state
// We are accepting the previous state automatically as an argument and then we are adding new post on top of that
// This will ensure that if we have multiple state updating for the same state element, they run one after another, so we don't override some state out of order
  setPosts((previousPostsInState) => [post, ...previousPostsInState]);
}
```


### useEffect hook
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161598#overview`

This hook accepts a function, which must return nothing or a cleanup function.
And an array as a second argument. The array controls when the useEffect hook gets executed. Here we can pass any
function or variable which is a dependency in our React app, even via props through another component.
Then, when this dependency value changes, this hook will fire again.

```javascript
useEffect(() => {}, []);
```


### Naming conventions

* Components function name, and folder and file names, must start with capital letter
* Props must start with on (onShowModal) so we know they are passing a function
* Handler function names must end with Handler so we know it is doing some event
* loader()s are named loader, in the route component (react-router-dom)
* Action()s are named action in the route component (react-router-dom)


### Outputting conditional components

```javascript
showModal && (<Modal />)
```


### React router
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161612#overview`
See file: `/Users/aleksandarpredic/otherProjects/nextjs-react-tutorial/react-refresher/src/main.jsx`

`https://reactrouter.com/en/main`
`https://github.com/remix-run/react-router/tree/dev/examples`

```shell
npm install react-router-dom
```


### Layout routes
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161616#overview`
See file: `/Users/aleksandarpredic/otherProjects/nextjs-react-tutorial/react-refresher/src/routes/RootLayout.jsx`

We use `<Outlet />` to render the children of the nested routes

```javascript
import {Outlet} from 'react-router-dom';
```


### Linking in React without making a new browser request

To avoid browser making new requests on each link click we need to use the Link component

```javascript
import {Link} from 'react-router-dom';

<Link to={'/create-post'} className={classes.button}>New Post</Link>
```


### Navigate programmatically without making a new browser request
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161624#overview`

For this we use useNavigate hook from `react-router-dom`

```javascript
import {useNavigate} from 'react-router-dom';

// We get a function as a constant
const navigate = useNavigate();

function closeHandler() {
  navigate(‘/’);
}

// We can also use relative paths to navigate one way up in the routes, same as for the cd in the terminal
navigate(‘..’);
```


### Data Fetching via loader()s - react-router-dom
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161626#overview`

It is a convention to not add here the anonymous function and fetch the data in the route definition,
but go to the routes' folder, in the file for this route, export the new function called loader. See `src/routes/Posts.jsx`

If in this loader function we return promise, react router will wait for it to be resolved until it renders the component.
We don't have to return a promise here, but if we use await, then we can.
**Important**: This component will not be rendered until we get the data, dus we will see an empty screen only if this
component has never been rendered before, if we refresh the page on this component

**Important**: Any data returned here, will be available in any component that this route uses, and not only in this post component,
but in all child components as well.

We can use it via `import {useLoaderData} from 'react-router-dom';`

See `src/components/PostList/PostList.jsx`

```javascript
{
    path: '/',
    element: <Posts />,
    loader: postsLoader,
    children: [
      {path: '/create-post', element: <PostNew />}
    ]
},
```


### Dynamic routes with loader()s - path: ':id’
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161632#overview`

```javascript
{
    // Here we use a relative path to the parent, in this case the parent is /. We can also use the apsolute path as for the /create-post.
    path: ':id',
    element: <PostDetails />,
    loader: postDetailsLoader
}
```

Loaders also, as action, receives and object, which has a `{request}` object in it, but more importantly, has a `{params}` object.

Using this params object, we can access the dynamic route key we created.
In this case it was an id: params.id. Route definition was `path: ':id'`.

```javascript
export async function loader({params}) {
  // Fetch data here
}
```


### Handling form submissions via action()s - react-router-dom
`https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161628#overview`

See `src/routes/PostNew/PostNew.jsx`

It is a convention to not add here the anonymous function and fetch the data in the route definition, but go to the routes'
folder, in the file for this route, export the new function called action See `src/routes/PostNew/PostNew.jsx`.

As we are using the `react-router-dom` action()s, the function action below in this file will be called with the form data.

That is why we don't have here the `onSubmit` event, on the form element, and tht is why we don't use state to track
the form data as before using the pure react.

When using action()s we need to add name attributes to the form fields.

**Important**: We need to use the `<Form></Form>` component from `react-router-dom` that will automatically prevent default browser action

This Form component will gather all the form data as an object and call the route action assigned function and pass this data.
But this will be a request object, not the object with form data alone.

We need to add `method="post"` to the `Form` component so we can get a better object in the action, and so we can
differentiate which form was submitted if we have multiple forms in the same route

**Important**: No request will be sent to the backend, but the action function will be called on the client side with the form data.

We then can use `import {redirect} from "react-router-dom";` to redirect back to other route with the response return

```javascript
/*
* The main difference between useNavigate which we used to navigate between routes previously and redirect is that
* useNavigate is a hook that returns a function, while redirect is a function that returns a response object.
*/
return redirect('/');
```
