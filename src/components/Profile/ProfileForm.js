import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import classes from "./ProfileForm.module.css";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const ProfileForm = () => {
  const newPassInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPass = newPassInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      // assume always successful

      history.replace("");
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPassInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
