import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";
import { clearErrors } from "../store/actions/authAction";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { success, error} = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert,  success]);

  return (
    <div>
      <h1 className="register">
        <div className="card">
          <div className="card-header">
            <h3>Reset Password</h3>
          </div>
          <div className="card-body">
            <form action="" onSubmit={resetPasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}

                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input type="submit" className="btn" value="Reset Password" />
              </div>

              <div className="form-group">
                <span>
                  {" "}
                  <Link to="/messenger/login">Login</Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      </h1>
    </div>
  );
}

export default ResetPassword;
