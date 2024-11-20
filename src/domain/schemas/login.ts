import S from "fluent-json-schema";

export const loginSchema = {
  params: S.object()
    .prop("email", S.string().format(S.FORMATS.EMAIL))
    .prop("password", S.string()),
  response: {
    200: S.object().prop("token", S.string()),
  },
};
