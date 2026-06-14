"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define username and password configurations (defaulting if not defined in env)
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "century123";

/**
 * Handles authenticating user and setting a secure session cookie
 */
export async function loginAdmin(prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "Please enter both username and password" };
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day session
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid username or password" };
}

/**
 * Logs the admin out by deleting the session cookie
 */
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

/**
 * Server-side helper to ensure the user is logged in before rendering admin pages
 */
export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }
}
