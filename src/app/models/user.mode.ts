export interface User{
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserDTO extends Omit<User, "id">{}
