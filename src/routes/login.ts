import { FastifyPluginAsync } from "fastify";
import bcrypt from "bcrypt";
import { loginSchema } from "../domain/schemas/login";

const login: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: async (request, reply) => {
      const { id, password } = request.body as {
        id: string;
        password: string;
      };

      const user = await fastify.userRepository.getUserById(id);
      if (!user) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }

      const isPasswordValid = user.passwordHash
        ? await bcrypt.compare(password, user.passwordHash)
        : false;
      if (!isPasswordValid) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }

      const token = fastify.jwt.sign({
        userId: user.id,
        roles: user.roles,
      });

      reply.send({ token });
    },
  });
};

export default login;
