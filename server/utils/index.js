const fs = require('fs');

module.exports = function clearFolderRecursive(path, cb) {
    if (fs.existsSync(path)) {
        while (file = fs.readdirSync(path).pop()) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                clearFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        }
    }
    cb();
};