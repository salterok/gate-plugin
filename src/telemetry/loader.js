/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-10-25 16:14:45 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-11-16 21:19:44
 */

const path = require("path");
const { exec } = require("child_process");

const fs = require("fs");

console.log(process.env)
console.log(process.versions)
console.log(process.version);
const npm = process.platform == "win32" ? "npm.cmd" : "npm";

const nodeAbi = require("node-abi");

const abiCompatibleTargets = nodeAbi.supportedTargets.filter(target => target.abi == process.versions.modules && target.runtime === "electron");

// assume targets listed in version asc order
const target = abiCompatibleTargets[abiCompatibleTargets.length - 1];

const electronVersion = target.target;

console.log(`Node: ${process.versions.node} Abi: ${process.versions.modules} Electron: ${electronVersion}`);

function prepareTelemetry(telemetryAllowed) {
    try {
        const { telemetry } = require("./telemetry");
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
    // temporary set electron version to 'process.versions' but this may be unsafe for other plugins
    process.versions.electron = electronVersion;

    const workingDir = path.resolve(__dirname, "..");
    // const electronVersion = process.versions.node;// "2.0.9"; // TODO: find a way to retrieve current running electron version
    const command = `${npm} rebuild grpc --force --runtime=electron --target=${electronVersion}`; // --runtime=electron
    const options = {
        cwd: workingDir,
        maxBuffer: 1024 ** 2, // 1 MiB
    };

    console.log(`Running command: "${command}" in "${__dirname}`);

    return new Promise((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            console.log(err, stdout, stderr);
            delete process.versions.electron;
            if (err) {
                return reject({ error: err, stdout, stderr });
            };

            return resolve({ stdout, stderr });
        });
    });
}

module.exports = {
    prepareTelemetry,
    electronVersion,
}
