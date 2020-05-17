import { Role } from './role.module';

export class User extends Base {
  public roles: Role[];
  public email: string;
  public fullName: string;
  public phoneNumber: string;
}

export class UserCreate extends Base {
  public email: string;
  public fullName: string;
  public phoneNumber: string;
}
