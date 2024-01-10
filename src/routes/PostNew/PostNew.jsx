import classes from './PostNew.module.css';
import {useState} from "react";
import Modal from "../../components/Modal/Modal.jsx";
import {Link} from "react-router-dom";

function NewPost({onModalHide, onAddNewPost}) {
  const [postBody, setPostBody] = useState('');
  const [postAuthor, setPostAuthor] = useState('');

  function changeBodyHandler(event) {
    const newBody = event.currentTarget.value;
    setPostBody(newBody);
  }

  function changeAuthorHandler(event) {
    const newAuthor = event.currentTarget.value;
    setPostAuthor(newAuthor);
  }

  function submitHandler(event) {
    event.preventDefault();

    const postData = {
      body: postBody,
      author: postAuthor,
    };

    onAddNewPost(postData);

    onModalHide();
  }

  return (
    <Modal showModal closeUrl={'/'}>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={changeBodyHandler} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={changeAuthorHandler} />
        </p>
        <p className={classes.actions}>
          <Link to='/'>Close</Link>
          <button type="submit">Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;