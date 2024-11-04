export const adminAuth = (req ,res , next)=>{
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        onsole.log("Error in verifyToken ", error);
        return res.status(400).json({ success: false, message: "Server error" })
    }
};
