import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './BannerImage';

function Banner() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" imageUrl="/img/banner4.png"/>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" imageUrl="/img/banner2.webp"/>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" imageUrl="/img/banner3.jpg"/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;