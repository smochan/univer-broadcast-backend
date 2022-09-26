import JWT from 'jsonwebtoken';
import User from '../models/user';

const verifyToken= async (req: any, res: any, next: any) => {

   try{

      // console.log("I am here", process.env.JWT_SECRET);
      if( !req.headers?.authorization ) {
         // req.user = null;
         console.log("no authorization header");
         return next();
      }
      // console.log("I am here 2", req.headers.authorization);
      const token = req.headers.authorization.split(' ')[1];
      // console.log("I am here 3", token);
      if(!process.env.JWT_SECRET) return;
      const id:any = JWT.verify(token, process.env.JWT_SECRET);
      // console.log("I am here 4 ");
      // console.log("id: ", id);

      const user = await User.findById(id?.userId);

      // console.log("user: ", user);
      if (!user ) {
         req.user = null;
         return next();
      }
      if (!user.active) return res.status(401).json({ error: true, message: 'User is not active' });

      req.user = user;

      // console.log(user);
      return next();
   }
   catch (err) {
      req.user = null;
      return next();
   }
   // const privateKey: string = process.env.JWT_SECRET || 'secret';
   // return JWT.verify(token, privateKey);
}

export default verifyToken;