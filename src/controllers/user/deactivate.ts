import User from "../../models/user";

const deactivate: Controller = async (req, res, next) => {
   try{
      const foundUser = await User.findOne({ email: req.body.email});
      if (!foundUser) return res.status(400).json({ error: true, message: 'User not found' });
      else {
         await User.updateOne({ email: req.body.email }, { active: false, deactivatorId: req.body.deactivatorId });
         return res.status(200).json({ success: true, message: 'User deactivated successfully' });
      }
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default deactivate;