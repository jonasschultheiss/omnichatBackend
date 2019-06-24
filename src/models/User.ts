export class User {
  private userId: number;
  private username?: string;

  constructor(_userId: number) {
    this.userId = _userId;
  }

  getUserId(): number {
    return this.userId;
  }

  getUsername(): string {
    return this.username!;
  }

  setUsername(_username: string): void {
    this.username = _username;
  }
}
