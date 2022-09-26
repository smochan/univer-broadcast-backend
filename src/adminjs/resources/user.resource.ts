import { ResourceWithOptions, ResourceOptions } from "adminjs";
import userModel from "../../models/user";

const UserResource: ResourceWithOptions = {
  resource: userModel,
  options: {
    properties: {
      
    }
  } as ResourceOptions,
};

export default UserResource;