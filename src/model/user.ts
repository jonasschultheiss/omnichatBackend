export class User {
  private id: number;
  private name: string;

  constructor(_id: number, _name: string) {
    this.id = _id;
    this.name = _name;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
