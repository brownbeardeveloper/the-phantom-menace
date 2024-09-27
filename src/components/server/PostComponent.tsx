import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string;
        created_at: string;
    };
    createdByUser: {
        name: string;
        last_name: string;
    };
}

const PostComponent = ({ post, createdByUser }: PostProps) => {
    return (
        <Card key={post.id} className="mx-auto shadow-xl bg-white p-6 mb-6">
            {/* Display post title in the CardHeader */}
            <CardHeader>
                <h1 className="text-xl font-bold">{post.title}</h1>
            </CardHeader>
            <Divider className="my-4" />
            <CardBody>
                {post.content}
            </CardBody>
            <Divider className="my-4" />
            <CardFooter>
                Created: {post.created_at} by {createdByUser.name} {createdByUser.last_name}
            </CardFooter>
        </Card>
    );
};

export default PostComponent;
