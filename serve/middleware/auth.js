const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ success: false, message: 'access token is not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //lay id cua user
        req.userId = decoded.userId
        //middlename ok => next
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }

}
module.exports = verifyToken