#!/usr/bin/env node
/**
 * Created by jasonxu on 2020/8/16.
 */
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');


const getFileNames = filePath => {
  const fileArray = [];
  const dirArray = fs.readdirSync(filePath);
  dirArray.forEach(dir => {
    (fs.readdirSync(filePath + dir)).forEach(file => {
      fileArray.push(`${filePath + dir}/${file}`);
    });
  });
  return fileArray;
};

function changeFileName(filePath) {
  const files = getFileNames(filePath);
  files.forEach(item => {
    const newName = item.replace(/ -- after all hook /, ' ')
      .replace(/ -- before each hook /, ' ')
      .replace(/ -- before all hook /, ' ');
    fs.rename(`${item}`, `${newName}`, err => {
      if (err) throw err;
    });
  });
}

function copyScreenShotsDir(screenshotsDir = 'cypress/screenshots', output = 'mochawesome-report') {
  const isExists = fse.existsSync(screenshotsDir);
  if (isExists) {
    fse.copy(screenshotsDir, path.join(output, 'screenshots'), { recursive: true });
  }
}

module.exports = {
  changeFileName,
  copyScreenShotsDir
};
