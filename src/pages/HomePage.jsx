import React,{ useState, useEffect} from "react";
import {getPost} from "@/apis/ApiPost.js";
import { Container, Typography, Card, CardContent, Button, Box } from "@mui/material";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const isLoggedIn = Boolean(localStorage.getItem("user"));

    useEffect(() => {
        getPost()
            .then(data => {
                // Nếu có interceptor trả về luôn data thì dùng data luôn, không cần data.data
                const filtered = !isLoggedIn
                    ? data.filter(post => post.visibility === "public")
                    : data;
                setPosts(filtered);
            })
            .catch(e => {
                setPosts([]);
            });
    }, [isLoggedIn]);

    return (
        <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                {!isLoggedIn && (
                    <>
                        <Button variant="outlined" sx={{ mr: 1 }}>Login</Button>
                        <Button variant="contained">Register</Button>
                    </>
                )}
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Danh sách bài viết {isLoggedIn ? "(Public & Private của bạn)" : "(Chỉ Public)"}
            </Typography>
            {posts.length === 0 && (
                <Typography>Chưa có bài viết nào hiển thị.</Typography>
            )}
            {posts.map(post => (
                <Card key={post.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                            Tác giả: {post.authorId} &nbsp;&nbsp;|&nbsp;&nbsp; {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">{post.content}</Typography>
                        <Typography sx={{ mt: 1 }} color="primary">
                            {post.visibility === "public" ? "Công khai" : "Riêng tư"}
                        </Typography>
                        <Box mt={2}>
                            <Typography variant="subtitle2">Bình luận:</Typography>
                            {post.comments && post.comments.length ? (
                                post.comments.map(c => (
                                    <Box key={c.id} ml={2} mb={1}>
                                        <Typography variant="body2">
                                            <b>{c.userId}:</b> {c.content}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary" ml={2}>
                                    Chưa có bình luận
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}