export const verifyRole = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "No autenticado" });
        if (req.user.role && req.user.role.toUpperCase() !== role.toUpperCase())
            return res
                .status(403)
                .json({ message: "No tenes permisos para acceder a este recurso" });
        next();
    };
};