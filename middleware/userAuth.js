import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(req.cookies.token);
    try {
        console.log('token:', token)
        if (!token) {
            console.log('token:', token)
            return res.json({ success: false, message: 'Not Authorized Login Again!' });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_TEXT);
        if (decodeToken.id) {

            req.userId = decodeToken.id;
            return next();

        } else {
            console.log('token2:', token)
            return res.json({ success: false, message: 'Not Authorized Login Again!' });
        }


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export default userAuth;