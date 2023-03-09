import { ResourceWithOptions, ResourceOptions } from "adminjs";
import replyModel from "../../models/reply";

const ReplyResource: ResourceWithOptions = {
   resource: replyModel,
   options: {
      properties: {
      }
   } as ResourceOptions,
};

export default ReplyResource;