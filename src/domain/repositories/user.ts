import { User } from "../models/user";

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<boolean>;
  updateUser(user: Partial<User>): Promise<any>;
}
