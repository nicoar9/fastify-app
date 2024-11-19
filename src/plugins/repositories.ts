import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { MySQLUserRepository } from "../data/repositories/sql/user";

export default fp(async (fastify: FastifyInstance) => {
  if (!fastify.mysql) {
    throw new Error("MySQL plugin is not registered");
  }

  const userRepository = new MySQLUserRepository(fastify.mysql);
  fastify.decorate("userRepository", userRepository);
});
