import Message from "../../models/message";
import { ObjectId } from 'mongodb';

const getMessages: Controller = async (req, res, next) => {

   try {

      if( !req.user) return res.status(401).json({ error: true, message: 'Unauthorized' });

      // const messages = await Message.find({active: true}).sort({ createdAt: -1 });

      const messages = await Message.aggregate([
         { "$match": { "active": true }}, 
         { "$lookup": { "from": "users", "localField": "senderId", "foreignField": "_id", "as": "sender"} },
         { "$unwind": "$sender" },
         { "$lookup": { "from": "reactions", "localField": "_id", "foreignField": "messageId", "as": "reactions"} },
         // { "$group": { "_id": "$_id", "sender": { "$first": "$sender" }, "content": { "$first": "$content" }, "createdAt": { "$first": "$createdAt" }, "reactions": { "$first": "$reactions" } } },
         { "$project": { "message": 1, "createdAt": 1, "sender": { "name": 1}, "reactions": {"reaction": 1, "userId": 1} } },
         { "$sort": { "createdAt": -1 } },
      ])
      // console.log(messages);
      return res.status(200).json({ success: true, message: 'Messages fetched successfully', data: { messages: messages, user: req.user } });
   }
   catch (err) {
      next(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
   }
}
      


export default getMessages;