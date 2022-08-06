const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie('authToken', token, options).json({
        success: true,
        user,
        token,
    })
}

module.exports = sendToken;