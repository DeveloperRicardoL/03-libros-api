import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginLocalUser = async (user) => {
  //tomamos los datos enviados por el usuario
  const { email, password } = user;
  //Comprobamos si el usuario eciste
  const loginUser = await prisma.users.findUniqueOrThrow({
    where: {
      email,
      deletedAt: null,
    },
  });
  //Validamos el password
  const passwordCheck = await bcrypt.compare(password, loginUser.password);
  if (!passwordCheck) throw new Error();
  //Generamos JWT, usamos el sign que es la firma
  const accessToken = jwt.sign({ email: loginUser.email }, "mipassword01", {
    expiresIn: "1h",
  });
  return accessToken;
};
