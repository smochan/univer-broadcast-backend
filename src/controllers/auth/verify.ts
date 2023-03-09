const verify: Controller = async (req, res, next) => {
   try {
      if(!req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });
      return res.status(200).json({ success: true, message: 'User verified successfully', data: { user: req.User } });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default verify;
