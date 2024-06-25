import React from 'react';
import cardStyle from "./Card.module.css";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../../data/axiosClient';

const CardText = ({ title, content, slug, onDelete }) => {
    const handleDelete = async () => {
        try {
            await onDelete(slug); 
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <h4 className={cardStyle.title}><strong>{title}</strong></h4>
            <p className={cardStyle.text}>{content}</p>
            <Link to={`/post/${slug}`} className={cardStyle.button}>Leggi di più</Link>
            <button className={cardStyle.edit}>
                <FaEdit />
            </button>
            <button className={cardStyle.trash} onClick={handleDelete}>
                <FaTrash />
            </button>
        </div>
    );
}

export default CardText;
