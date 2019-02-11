/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-10-25 16:14:45 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2019-02-12 00:42:41
 */

const path = require("path");
const { exec } = require("child_process");

console.log(process.env)
console.log(process.versions)
console.log(process.version);
const npm = process.platform == "win32" ? "npm.cmd" : "npm";

function prepareTelemetry(telemetryAllowed) {
    try {
        const { telemetry } = require(".");
        return telemetry;
    }
    catch(err) {
        if (!telemetryAllowed) {
            // return dumb proxy so dependent code dont bother if it should log or not
            return new Proxy({}, {});
        }

        return prepareBinaryDependency();
    }
}

function prepareBinaryDependency() {
    const workingDir = path.resolve(__dirname, "..");
    const command = `${npm} rebuild grpc --force --runtime=node --target=${process.versions.node}`;
    const options = {
        cwd: workingDir,
        maxBuffer: 1024 ** 2, // 1 MiB
    };

    console.log(`Running command: "${command}" in "${__dirname}`);

    return new Promise((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            console.log(err, stdout, stderr);
            
            if (err) {
                return reject({ error: err, stdout, stderr });
            };

            return resolve({ stdout, stderr });
        });
    });
}

module.exports = {
    prepareTelemetry,
}
