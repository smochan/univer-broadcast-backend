import { ResourceWithOptions, ResourceOptions } from "adminjs";
import messageModel from "../../models/message";

const MessageResource: ResourceWithOptions = {
   resource: messageModel,
   options: {
      properties: {
      }
   } as ResourceOptions,
};

export default MessageResource;