export class User {
  id: string;
  name: string;
  email: string;
  roles?: string;
  passwordHash?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    roles?: string,
    passwordHash?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.passwordHash = passwordHash;
  }

  // Example method
  static hashPassword(password: string): string {
    // Hashing logic (e.g., bcrypt)
    return password; // Placeholder
  }
}
