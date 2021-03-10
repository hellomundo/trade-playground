let isAuthorized = true;

const auth = async (req, res, next) => {
    if(isAuthorized) {
        // add user to req
        next()
    } else {
        res.status(403).send('Unauthorized!')
    }
}

module.exports = auth