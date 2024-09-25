import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

export const loginLocalUser = async (user) => {
  const { email, password } = user;

  const loginUser = await prisma.users.findUniqueOrThrow({
    where: {
      email,
      deletedAt: null,
    },
  });
  const passwordCheck = await bcrypt.compare(password, loginUser.password);
  return passwordCheck;
};
