interface IUser {
   name: string;
   email: string;
   role: 'User' | 'Admin' | 'SuperAdmin';
   active: boolean;
   deactivatorId: string;
}