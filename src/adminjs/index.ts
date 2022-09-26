import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express'
import AdminJSMongoose from '@adminjs/mongoose';
import UserResource from './resources/user.resource'
import MessageResource from './resources/message.resource'

AdminJS.registerAdapter(AdminJSMongoose);

export const adminJs = new AdminJS({
   databases: [],
   rootPath: '/admin',
   resources: [UserResource, MessageResource],
});

export const router = AdminJSExpress.buildRouter(adminJs);