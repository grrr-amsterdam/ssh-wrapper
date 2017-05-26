#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var ssh2 = require('ssh2')
var fs = require('fs')

var wrapper = module.exports = {
    /**
     * @param obj       config  Config object.
     *                          Requires {user: ..., host: ...}
     *                          Optional {key: ...} defaults to id_rsa
     * @param string    command Command to execute
     * @return Promise
     */
    exec: function(config, command) {
        if (!('key' in config)) {
            config.key = process.env.HOME + '/.ssh/id_rsa'
        }

        var Client = ssh2.Client;

        var conn = new Client();

        return new Promise(function(resolve, reject) {
            conn.on('ready', function() {
                conn.exec(command, function(err, stream) {
                    if (err) throw err;
                    stream.on('close', function(code, signal) {
                        conn.end();
                    }).on('data', function(data) {
                        resolve(data.toString('utf8'))
                    }).stderr.on('data', function(data) {
                        reject(data)
                    });
                });
            }).connect({
                host: config.host,
                port: 22,
                username: config.user,
                privateKey: fs.readFileSync(config.key)
            });
        })
    }
};
