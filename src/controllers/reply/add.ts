import Reply from "../../models/reply";

const add: Controller = async (req, res, next) => {
   try {
      if (!req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });
      if (!req.user.active) return res.status(401).json({ error: true, message: 'User is not active' });
      if (!req.body.messageId) return res.status(400).json({ error: true, message: 'Message Id is required' });
      if (!req.body.message) return res.status(400).json({ error: true, message: 'Message is required' });

      const reply = new Reply({
         messageId: req.body.messageId,
         senderId: req.user._id,
         message: req.body.message,
      });

      await reply.save();

      return res.status(200).json({ success: true, message: 'Reply sent successfully' });
   } 
   catch (err){
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

   export default add;