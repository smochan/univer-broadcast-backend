import JWT from 'jsonwebtoken';

export const createToken = (userId: any) => {
   try{

      const privateKey = process.env.JWT_SECRET;
      if( !privateKey) return;
      // const token = JWT.sign({ userId: userId }, privateKey, { expiresIn: '1h' });
      const token = JWT.sign({ userId: userId }, privateKey );
      return token;
   }
   catch ( err) {
      // next(err);
      console.log(err);
   }
}

