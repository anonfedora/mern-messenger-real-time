import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../store/actions/authAction";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const {loading, authenticate, error, successMessage, myInfo} = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const {userName, email,password,confirmPassword,image} = state;
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', image);
    dispatch(userRegister(formData));
  };

  useEffect(() => {
    if (authenticate) {
      navigate('/');
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({type: SUCCESS_MESSAGE_CLEAR})
    }
    if (error) {
      error.map(err=>alert.error(err));
      dispatch({type: ERROR_CLEAR})
    }

  }, [successMessage,error])
  
  return (
    <div>
      <h1 className="register">
        <div className="card">
          <div className="card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form onSubmit={register} action=''>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  onChange={inputHandler}
                  name="userName"
                  value={state.userName}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  id="username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandler}
                  name="email"
                  value={state.email}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandler}
                  name="password"
                  value={state.password}
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  onChange={inputHandler}
                  name="confirmPassword"
                  value={state.confirmPassword}
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  id="confirmPassword"
                />
              </div>
              <div className="form-group">
                <div className="file-image">
                  <div className="image">
                    {imagePreview ? <img src={imagePreview} /> : ''}
                  </div>
                  <div className="file">
                    <label htmlFor="image">Select Image</label>
                    <input
                      onChange={fileHandler}
                      name="image"
                      type="file"
                      className="form-control"
                      id="image"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input type="submit" className="btn" value="register" />
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
};

export default Register;
