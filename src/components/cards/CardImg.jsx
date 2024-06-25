 import cardStyle from'./Card.module.css';
const CardImg = ({imageUrl}) => {
    return (
        <figure className={cardStyle.imgContain}>
            <img src={imageUrl} alt="Post image" />      
        </figure>
    );
}

export default CardImg;