import { useState } from 'react';
import style from './Pages.module.css';
import Form from '../form/Form.jsx';

const Home = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [posts, setPosts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');  

    const handleAddArticle = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setShowCreateForm(false);
        setSuccessMessage('Post creato con successo!');  
        setTimeout(() => {
            setSuccessMessage('');  
        }, 3000);
    };

    return (
        <div className={style.homeContainer}>
            <h1>Home Page</h1>
            <h4>Qui puoi creare i tuoi post</h4>
            {successMessage && <p className={style.successMessage}>{successMessage}</p>}  
            <div style={{ padding: '1rem' }}>
                <button onClick={() => setShowCreateForm((curr) => !curr)}>
                    {showCreateForm ? 'Annulla' : 'Crea post'}
                </button>
            </div>
            {showCreateForm && 
                <Form onAddArticle={handleAddArticle} />
            }
        </div>
    );
};

export default Home;
