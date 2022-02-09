const { readdirSync, renameSync, existsSync } = require('fs');
const { exec } = require('child_process');

const folders = readdirSync('coverage');

folders.forEach((folder) => {
  const filePath = `coverage/${folder}/coverage-final.json`;
  if (existsSync(filePath)) {
    const newFilePath = `coverage/${folder}-coverage-final.json`;
    renameSync(filePath, newFilePath);
  }
});
