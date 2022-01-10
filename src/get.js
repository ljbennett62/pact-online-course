const {get} = require('axios')

module.exports = function () {
    return get(`http://localhost:1235/token/1235`)
}
