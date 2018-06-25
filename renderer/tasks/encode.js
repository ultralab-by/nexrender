'use strict';

const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs-extra');
const mkdirp = require('mkdirp');

const RESULTS_DIR = process.env.RESULTS_DIR || 'results';

/**
 * actions is a backward compability term
 * currently only means a synomym for
 * "moving files from temp dir to results dir"
 */
module.exports = function(project) {
    return new Promise((resolve, reject) => {

        let src = path.join( project.workpath, project.resultname );
        let dst = path.join( RESULTS_DIR, project.uid + '_' + project.resultname );

        // create, if it does not exists
        mkdirp.sync(RESULTS_DIR);

        // remove file if exists
        fs.unlink(dst, () => {
            console.info(`[${project.uid}] applying actions: encoding result file...`);
            const cmd = `C:\\Users\\Administrator\\ffmpeg\\bin\\ffmpeg.exe -i ${src} -vcodec libx264 -movflags +faststart -pix_fmt yuv420p ${dst}.mp4`;
            console.log('cmd:', cmd);
            exec(cmd, (error, stdout, stderr) => {
                return error ? reject(error) : resolve(project);
                // command output is in stdout
            });

        })
    });
};
