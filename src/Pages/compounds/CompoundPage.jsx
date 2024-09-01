import { useParams } from "react-router-dom"
import Slider from "react-slick";
import img1 from "../.././assets/images/img/Rectangle 23.png"

const CompoundPage = () => {
    const {compoundId} = useParams()
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };
  return (
<div className=" flex flex-col  space-y-5"  >
  <div className=" w-full bg-neutral-800 h-52 " >
    {/* <img src={img1} className=" w-full h-20" alt="" /> */}
  </div>
<div className=" w-full flex justify-center" >
<div className="slider-container w-11/12">
      <Slider {...settings} className=" space-x-3">
        <div className=" px-2 w-10 flex justify-center  rounded-xl ">
          <img src={img1} width={200}  alt=""  />
        </div>
        <div className=" px-2 w-10 flex justify-center  rounded-xl " >
          <img src={img1} alt="" width={200} />
        </div>
        <div className=" px-2 w-10 flex justify-center  rounded-xl " >
          <img src={img1} alt="" width={200}  />
        </div>
        <div className=" px-2 w-10 flex justify-center  rounded-xl " >
          <img src={img1} alt="" width={200} />
        </div>
        <div className=" px-2 flex justify-center  w-10 rounded-xl "  >
          <img src={img1} alt="" width={200} />
        </div>
        <div className=" px-2 flex justify-center  w-10 rounded-xl "  >
          <img src={img1} alt="" width={200} />
        </div>
      </Slider>
    </div>
</div>
    <h2 className=" font-bold text-2xl" >Name</h2>
    <h2 className=" font-semibold text-teal-700 text-xl"> Start from 10000$ to 100000$ </h2>
    <h2 className=" font-medium text-xl"> Cairo </h2>
    <div className=" flex justify-start flex-col w-full">
      <h2 className="" >Description</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt atque beatae impedit facere, alias fuga cupiditate cum eaque modi repellat, in vitae laudantium quam, voluptates sit. Ducimus dignissimos itaque amet?
   Quidem incidunt fugiat repudiandae at similique tenetur dolorum, sequi eveniet neque expedita, minus ut eligendi perferendis, magni qui natus culpa exercitationem in. Saepe sit minima nulla esse? Soluta, itaque rem.</p>
    </div>
</div>
  )
}

export default CompoundPage