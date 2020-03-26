import { Role } from './role.module';

export class User extends Base {
  public roles: Role[];
  public Email: string;
  public FullName: string;
  public PhoneNumber: string;
}

export class UserCreate extends Base {
  public Email: string;
  public FullName: string;
  public PhoneNumber: string;
}
