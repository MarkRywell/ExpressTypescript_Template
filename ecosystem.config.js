module.exports = {
    apps: [
        {
            ...require('./pm2.config'),
            exec_mode: "fork",
            attach: true
        }
    ]
}