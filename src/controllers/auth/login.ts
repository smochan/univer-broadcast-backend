import User from '../../models/user';
import Auth from '../../models/auth';
import bcrypt from 'bcrypt';

import { createToken } from '../../middleware/createToken';

const login: Controller = async (req, res, next) => {
   try{
      const email = req.body.email;
      const password = req.body.password;


      const foundUser = await User.findOne({ email: email });
      if (!foundUser) return res.status(400).json({ error: true, message: 'User does not exist' });
      else {
         const foundAuth = await Auth.findOne({ userId: foundUser._id });

         if (!foundAuth) return res.status(400).json({ error: true, message: 'User does not exist' });
         
         const isPasswordValid = await bcrypt.compare(password, foundAuth.password);
         
         if (!isPasswordValid) return res.status(400).json({ error: true, message: 'Invalid password' });
         
         const token = createToken(foundUser._id);
         return res.status(200).json({ success: true, message: 'User logged in successfully', data: {token: token }});
      }
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default login;