import { SignInCredentials } from './SignInCredencials';
import { User } from './User';

export type AuthContextData = {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  logout(): void;
  updateUser(user: User): void;
};
