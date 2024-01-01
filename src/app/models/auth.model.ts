export interface AuthModel {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthResponseModel {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}
