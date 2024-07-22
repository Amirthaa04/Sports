import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './Carousel.css'; // Make sure to import the CSS file

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const Carousel = () => {
  const navigate = useNavigate();

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselItems = [
    {
      image: 'https://contents.mediadecathlon.com/s1070648/k$391c0c3a7072416f02896d876ce5b74e/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/men'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1070633/k$3e193f7f0b06f2eb562b4841138a2d5c/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/women'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1084396/k$bf4b732c45bf864ee1e741ef291d88d1/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/sport'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1091251/k$06cf0393338ce395d8f357107f8be4db/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/kid'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1070624/k$89991512c943d47077f6bc0db8e1b6d9/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/women'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1072095/k$f9c1db76ad3f481f2db1dc0ca09e2ff7/defaut.jpg?format=auto&quality=70&f=2520x0',
      route: '/sport'
    },
    {
      image: 'https://contents.mediadecathlon.com/s1078182/k$b27599096da1308c0addd5528a684914/defaut.gif?format=auto&quality=70&f=2520x0'
    },
  ];

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel-item">
            <button onClick={() => handleClick(item.route)}>
              <img src={item.image} alt={`Carousel Item ${index}`} className="carousel-image" />
            </button>
          </div>
        ))}
      </Slider>
      
    </div>
  );
};

export default Carousel;
