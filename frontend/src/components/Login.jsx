import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { userLogin } from "../store/actions/authAction";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <div>
      <h1 className="register">
        <div className="card">
          <div className="card-header">
            <h3>Login</h3>
          </div>
          
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={inputHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={inputHandle}
                />
              </div>

              <div className="form-group">
                <input type="submit" className="btn" value="login" />
              </div>

              <div className="form-group">
                <span>
                  {" "}
                  {
                    /**Forgot Password */
                    error && (
                      <>
                        <Link to="/messenger/forgot-password">
                          Forgot Password
                        </Link>
                        <div>
                          <ForgotPassword />
                        </div>
                      </>
                    )
                  }
                  <Link to="/messenger/register">Create an Account</Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      </h1>
    </div>
  );
}

export default Login;
