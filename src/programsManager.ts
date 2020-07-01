import { Program, IProgram } from "./program";
import axios from "axios";
import cheerio from "cheerio";
interface IProgramsManager {
  programs: Map<string, IProgram>;
  hasProgram(program: Program): boolean;
  addProgram(program: Program): void;
}
class ProgramsManager implements IProgramsManager {
  public programs: Map<string, IProgram>;
  constructor(private token: string) {
    this.programs = new Map<string, IProgram>();
  }
  hasProgram(program: Program): boolean {
    return this.programs.has(program.title);
  }
  addProgram(program: Program): void {
    if (!this.hasProgram(program)) {
      this.programs.set(program.title, program);
    }
  }
  getPrograms(): IProgram[] {
    return [...this.programs.values()];
  }
  async fetchProgram() {
    const html = await axios.get("https://fun.ssu.ac.kr/ko/program");
    const $ = cheerio.load(html.data);
    $(".columns-4 li").each((index, element) => {
      const program: Program = new Program($(element));
      if (!this.hasProgram(program)) {
        this.addProgram(program);
      }
    });
  }
}
export { ProgramsManager };
