import Message from "../../models/message";

const deleteMessage: Controller = async (req, res, next) => {
   try{

      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

      const foundMessage = await Message.findOne({ _id: req.body.id });
      if (!foundMessage) return res.status(400).json({ error: true, message: 'Message not found' });

      await Message.updateOne({ _id: req.body.id }, {active: false, updatedAt: new Date(), updatedBy: req.user._id});
      return res.status(200).json({ success: true, message: 'Message deleted successfully' });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default deleteMessage;