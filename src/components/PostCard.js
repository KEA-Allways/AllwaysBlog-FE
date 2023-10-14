import Card from 'react-bootstrap/Card';

const PostCard = ({imgUrl, alt, imgHeight, title, subtitle, usericon, nickname}) => {

    return (
        <Card>
            <Card.Img variant="top" alt={alt} src={imgUrl} height={imgHeight} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{subtitle}</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <img src={usericon} alt="사용자아이콘" width="20px" height="20px" /> <small>by {nickname}</small>
            </Card.Footer>
        </Card>
    )
   
}

export default PostCard;