import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../data/axiosClient.js';
import style from './Pages.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/posts/${slug}`);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [slug]);

    const handleDelete = async (slug) => {
        const confirmed = window.confirm('Sei sicuro di voler cancellare questo post?');
        if (confirmed) {
            try {
                await axios.delete(`/posts/${slug}`);
                setPosts((prevPosts) => prevPosts.filter(post => post.slug !== slug));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.postContainer}>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} className={style.postImage} />
            <p>{post.content}</p>
            <p><strong>Categoria:</strong> {post.Categories?.name}</p>
            <div>
                <strong>Tags:</strong>
                <ul>
                    {post.tags.map((tag) => (
                        <li key={tag.id}>{tag.name}</li>
                    ))}
                </ul>
            </div>
            {user && (
                <>
                    <button className={style.edit}>
                        <FaEdit />
                    </button>
                    <button className={style.trash} onClick={handleDelete}>
                        <FaTrash />
                    </button>
                </>
            )}
        </div>
    );
};

export default Post;
