function auth(req,res,next)
{
    // the user is logged in or not
    if(req.isAuthenticated())
    {
        return next()
    }
    return res.redirect('/login')
}
module.exports = auth 