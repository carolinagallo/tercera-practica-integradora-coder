const userAuthorization = () => {
  return async (req, res, next) => {
    const user = req.user;

    if (user.role?.name !== "user") {
      return res.status(401).send({ message: "Not authorization!" });
    }

    next();
  };
};

export default userAuthorization;
