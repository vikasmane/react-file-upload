const fs = require('fs');

export function clearFolderRecursive(path, cb) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                clearFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                cb();
            }
        });
    }
};