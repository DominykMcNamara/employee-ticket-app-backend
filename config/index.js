const expressConfig = require("./express")

module.exports = async (app) => {
    const expressApp = await expressConfig(app)
}