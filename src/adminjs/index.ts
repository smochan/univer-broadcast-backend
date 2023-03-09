import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express'
import AdminJSMongoose from '@adminjs/mongoose';
import UserResource from './resources/user.resource'
import MessageResource from './resources/message.resource'
import ReplyResource from './resources/reply.resource'

AdminJS.registerAdapter(AdminJSMongoose);

export const adminJs = new AdminJS({
   databases: [],
   rootPath: '/admin',
   resources: [UserResource, MessageResource, ReplyResource],
});

export const router = AdminJSExpress.buildRouter(adminJs);