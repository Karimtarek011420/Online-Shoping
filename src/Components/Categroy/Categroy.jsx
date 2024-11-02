import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categroy() {
    const [data, setData] = useState([]);
    
  async function ApiCategroy() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((params) => {
        console.log("karim",params.data.data);
        setData(params.data.data);
      })
      .catch((params) => {
        console.log(params);
      });
  }

  useEffect(() => {
    ApiCategroy();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div className=" my-10">
      <Slider {...settings} arrows={false}>
        {data?.map( (catgrpy) =>{ return <div key={catgrpy._id}>
            <img className=" w-full h-60" src={catgrpy.image} alt=""/>
            <h2 className=" text-center  my-6">{catgrpy.name}</h2> 
        </div> })}
     
      </Slider>
    </div>
  );
}
