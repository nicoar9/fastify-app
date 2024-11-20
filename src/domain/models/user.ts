import bcrypt from "bcrypt";

export class User {
  id: string;
  name: string;
  email: string;
  roles?: string;
  passwordHash: string;

  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    roles?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.passwordHash = passwordHash;
  }

  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  }
}
