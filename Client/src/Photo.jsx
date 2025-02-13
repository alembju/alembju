import React from 'react'
import Alogo from './Image/Alogo.png'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
//import 'react-slideshow-image/dist/styles.css'
//import{ Fade, Zoom, Slide} from 'react-slideshow-image'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectFlip } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";
//import Slider from "./Slider";
//import { slidesData } from "./slidesData";



/*const SlideImages =[
  {
  url:'./Image/Alogo.png',
  caption:'ferst image'
},
   {url:'./Image/Alogo.png',
   caption:'seconed  image'
  },
   {url:'./Image/Alogo.png',
   caption:'thierd image'
  },
   {url:'./Image/Alogo.png',
   caption:'fourth image'
  }
]

const divStyle={
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:'400px',
  backgroundSize:'cover'
}

const spanStyle = {
  fontSize:'20px',
  background: '#efefef',
  color:"#000000"
}*/


const Photo = ({id}) => {
  //const{id} = useparams()
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState();
  const[imageid,setimageid] = useState()
  
 /* useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('/get-imageID/${id}', { responseType: 'blob' });
        setImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();

    // Cleanup function to revoke the object URL to avoid memory leaks
    return () => URL.revokeObjectURL(image);
  }, [id]);*/
  

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async (imageid) => {
    const result = await axios.get("http://localhost:3000/get-imageID ")
    console.log(result)
    setAllImage(result.data.data)
  };
//////////
const [banner, setBanner]= useState();

  useEffect( ()=>{
    const getbanner = async ()=>{
      const res= await fetch('http://localhost:3000/get-imageID');
      const getbanner= await res.json();
      //console.log(getbanner);
      setBanner(await getbanner);
    }
   getbanner();

  },[] );


  const handleClick=(i) =>{
    console.log(i)
    const Slider=imagedetails[0];
    setimageid(Slider);
  }
  //////////
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);


  return (
   // <><div className='d-flex bg-info  align-items-center vh-10 border w-10'>
     // <form className='border w-20 bg-primary rounded-1 text-decoration-none'>

        //<div className='pic3'>
         // <div className='pic3'><img src={Alogo} alt='' class="img-circle" width="33" height="30" /></div>
         // <div className='pic3'><img src={Facebbok} alt='' class="img-circle" width="33" height="30" /></div>
         // <div className='pic3'> <img src={Gmail} alt='' class="img-circle" width="33" height="30" /></div>
       // </div>

      //</form>
  
    //</div></>
    //<div>
      //<Fade>
       // {SlideImages.map((image,index) => (
        //  <div key={index}>
          //  <div style={{...divStyle, backgroundImage:`url(${image.url})`}}></div>
            //<span style={{spanStyle}}>{image.caption}</span>
          //</div>
       // ))}
      //</Fade>
    //</div>
    /////////////////////////////////////////
   /*<Swiper
      s  modules={[Navigation, Pagination, Scrollbar, A11y,EffectFlip]}
      spaceBetween={50}
      effect="Flip"
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      
    >
     
        <div >
      {allImage && 
        
         allImage?.map((data, index) => {
            return (
              <img   
              key={data._id}
              src={(`./src/images/${data.file}`)}
              onClick={()=>handleClick(index)}
                height={700}
                width={700}
                className="col img-thumbnail img-responsive mb-5"
              />
            );
          })}
          </div>

    </Swiper>*/
/////////////////////////////////////////////////////////
//<div className="App">
      //<Slider slides={slidesData} />
   // </div>
   //<div>
   //{image && <img src={image} alt="Image" />}
 //</div>
 
  
 <React.Fragment>
  
 <div id="carouselExampleControls" className="carousel slide justify-content-center align-items-center" data-bs-ride="carousel">
<div className="carousel-inner  p-2">
  
 
 { 
 allImage && 
        
 allImage?.map( (retbanner, index)=> {
   return(
 <div className={index===0 ? "carousel-item active ":"carousel-item"}  key={retbanner._id}>
    <img src={ `./src/images/${retbanner.pdf}`} className="d-block  img-responsive mb-5 " alt={retbanner.Title}
    height={500}
    width={1700}
    />
    <div class="carousel-caption d-none d-md-block bg-dark p-2 text-dark bg-opacity-50" >
        <h4 className='text-white'>{retbanner.Title}</h4>
        <h5><p className='text-white'>{retbanner.Description}</p></h5>
      </div>
  </div>  
   );
 }) 
}
  
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
</React.Fragment>

  )
}

export default Photo
