import { Program, IProgram } from "./program";
import axios from "axios";
import cheerio from "cheerio";
import TelegramBot from "node-telegram-bot-api";

interface IProgramsManager {
  bot: TelegramBot;
  programs: Map<string, IProgram>;
  hasProgram(program: Program): boolean;
  addProgram(program: Program): void;
}
class ProgramsManager implements IProgramsManager {
  public programs: Map<string, IProgram>;
  public chats: Set<number>;
  public bot: TelegramBot;

  constructor(private token: string) {
    this.bot = new TelegramBot(token, { polling: true });
    this.chats = new Set();
    this.programs = new Map();
    this.initBot();
    this.fetchProgram();
  }
  initBot(): void {
    this.bot.onText(/\/notify/, (msg, match) => {
      this.chats.add(msg.chat.id);
      this.bot.sendMessage(msg.chat.id, "OK");
    });
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
        for (const id of [...this.chats]) {
          this.bot.sendMessage(
            id,
            `${program.title}\n[https://fun.ssu.ac.kr${program.link}]`
          );
        }
      }
    });
    setTimeout(
      this.fetchProgram,
      1000 * 60 * 10 + Math.floor(Math.random() * 60) * 1000
    );
  }
}
export { ProgramsManager };
