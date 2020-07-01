import axios from "axios";
import cheerio from "cheerio";
import { Program } from "./program";
import { ProgramsManager } from "./programsManager";
import path from "path";
import * as fs from "fs-extra";
console.log(path.join(__dirname, "..", "settings.json"));
const settings: { token: string } = fs.readJsonSync(
  path.join(__dirname, "..", "settings.json")
);
const programsManager = new ProgramsManager(settings.token);
