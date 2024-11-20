import { FastifyPluginAsync } from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUserById, updateUser } from "../domain/schemas/user";
import { User } from "../domain/models/user";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const userRepository = fastify.userRepository;
  fastify.route({
    method: "GET",
    url: "/get/user/:id",
    onRequest: fastify.authenticate,
    schema: getUserById,
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const user = await userRepository.getUserById(request.params.id);
      console.log(user);
      if (!user) {
        reply.status(404).send({ error: "User not found" });
      } else {
        reply.send(user);
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/post/user",
    schema: createUser,
    handler: async (
      request: FastifyRequest<{ Body: User }>,
      reply: FastifyReply
    ) => {
      const user: User = request.body;
      const hashedPassword = await User.hashPassword(user.passwordHash);
      console.log(hashedPassword);
      user.passwordHash = hashedPassword;
      const result = await userRepository.createUser(user);
      reply.send(result);
    },
  });

  fastify.route({
    method: "PUT",
    url: "/put/user",
    schema: updateUser,
    handler: async (
      request: FastifyRequest<{ Body: Partial<User> & { id: string } }>,
      reply: FastifyReply
    ) => {
      const updatedUser = request.body;
      const result = await userRepository.updateUser(updatedUser);

      if (result.affectedRows === 0) {
        return reply.status(404).send({ error: "User not found" });
      }

      reply.send({
        message: "User updated successfully",
        affectedRows: result.affectedRows,
      });
    },
  });
};

export default user;
