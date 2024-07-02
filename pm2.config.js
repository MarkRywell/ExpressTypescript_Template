module.exports = {
    name: "Express_API",
    script: 'dist/src/server.js',
    ignore_watch: ["node_modules"],
    // new feature; increase restart delay each time after every crash or non reachable db per example
    exp_backoff_restart_delay: 100,
}