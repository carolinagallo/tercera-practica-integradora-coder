import SessionManager from "../../domain/managers/sessions.js";

export const login =
  ("/login",
  async (req, res, next) => {
    try {
      const data = req.body;

      const { email, password } = data;

      const sessionManager = new SessionManager();

      const accessToken = await sessionManager.login(email, password);

      res
        .cookie("accessToken", accessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        })
        .send({ message: "Login success!", accessToken });
    } catch (e) {
      next(e);
    }
  });

export const current = async (req, res, next) => {
  try {
    res
      .status(200)
      .send({ status: 200, message: "Success", payload: req.user });
  } catch (e) {
    next(e);
  }
};

export const logout =
  ("/logout/:id",
  async (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        return res.send({ message: "Logout ok!" });
      }

      res.send({ message: "Logout error!", body: err });
    });
  });

export const signup = async (req, res, next) => {
  try {
    const data = req.body;
    const sessionManager = new SessionManager();
    const user = await sessionManager.signup(data);

    res.status(201).send({ status: "success", user, message: "User created." });
  } catch (e) {
    next(e);
  }
};
