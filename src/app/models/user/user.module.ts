import { Role } from './role.module';

export class User {
  id: number;
  public roles: Role[];
  public email: string;
  public fullName: string;
  public phoneNumber: string;
  edit: string;
}

export class UserCreate {
  id: number;
  public email: string;
  public fullName: string;
  public phoneNumber: string;
}
