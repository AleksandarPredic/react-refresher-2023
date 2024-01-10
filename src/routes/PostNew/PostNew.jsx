import classes from './PostNew.module.css';
import Modal from "../../components/Modal/Modal.jsx";
import {Link, Form, redirect} from "react-router-dom";

function NewPost() {

  // Action lesson: https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/41161628#overview
  // As we are using the react-router-dom action()s, the function action below in this file will be called with the form data.
  // That is why we don't have here the onSubmit event, on the form element, and tht is why we don't use state to track the form data as before using the react-router-dom
  // When using action()s we need to add name attributes to the form fields

  // Important: We need to use the Form component from react-router-dom that will automatically prevent default browser action
  // This Form component will gather all the form data as an object and call the route action assigned function and pass this data. But this will be a request object, not the object with form data alone.
  // We need to add method="post" to the Form component so we can get a better object in the action and so we can differentiate which form was submitted if we have multiple forms in the same route
  // Important: No request will be sent to the backend, but the action function will be called on the client side with the form data
  // We then can use import {redirect} from "react-router-dom"; to redirect back to other route with the response return
  return (
    <Modal showModal closeUrl={'/'}>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" name="author" id="name" required />
        </p>
        <p className={classes.actions}>
          <Link to='/'>Close</Link>
          <button type="submit">Submit</button>
        </p>
      </Form>
    </Modal>
  );

  // TODO: disable submit button when the form is submitted as it takes a few seconds to load the redirect and the user can click multiple times on the submit button
}

export default NewPost;

// data param is not the form data, but it is a request object
// We use the object destructuring to get the request object
export async function action({request}) {
  // Form data returns a promise, so we need to use await
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // {body: '...', author: '...'}
  // The alternative way to get the post data is to use formData.get
  // formData.get('body');

  const response = await fetch(
    'http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {'Content-Type': 'application/json'},
    }
  );

  if (!response.ok) {
    // TODO: Handle the error
    const errorData = await response.json();
    console.error('Error:', errorData);
  } else {
    // In this case I need no data from response
    //const resData = await response.json();

    return redirect('/');
  }

  /*
   * The main difference between useNavigate which we used to navigate between routes previously and redirect is that
   * useNavigate is a hook that returns a function, while redirect is a function that returns a response object.
   */
}