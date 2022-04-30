module.exports = validateLogin = (req,res, next) => {
if(!req.session.user_id) {
    res.redirect('/login');
} else {
    next();
}
};