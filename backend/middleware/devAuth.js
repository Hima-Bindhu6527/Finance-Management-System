module.exports = (req, res, next) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'x-user-id header required (dev only)' });
  }
  req.userId = userId;
  next();
};
