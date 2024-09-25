import { loginLocalUser } from "./auth.service.js";

export const loginLocalUserController = async (req, res) => {
  try {
    const passwordCheck = await loginLocalUser(req.body);

    if (!passwordCheck) throw new Error();
    res.status(200).json({ msg: "Login true" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login false" });
  }
};
