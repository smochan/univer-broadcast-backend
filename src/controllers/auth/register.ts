import User from '../../models/user';
import Auth from '../../models/auth';
import bcrypt from 'bcrypt';

const register: Controller = async (req, res, next) => {
   try {
      const foundUser = await User.findOne({ email: req.body.email});
      if (foundUser) return res.status(400).json({ error: true, message: 'User already exists' });
      
      // console.log(req.body);
      const newUser = new User({
         name: req.body.name,
         email: req.body.email,
         // role: req.body.role,
      });
      const user = await newUser.save();

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newAuth = new Auth({
         userId: user._id,
         password: hashPassword,
      });

      await newAuth.save();
      return res.status(200).json({ success: true, message: 'User created successfully' });
   
      // return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default register;