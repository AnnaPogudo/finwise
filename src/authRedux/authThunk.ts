import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "./authTypes";
import { STORAGE_KEYS } from "./storageKeys";

const AUTH_API_URL = "https://69826d4b9c3efeb892a26071.mockapi.io/users";

function saveAuthToStorage(user: User) {
  const accessToken = `mock_access_${Date.now()}`;
  const refreshToken = `mock_refresh_${Date.now()}`;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export const login = createAsyncThunk<User, LoginPayload>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const query = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    const res = await fetch(`${AUTH_API_URL}${query}`);

    if (!res.ok) {
      return rejectWithValue("Login request failed");
    }

    const data: User[] = await res.json();

    if (!data.length) {
      return rejectWithValue("Invalid email or password");
    }

    const user = data[0];
    saveAuthToStorage(user);
    return user;
  }
);

export const register = createAsyncThunk<User, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    const res = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return rejectWithValue("Registration failed");
    }

    const data: User = await res.json();
    saveAuthToStorage(data);
    return data;
  }
);

export const updateProfile = createAsyncThunk<
  User,
  UpdateProfilePayload & { userId: string }
>(
  "auth/updateProfile",
  async ({ userId, ...payload }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { user: User | null } };
    const current = state.auth.user;
    if (!current) return rejectWithValue("Not logged in");

    const updated: User = {
      ...current,
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.email !== undefined && { email: payload.email }),
      ...(payload.profileImage !== undefined && { profileImage: payload.profileImage }),
    };
    const profileImageToSend =
      payload.profileImage !== undefined
        ? payload.profileImage
        : (current.profileImage ?? null);
    const body: Record<string, unknown> = {
      id: updated.id,
      fullName: updated.fullName,
      email: updated.email,
      profileImage: profileImageToSend,
      ...(updated.phone !== undefined && { phone: updated.phone }),
      ...(payload.password !== undefined && { password: payload.password }),
    };

    const res = await fetch(`${AUTH_API_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return rejectWithValue("Profile update failed");
    }

    const data: User = await res.json();
    const mergedUser: User = {
      ...current,
      ...data,
      profileImage:
        (data.profileImage && String(data.profileImage).trim()) ||
        (current.profileImage && String(current.profileImage).trim()) ||
        undefined,
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mergedUser));
    return mergedUser;
  }
);

