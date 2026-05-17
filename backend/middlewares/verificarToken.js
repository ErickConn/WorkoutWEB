import jwt from "jsonwebtoken";


const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ ok: false, message: "Token não fornecido" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ ok: false, message: "Token inválido" });
        }
        req.userId = user.id;
        next();
    });
}

export default authenticateToken;