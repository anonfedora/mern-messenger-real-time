import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({email: ''})
  const alert = useAlert;

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const {error, message} = useSelector(state=> state.auth);
  const navigate = useNavigate();

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(state));
  };

  useEffect(() => {
    if (error){
        console.log(error)
        dispatch(clearErrors());
    }
    if (message){
        console.log(message)
        navigate('/');
    }
    
  }, [dispatch, error, alert, message]);

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>

      <form className="form-group" onSubmit={forgotPasswordSubmit} action="">
        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            required
            name="email"
            value={state.email}
            onChange={inputHandle}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Send" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
