import { UserRepository } from "../domain/repositories/user"; // Adjust the path to where your UserRepository is located

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    mysql: MySQLPromisePool;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
