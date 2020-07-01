import axios from "axios";
import cheerio from "cheerio";
import { Program } from "./program";
import { ProgramsManager } from "./programsManager";
import * as fs from "fs-extra";
const settings: { token: string } = fs.readJsonSync("../settings.json");
const programsManager = new ProgramsManager(settings.token);
programsManager.fetchProgram().then();
