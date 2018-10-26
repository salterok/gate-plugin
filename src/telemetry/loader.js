/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-10-25 16:14:45 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-10-25 17:00:38
 */

const path = require("path");
const { exec } = require("child_process");

console.log(process.env)
console.log(process.versions)
const npm = process.platform == "win32" ? "npm.cmd" : "npm";

function prepareBinaryDependency() {
    return;
    const electronVersion = "2.0.9"; // TODO: find a way to retrieve current running electron version
    const command = `${npm} rebuild grpc --force --runtime=electron --target=${electronVersion}`;
    const options = {
        cwd: path.resolve(__dirname, ".."),
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
    prepareBinaryDependency,
}
