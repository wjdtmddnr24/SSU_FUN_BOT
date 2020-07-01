export interface IProgram {
  title: string;
  startDate: Date;
  endDate: Date;
  progress: string;
}
export class Program implements IProgram {
  title: string;
  startDate: Date;
  endDate: Date;
  progress: string;
  constructor(programElement: Cheerio) {
    this.title = programElement.find(".title").text();
    this.startDate = new Date(
      programElement.find("time").get(0).attribs.datetime
    );
    this.endDate = new Date(
      programElement.find("time").get(1).attribs.datetime
    );
    this.progress = programElement.find(".progress").text().trim();
  }
}
