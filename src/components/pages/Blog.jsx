import { useEffect, useState } from 'react';
import axios from '../../data/axiosClient.js';
import Card from '../cards/Card';
import style from './Pages.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('/posts');
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (slug) => {
        try {
            await axios.delete(`/posts/${slug}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slug)); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        <div className={style.blogContainer}>
            <h1>Blog</h1>
            <div className={style.cardContainer}>
                {posts.map((post) => (
                    <Card key={post.id} post={post} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Blog;
