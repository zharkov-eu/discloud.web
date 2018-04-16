"use strict";

import {exec, spawn} from "child_process";
import * as fs from "fs";
import * as path from "path";
import {promisify} from "util";

// noinspection TsLint
const packageJson = require("./package.json");

const execAsync = promisify(exec);
const readdirAsync = promisify(fs.readdir);

process.env["NODE_ENV"] = "production";

(async () => {
  // Fonts
  await recursiveSyncDirectory(
      path.join("public", "src", "font"),
      path.join("public", "build", "font"),
      ["font.css"],
  );
  console.log("Fonts directory synced");
  // Images
  await recursiveSyncDirectory(
      path.join("public", "src", "img"),
      path.join("public", "build", "img"),
  );
  console.log("Images directory synced");
  // Icons
  await recursiveSyncDirectory(
      path.join("public", "src", "icon"),
      path.join("public", "build", "icon"),
      ["icon.css", "svg"],
  );
  console.log("Icons directory synced");

  const webpack = spawn("node", ["./node_modules/webpack/bin/webpack"]);
  webpack.stdout.on("data", (data) => console.log(data.toString()));
  webpack.stderr.on("data", (data) => console.error("Webpack build error: " + data.toString()));
  webpack.on("close", () => console.log("Webpack build successfully ended"));

  await makeBuildTxt();
})();

async function recursiveSyncDirectory(sourceDir, buildDir, ignore: string[] = []) {
  if (!fs.existsSync(buildDir)) {
    mkdir(buildDir);
  }
  const now = await readdirAsync(buildDir);
  let src = await readdirAsync(sourceDir);
  src = src.filter((file) => now.indexOf(file) === -1 && ignore.indexOf(file) === -1);
  src.forEach((file) => {
    if (fs.lstatSync(path.join(sourceDir, file)).isDirectory()) {
      copyFolderRecursiveSync(path.join(sourceDir, file), buildDir);
    } else {
      fs.createReadStream(path.join(sourceDir, file))
          .pipe(fs.createWriteStream(path.join(buildDir, file)));
    }
  });

  function mkdir(_path: string, root?: string) {
    const dirs = _path.split(path.sep);
    const dir = dirs.shift();
    root = (root || "") + dir + path.sep;

    try {
      fs.mkdirSync(root);
    } catch (e) {
      if (!fs.statSync(root).isDirectory()) {
        throw new Error(e);
      }
    }

    return !dirs.length || mkdir(dirs.join(path.sep), root);
  }

  function copyFolderRecursiveSync(source, target) {
    let files = [];

    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source);
      files.forEach((file) => {
        const currentSource = path.join(source, file);
        if (fs.lstatSync(currentSource).isDirectory()) {
          copyFolderRecursiveSync(currentSource, targetFolder);
        } else {
          fs.createReadStream(path.join(source, file))
              .pipe(fs.createWriteStream(path.join(targetFolder, file)));
        }
      });
    }
  }
}

async function makeBuildTxt() {
  const commit = (await execAsync("git rev-parse HEAD"))["stdout"];
  if (fs.existsSync("build.txt")) {
    fs.truncateSync("build.txt", 0);
  }
  fs.writeFileSync("build.txt", `Discloud.Webapp-${packageJson.version}; commit: ${commit}`);
}
