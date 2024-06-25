import { useState, useEffect } from 'react';
import axios from '../../data/axiosClient.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './Form.css';

const Form = ({ onAddArticle }) => {
  const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        category: '',
        tags: [],
        published: false
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/category`);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchTags = async () => {
            try {
                const { data } = await axios.get(`/tag`);
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchCategories();
        fetchTags();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'published') {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: checked
                }));
            } else {
                const newTags = checked
                    ? [...formData.tags, parseInt(value)]
                    : formData.tags.filter((tag) => tag !== parseInt(value));
                setFormData((prevData) => ({
                    ...prevData,
                    tags: newTags
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title.trim().length === 0) {
            return;
        }

        try {
            const response = await axios.post(`/posts`, {
                title: formData.title,
                image: formData.image,
                content: formData.content,
                published: formData.published,
                categoriesId: parseInt(formData.category), 
                tagsId: formData.tags.map(tag => parseInt(tag)),
            });

            onAddArticle(response.data);  // Chiama correttamente onAddArticle
            setFormData({
                title: '',
                image: '',
                content: '',
                category: '',
                tags: [],
                published: false
            });
        } catch (error) {
            console.error('Error creating article:', error.response ? error.response.data : error);
        }
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Titolo del blog"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="URL dell'immagine"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Contenuto del blog"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group checkbox-group">
          <p>Tags:</p>
          {tags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                name="tags"
                value={tag.id}
                checked={formData.tags.includes(tag.id)}
                onChange={handleChange}
              />
              {tag.name}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            Pubblicato
          </label>
        </div>
        <button disabled={formData.title.trim().length === 0}>Salva</button>
      </form>
    </div>
  );
}

export default Form;
