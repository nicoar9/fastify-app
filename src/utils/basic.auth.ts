export interface BasicAuthResult {
  username: string;
  password: string;
}

export function verifyBasicAuth(authHeader: string): BasicAuthResult | null {
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");

  if (username && password) {
    // Add logic to validate the username/password
    return { username, password };
  }

  return null;
}
