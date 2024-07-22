import React from 'react';
import './index.css'
import './Styles/App.css'
import './Styles/Sports.css'
import './Styles/Women.css'
import './Styles/Login.css'
import './Styles/Men.css'
import './Styles/Kid.css'
import './Styles/HomepageCarousel.css';
import './Styles/Register.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header (2)";
import Carousel from './components/Carousel2';
import Footer from './components/Footer';  // Import Footer component

const App = () => {
  const navigate = useNavigate();

  const relatedItems = [
    {
      image: 'https://contents.mediadecathlon.com/s1045477/k$2b757dc2a5f85e6057b8db1abe662cbe/Frame%20427321149.png?format=auto&quality=70&f=768x0',
      title: 'Men',
      route: '/men',
    },
    {
      image: 'https://contents.mediadecathlon.com/s1045475/k$12b5f8f2f6313a7d989942235a99d296/Frame%20427321150.png?format=auto&quality=70&f=768x0',
      title: 'Women',
      route: '/women',
    },
    {
      image: 'https://contents.mediadecathlon.com/s1068853/k$00d8091e4ca10180ad0fb81f6c1999f1/defaut.jpg?format=auto&quality=70&f=768x0',
      title: 'Kids',
      route: '/kid',
    },
    {
      image: 'https://contents.mediadecathlon.com/s1085351/k$f9284d9246d939697d0091461278fe9d/defaut.jpg?format=auto&quality=70&f=768x0',
      title: 'Sports Equipment',
      route: '/sport',
    },
    {
      image: 'https://contents.mediadecathlon.com/s1068852/k$308f24b6c873ff455e975ee52622fc8e/defaut.gif?format=auto&quality=70&f=768x0',
      title: 'Summer Collection',
      route: '/summer',
    },
    {
      image: 'https://contents.mediadecathlon.com/s1045469/k$8bc888972b89e13df47a82b55c563868/Frame%20427321093.png?format=auto&quality=70&f=768x0',
      title: 'Sale',
      route: '/sale',
    },
  ];

  const handleItemClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <div>
        <Header />
        <Carousel />
        <div className="related-items-container">
          {relatedItems.map((item, index) => (
            <div key={index} className="related-item" onClick={() => handleItemClick(item.route)}>
              <img src={item.image} alt={item.title} className="related-item-image" />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
        <Footer />  {/* Include Footer */}
      </div>
    </>
  );
}

export default App;
