import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GTAV from "../assets/GTAV.png";
import portal from "../assets/portal.png";
import tombRaider from "../assets/tombRaider.png";
import witcher from "../assets/witcher.png";

const ShelvesContent = () => {
  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="slider">
      <div>
        <img src={GTAV} className="sliderImage" />
      </div>
      <div>
        <img src={portal} className="sliderImage" />
      </div>
      <div>
        <img src={tombRaider} className="sliderImage" />
      </div>
      <div>
        <img src={witcher} className="sliderImage" />
      </div>
      <div>
        <img src={GTAV} className="sliderImage" />
      </div>
      <div>
        <img src={portal} className="sliderImage" />
      </div>
      <div>
        <img src={tombRaider} className="sliderImage" />
      </div>
      <div>
        <img src={witcher} className="sliderImage" />
      </div>
    </Slider>
  );
};

export default ShelvesContent;
