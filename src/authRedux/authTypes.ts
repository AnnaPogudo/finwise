export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  profileImage?: string | null;
}

export interface UpdateProfilePayload {
  phone?: string;
  email?: string;
  password?: string;
}

