import message from "../../models/message";

const update: Controller = async (req, res, next) => {
   try{
      
      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

      const foundMessage = await message.findOne({ _id: req.body.id });
      if (!foundMessage) return res.status(400).json({ error: true, message: 'Message not found' });
      else {
         await message.updateOne({ _id: req.body.id }, { message: req.body.message, updatedAt: new Date(), updatedBy: req.user._id });
         return res.status(200).json({ success: true, message: 'Message updated successfully' });
      }
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default update;