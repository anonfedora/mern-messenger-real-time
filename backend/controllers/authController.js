const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const console = require("console");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");

module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    const { image } = files;
    const error = [];
    console.log(fields);
    if (!userName) {
      error.push("Please provide a username");
    }
    if (!email) {
      error.push("Please provide an email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please provide a valid Email");
    }
    if (!password) {
      error.push("Please provide a password");
    }

    if (!confirmPassword) {
      error.push("Please provide a confirm password");
    }
    if (/*!password && confirmPassword && */ password !== confirmPassword) {
      error.push("Password and confirm password do not match!");
    }
    if (password && password.length < 8) {
      error.push("Password must be at least 8 character");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide an image");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.image.originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      files.image.originalFilename = newImageName;

      const newPath =
        __dirname +
        `../../../frontend/public/image/${files.image.originalFilename}`;

      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Email exists"],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  register: userCreate.createdAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );
              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };

              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Registeration Successful",
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  }); // end Formidable
};

module.exports.userLogin = async (req, res) => {
  const error = [];
  console.log(req.body);
  const { email, password } = req.body;
  if (!email) {
    error.push("Please provide your Email");
  }
  if (!password) {
    error.push("Please provide your Passowrd");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please provide your Valid Email");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        .select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );
          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };

          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Login Successful",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Your Password is not Valid"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessage: ["Your Email is Not Found"],
          },
        });
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessage: ["Internal Server Error"],
        },
      });
    }
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  const user = await registerModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({
      error: {
        errorMessage: ["User not found!"],
      },
    });
    next();
  }
  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${req.protocol}://$req.get(host)}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} 
  \n\nIf you have not requested this email, please ignore it.`;
  try {
    debugger;
    await sendEmail({
      email: user.email,
      subject: `Messenger Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email has been sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(500).json({
      error: {
        errorMessage: ["Internal Server Error!"],
      },
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  const error = [];
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await registerModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    error.push("Reset Password Token is invalid or has expired");
  }

  if (req.body.password !== req.body.confirmPassword) {
    error.push("Passwords do not match");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

module.exports.userLogout = (req, res) => {
  res.status(200).cookie("authToken", "").json({
    success: true,
  });
};
