import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export class JWTS {

  private blacklist: string[] = [];
  private readonly key: string;

  constructor() {
    this.key = process.env.SECRET || '';
  }

  async logout(token: string): Promise<void> {
    this.blacklist.push(token);
  }
  async addToBlacklist(token: string): Promise<void> {
    this.blacklist.push(token);
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    return this.blacklist.includes(token);
  }

  generateToken(user: any): any {
    return jwt.sign(user, this.key);
  }

}