import React,{ useState, useEffect} from "react";
import {getPost} from "@/apis/ApiPost.js";


export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPost()
            .then((response) => {
                setPosts(response); // Lấy data từ response trả về
            })
            .catch((error) => {
                console.error("Failed to fetch posts:", error);
            });
    }, []);
    return (
        <div>
            <h1>Homepage</h1>
            <ul>
                {posts && posts.length > 0 ? (
                    posts.map((post) => <li key={post.id}>{post.title}</li>)
                ) : (
                    <li>No posts available</li>
                )}
            </ul>
        </div>
    )
}