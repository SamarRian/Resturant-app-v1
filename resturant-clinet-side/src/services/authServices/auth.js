import { API_URL as SERVER_URL } from "../../../DevData/CONSTANTS";

const API_URL = `${SERVER_URL}/api/auth`;

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
};

export const signUpUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Signup failed");

  return res.json();
};

export async function getMe() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("https://resturant-app-v1.vercel.app/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to Get session");
    }
    return data;
  } catch (error) {
    onsole.error(error.message);
    throw error;
  }
}
