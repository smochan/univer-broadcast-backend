import Reply from "../../models/reply";
import { ObjectId } from "mongodb";

const getReply: Controller = async (req, res, next) => {

   try{
      if(!req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });


      const messageId = new ObjectId(req.params.messageId);
      // console.log( await Reply.find({ messageId: req.params.messageId }).sort({ createdAt: -1 }));
      const reply = await Reply.aggregate([
         { "$match": { "messageId": messageId }},
         { "$lookup": { "from": "users", "localField": "senderId", "foreignField": "_id", "as": "sender"}},
         { "$unwind": "$sender" },
         { "$project": { "message": 1, "createdAt": 1, "sender": { "name": 1}}},
         { "$sort": { "createdAt": 1 } },
      ])

      return res.status(200).json({ success: true, message: 'Reply fetched successfully', data: { reply: reply} });
   }
   catch(err){
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}

export default getReply;