const authorization = (permission) => {
  return async (req, res, next) => {
    const user = req.user;
    const { cid } = req.params;

    if (!user.isAdmin && !user.role?.permissions?.includes(permission)) {
      return res.status(401).send({ message: "Not authorization!" });
    }

    if (cid) {
      if (user.cart._id != cid) {
        return res
          .status(401)
          .send({ message: "Not authorization for add products" });
      }
    }
    next();
  };
};

export default authorization;
