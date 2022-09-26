import Message from "../../models/message";

const broadcast: Controller = async (req, res, next) => {
   try{
      // console.log("request ye h: ", req.body, "\n user ye h: ", req.user);

      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

         if( !req.user.active) return res.status(401).json({ error: true, message: 'User is not active' });
      if( !req.body.message) return res.status(400).json({ error: true, message: 'Message is required' });
      const userId = req.user._id;
      const message = new Message({
         senderId: userId,
         message: req.body.message,
         // createdAt: new Date(),
      });

      await message.save();
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default broadcast;