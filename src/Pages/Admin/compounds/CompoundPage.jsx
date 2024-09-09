import { useParams } from "react-router-dom";
import Slider from "react-slick";
import img1 from "../.././assets/images/img/Rectangle 23.png";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Spinner } from "@chakra-ui/react";
import { Image } from "antd";

const CompoundPage = () => {
  const [compound, setCompound] = useState({});
  const { compoundId } = useParams();
  const getCompoundById = async (id) => {
    try {
      let { data } = await api.get(`/compounds/${id}`);
      setCompound(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompoundById(compoundId);
  }, []);
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 1000,
    lazyLoad: true,
    centerPadding: "60px",
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  if (!compound?.name_en)
    return (
      <div className=" flex justify-center h-full items-center">
        <Spinner />
      </div>
    );

  return (
    <div className=" flex flex-col  space-y-5">
      <div className=" w-full bg-neutral-800 h-60 bg-cover">
        <img src={compound?.image} className=" w-full h-60" alt="" />
      </div>
      <div className=" w-full flex justify-center">
        <div className="slider-container w-11/12 ">
        {!!compound?.images.length&&
                <Slider {...settings} className=" space-x-3">
                {compound?.images.map((img)=>(
                <div key={img.id} className=" px-2 w-10  rounded-xl bg-contain ">
                  <Image width={150} src={img.image} />
                </div>
               ))}
              </Slider>
        }
  
        </div>
      </div>
      <h2 className=" font-bold text-xl uppercase">{compound?.name_en}</h2>
      <h2 className=" font-semibold text-teal-700 text-2xl">
        {" "}
        <span className=" text-black">Start from </span> {compound?.price_min}${" "}
        <span className=" text-black">to </span>
        {compound?.price_max}$
      </h2>
      <h2 className=" font-semibold text-xl">{compound?.address_en} </h2>
      <div className=" flex justify-start flex-col w-full">
        <h2 className="font-semibold text-xl">Description :</h2>
        <p>{compound?.description_en}</p>
      </div>
    </div>
  );
};

export default CompoundPage;
