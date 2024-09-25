"use server";

import { encodedRedirect } from "../utils";
import { createClient } from "../server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const lastname = formData.get("lastname")?.toString();

    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email || !password || !name || !lastname) {
        return { error: "All fields are required: email, password, name, and lastname." };
    }

    // Auth registration
    const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (authError) {
        console.error(authError.code + " " + authError.message);
        return encodedRedirect("error", "/sign-up", authError.message);
    }

    const user = data?.user;

    // Ensure user was successfully created
    if (!user) {
        return encodedRedirect("error", "/sign-up", "Failed to create user.");
    }

    // Insert user information into 'users' table
    const { data: insertData, error: dbError } = await supabase
        .from('users')
        .insert([{
            user_uid: user.id, // Use the user id (auth uid)
            name: name,
            last_name: lastname,
            created_at: new Date(), // Use current timestamp
        }]);

    // console.log("Insert Data:", insertData);
    // console.log("Insert Error:", dbError);

    if (dbError) {
        console.error(dbError.code + " " + dbError.message);
        return encodedRedirect("error", "/sign-up", "Failed to store user information.");
    }

    return encodedRedirect(
        "success",
        "/sign-up",
        "Thanks for signing up! Please check your email for a verification link."
    );
};


export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Error: Failed to log in:", error.message);
        return encodedRedirect("error", "/", error.message);
    }

    console.log("Success: User logged in with email:", email);
    return encodedRedirect("success", "/home", ""); // Redirect with success parameter
};

export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect("error", "/forget", "Email is required");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/home/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/forget",
            "Could not reset password",
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        "/forget",
        "Check your email for a link to reset your password.",
    );
};

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/home/reset-password",
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/home/reset-password",
            "Passwords do not match",
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/home/reset-password",
            "Password update failed",
        );
    }

    encodedRedirect("success", "/home/reset-password", "Password updated");
};

export const signOutAction = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return encodedRedirect("success", "/", "");
};