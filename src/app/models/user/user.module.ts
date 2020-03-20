import { Role } from './role.module';

export class User extends Base {
  public token: string;
  public roles: Role[];
  public Email: string;
  public FullName: string;
  public PhoneNumber: string;
}
