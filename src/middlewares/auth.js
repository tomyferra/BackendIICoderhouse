export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    }
    res.status(401).send({ status: "error", error: "usuario no autenticado" })
}

export const authorization = (role) => {
    return (req, res, next) => {
        if (req.session.user.role === role) {
            return next()
        }
        res.status(403).send({ status: "error", error: "usuario no autorizado" })
    }
}