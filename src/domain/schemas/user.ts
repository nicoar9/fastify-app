import S from "fluent-json-schema";

export const getUserById = {
      params: S.object()
        .prop("id", S.string().required().description("User ID")),
      response: {
        200: S.object()
          .prop("id", S.string())
          .prop("name", S.string())
          .prop("email", S.string())
          .prop("roles", S.string()),
        404: S.object().prop("error", S.string()),
      },
    };

export const createUser = {
    body: S.object()
      .prop("name", S.string().required().description("User's name"))
      .prop("email", S.string().format(S.FORMATS.EMAIL).required().description("User's email"))
      .prop("roles", S.string().description("User's roles"))
      .prop("passwordHash", S.string().required()),
    response: {
      200: S.object().prop("id", S.string()),
    },
  };


export const updateUser =  {
    body: S.object()
      .prop("id", S.string().required())
      .prop("name", S.string().description("User's name"))
      .prop("email", S.string().format(S.FORMATS.EMAIL).description("User's email"))
      .prop("roles", S.string().description("User's roles"))
      .prop("passwordHash", S.string().description("User's password hash")),
    response: {
      200: S.object().prop("message", S.string()).prop("affectedRows", S.number()),
      404: S.object().prop("error", S.string()),
      400: S.object().prop("error", S.string()),
    },
  };