export class User {
  private userId: number;
  private username: string;

  constructor(_userId: number, _username: string) {
    this.userId = _userId;
    this.username = _username;
  }

  getUserId(): number {
    return this.userId;
  }

  getUsername(): string {
    return this.username;
  }
}
