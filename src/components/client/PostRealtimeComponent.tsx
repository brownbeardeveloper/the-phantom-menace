"use client"; // Client-side component

import { useState, useEffect } from 'react';
import { createClient } from '../../services/supabase/client';
import PostComponent from '../server/PostComponent';

export default function PostRealtimeComponent({ initialPosts, initialUserMap }: { initialPosts: any[]; initialUserMap: { [key: string]: { name?: string; last_name?: string } | null } }) {
    const [posts, setPosts] = useState(initialPosts);
    const [userMap, setUserMap] = useState(initialUserMap); // Initialize with initialUserMap

    useEffect(() => {
        const supabase = createClient();

        // Function to fetch user details based on UIDs
        const fetchUserDetails = async (userUids: string[]) => {
            const { data: users, error } = await supabase
                .from('users')
                .select('user_uid, name, last_name')
                .in('user_uid', userUids);

            if (error) {
                console.error('Error fetching users:', error);
                return;
            }

            const userMapping = users.reduce((acc, user) => {
                acc[user.user_uid] = { name: user.name, last_name: user.last_name };
                return acc;
            }, {} as { [key: string]: { name?: string; last_name?: string } });

            setUserMap((prev) => ({ ...prev, ...userMapping }));
        };

        // Extract unique user_uids from initial posts
        const initialUserUids = Array.from(new Set(initialPosts.map(post => post.created_by)));
        fetchUserDetails(initialUserUids);

        // Subscribe to new posts being added in real-time
        const subscription = supabase
            .channel('public:post')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'post' },
                async (payload) => {
                    const newPost = payload.new;
                    setPosts((prevPosts) => [newPost, ...prevPosts]);

                    // Fetch user details for the new post
                    await fetchUserDetails([newPost.created_by]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [initialPosts]);

    return (
        <>
            {posts
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((post) => (
                    <PostComponent
                        key={post.id}
                        post={{
                            id: post.id,
                            title: post.title,
                            content: post.content,
                            created_at: post.created_at,
                            created_by: post.created_by,
                        }}
                        createdByUser={userMap[post.created_by] || null} // Use user_map to get user info
                    />
                ))}
        </>
    );
}
