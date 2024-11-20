import { MySQLPromisePool } from "@fastify/mysql";
import { UserRepository } from "../../../domain/repositories/user";
import { User } from "../../../domain/models/user";
import { randomUUID } from "crypto";

export class MySQLUserRepository implements UserRepository {
  private pool: MySQLPromisePool;

  constructor(pool: MySQLPromisePool) {
    this.pool = pool;
  }

  async getUserById(id: string): Promise<User | null> {
    const client = await this.pool.getConnection();
    const [rows]: any = await client.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    client.release();
    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  async createUser(user: User): Promise<boolean> {
    const client = await this.pool.getConnection();
    const [result]: any = await client.query(
      "INSERT INTO users (id, name, email, roles, passwordHash) VALUES (?, ?, ?, ?, ?)",
      [randomUUID(), user.name, user.email, user.roles, user.passwordHash]
    );
    client.release();
    return result;
  }

  async updateUser(user: Partial<User> & { id: string }): Promise<any> {
    const updates = [];
    const values = [];

    if (user.name) {
      updates.push("name = ?");
      values.push(user.name);
    }
    if (user.email) {
      updates.push("email = ?");
      values.push(user.email);
    }
    if (user.roles) {
      updates.push("roles = ?");
      values.push(user.roles);
    }
    if (user.passwordHash) {
      updates.push("passwordHash = ?");
      values.push(user.passwordHash);
    }

    values.push(user.id);
    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

    const client = await this.pool.getConnection();
    const [result]: any = await client.query(query, values);
    client.release();
    return result;
  }
}
