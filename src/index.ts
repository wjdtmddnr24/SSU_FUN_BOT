import axios from "axios";
import cheerio from "cheerio";
import { Program } from "./program";
import { ProgramsManager } from "./programsManager";
import path from "path";
import * as fs from "fs-extra";
const programsManager = new ProgramsManager();

programsManager.fetchProgram();
