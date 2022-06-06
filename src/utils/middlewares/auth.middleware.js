const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json('No estás autorizado, date media vuelta y pírate');
};

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.role === 'admin') {
            return next();
        }
    }
    return res.status(401).json('Forbidden, date media vuelta y pírate. Necesitas ser admin');

}

module.exports = {
    isAuthenticated,
    isAdmin,
}
