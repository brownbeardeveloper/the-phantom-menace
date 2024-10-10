import { createClient } from "../server";

export const getUserInfo = async () => {
    const supabase = createClient();

    // Get the currently logged-in user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.error('Error getting authenticated user:', authError.message);
        return null; // Handle error appropriately
    }

    // Ensure user is logged in
    if (!user) {
        return null; // User is not logged in
    }

    const userId = user.id; // Authenticated user's uid
    const email = user.email || "";

    // Fetch name and lastname from 'users' table where uid matches
    const { data, error: queryError } = await supabase
        .from('users')
        .select('name, last_name')
        .eq('user_uid', userId)
        .single(); // 'single()' ensures only one record is returned

    if (queryError) {
        console.error('Error fetching user info:', queryError.message);
        return null; // Handle error appropriately
    }

    return {
        uid: userId,
        ...data,
        email,
    }; // Return the user's name and lastname and email
};


export const getUserInfoById = async (userId: string) => {
    const supabase = createClient();

    // Fetch name and lastname from 'users' table where uid matches the provided userId
    const { data, error: queryError } = await supabase
        .from('users')
        .select('name, last_name')
        .eq('user_uid', userId)
        .single(); // 'single()' ensures only one record is returned

    if (queryError) {
        console.error('Error fetching user info:', queryError.message);
        return null; // Handle error appropriately
    }

    return data; // Return the user's name and last_name
};

