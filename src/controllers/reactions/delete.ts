import Reaction from "../../models/reaction";

const remove: Controller = async (req, res, next) => {
   try{

      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

      const foundReaction = await Reaction.findOne({ messageId: req.body.messageId, userId: req.user._id});
      if (!foundReaction) return res.status(400).json({ error: true, message: 'Reaction does not exist' });

      await Reaction.deleteOne({ messageId: req.body.messageId, userId: req.user._id });

      return res.status(200).json({ success: true, message: 'Reaction deleted successfully' });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default remove;