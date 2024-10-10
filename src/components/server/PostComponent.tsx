import { Card, CardHeader, CardBody, CardFooter, Divider, User } from "@nextui-org/react";

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string;
        created_at: string;
        created_by: string;
    };
    createdByUser: { name?: string; last_name?: string } | null; // Allow null here
}

const PostComponent = ({ post, createdByUser }: PostProps) => {
    return (
        <Card key={post.id} className="mx-auto shadow-xl bg-white p-6 mb-6" radius="none">
            {/* Display post title in the CardHeader */}
            <CardHeader>
                <User name={createdByUser ? `${createdByUser.name} ${createdByUser.last_name}` : post.created_by}></User>
                {/* <h1 className="text-xl font-bold">{post.title}</h1> */}
            </CardHeader>
            <Divider className="my-4" />
            <CardBody>
                <p>{post.content}</p>
            </CardBody>
            <Divider className="my-4" />
            <CardFooter className="flex justify-between">
                {/* Display user name and last name or fallback to UID if not found */}
                {/* <span>
                    {createdByUser ? `${createdByUser.name} ${createdByUser.last_name}` : post.created_by}
                </span> */}
                <span>Created at: {new Date(post.created_at).toLocaleDateString()}</span>
            </CardFooter>
        </Card>
    );
};

export default PostComponent;
