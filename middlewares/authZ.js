function verifyAdmin(req, res, next) {
    if (!req.session.user?.isAdmin) {
        return res.redirect('/');
    }
    next();
}

export default verifyAdmin;