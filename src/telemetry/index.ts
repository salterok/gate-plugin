/*
 * @Author: Sergiy Samborskiy 
 * @Date: 2018-10-25 16:27:34 
 * @Last Modified by: Sergiy Samborskiy
 * @Last Modified time: 2018-12-12 20:41:46
 */

import * as path from "path";
import * as vscode from "vscode";

const loader = require("./loader");

const electronVersionMissing = process.versions.electron === undefined;
if (electronVersionMissing) { // if electron version will be present in future versions do not patch it
    process.versions.electron = loader.electronVersion;
}
const { Logging } = require("@google-cloud/logging");
const monitoring = require("@google-cloud/monitoring");
if (electronVersionMissing) {
    delete process.versions.electron;
}

// const projectId = "plugin-220409";
// const filename = "../../plugin-220409-88b39e530b83.json";
const projectId = "gate-plugin";
const filename = "../../gate-plugin-abb28134b06e.json";


const logger = new Logging({
    projectId: projectId,
    keyFilename: path.resolve(__dirname, filename),
});

let log = logger.log(`log1`);


var client = new monitoring.v3.MetricServiceClient({
    projectId: projectId,
    keyFilename: path.resolve(__dirname, filename),
});

// var formattedName = client.projectPath(projectId);
// var metricDescriptor = {
//     description: 'How many phases in pipeline how much time it precessing and more',
//     displayName: 'Pipeline stats',
//     type: 'custom.googleapis.com/recognition/pipeline_stats',
//     metricKind: 'GAUGE',
//     valueType: 'DOUBLE',
//     unit: 'ms',
//     labels: [
//         {
//             key: "machineId",
//             valueType: 'STRING',
//             description: "Machine Id"
//         },
//         {
//             key: "sessionId",
//             valueType: 'STRING',
//             description: "Session Id"
//         },
//         {
//             key: "phasesCnt",
//             valueType: 'INTEGER',
//             description: "Phases count in master pipeline"
//         },
//         {
//             key: "multiPhasesCtn",
//             valueType: 'INTEGER',
//             description: "MultiPhases count in master pipeline"
//         },
//         {
//             key: "pipelineDepth",
//             valueType: 'INTEGER',
//             description: "Depth of master pipeline"
//         },
//     ],
// };
// var request = {
//     name: formattedName,
//     metricDescriptor: metricDescriptor,
// };
// client.createMetricDescriptor(request).catch((err: any) => {
//     console.error("cant create custom metric", err);
// });

const baseLabels = {};

class Telemetry {

    notifyPipelineStats(time: number, stats: Record<"phasesCnt" | "multiPhasesCtn" | "pipelineDepth", number>) {
        
        // const dataPoint = {
        //     interval: {
        //       endTime: {
        //         seconds: Date.now() / 1000,
        //       },
        //     },
        //     value: {
        //       doubleValue: time,
        //     },
        //   };
          
        //   const timeSeriesData = {
        //     metric: {
        //       type: "custom.googleapis.com/recognition/pipeline_stats",
        //       labels: {
        //         ...baseLabels,
        //         ...stats,
        //       },
        //     },
        //     resource: {
        //       type: 'global',
        //       labels: {
        //         project_id: projectId,
        //       },
        //     },
        //     points: [dataPoint],
        //   };
          
        //   const request = {
        //     name: client.projectPath(projectId),
        //     timeSeries: [timeSeriesData],
        //   };

        //   client.createTimeSeries(request)
        //     .then((results: any) => {
        //         console.log(`Done writing time series data.`, results[0]);
        //     })
        //     .catch((err: any) => {
        //         console.error('ERROR:', err);
        //     });

        this._sendLog({
            time,
            stats,
        });

    }

    info() {
        const data = {    
            // dirname: __dirname,
            // time: new Date(),
            vscode: vscode.version,
        }

        this._sendLog(data);
    }

    private _sendLog(data: any) {
        // The metadata associated with the entry
        const metadata = {resource: {type: 'project'}, labels: {
            ...baseLabels
        }};
        // Prepares a log entry
        const entry = log.entry(metadata, data);
        
        let ll = log.info(entry);

        ll.then(() => {
            console.log(`Logged: `, data);
        })
        .catch((err: any) => {
            console.error('ERROR:', err);
        });
    }
}

// module.exports = new Telemetry();
export const telemetry = new Telemetry();

export function setDefaultLabels(labels: {}) {
    Object.assign(baseLabels, labels);
}
