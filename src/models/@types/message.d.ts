interface IMessage {
   senderId: string;
   message: string;
   createdAt: Date;
   updatedAt: Date;
   updatedBy: string;
   active: boolean;
}