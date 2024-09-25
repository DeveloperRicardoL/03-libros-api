import { loginLocalUser } from "./auth.service.js";

export const loginLocalUserController = async (req, res) => {
  try {
    const accessToken = await loginLocalUser(req.body);

    res.status(200).json({ token_jwt: accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login false" });
  }
};
