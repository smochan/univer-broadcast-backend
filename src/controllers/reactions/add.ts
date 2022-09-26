import Reaction from "../../models/reaction";

const add: Controller = async (req, res, next) => {
   try{

      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

      const foundReaction = await Reaction.findOne({ messageId: req.body.messageId, userId: req.user._id });
      if (foundReaction) return res.status(400).json({ error: true, message: 'Reaction already exists' });

      if(!req.body.messageId || !req.body.reaction) return res.status(400).json({error: true, message: "message id or reaction is not provided."});
      
      const newReaction = new Reaction({
         messageId: req.body.messageId,
         userId: req.user._id,
         reaction: req.body.reaction,
      });

      await newReaction.save();

      return res.status(200).json({ error: false, message: 'Reaction added successfully' });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default add;