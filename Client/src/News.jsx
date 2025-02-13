import React, { useState } from 'react';
import './App.css'
import axios from 'axios';
import NewsFeed from './NewsFeed';
import { useEffect } from 'react'
const News = (props) => {
  const[users, getUser] = useState([])
 // const words=[
   // {id:0,value:"Apple"},
   // {id:1,value:"Mango"},
   // {id:2,value:"Banana"},
   // {id:3,value:"Banana1"},
   // {id:4,value:"Banana2"},
 // ];
 // const [wordData,setWordData]=useState(words[0].value)
 // const handleClick=(index)=>{
  //  console.log(index)
  //  const wordSlider=words[index].value;
   // setWordData(wordSlider)
  //}
  //const getData =(data) =>{
   // alert("coming from appjs", data)
 // }
 useEffect(() => {
  axios.get('http://localhost:3000/NewsHeadline')
  //.then(Response => Response.json())
  .then(users =>getUser(users.data)) 
  .catch(erer => console.log(erer))
  
} , [])



  return (
   // <div className="main">
     // <div>" {wordData} "</div>
     // <div className='flex_row'>
      //  {words.map((data,i)=>
       //   <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
      //  )}
      //</div>
   // </div>
 <div class="news-container">
        <div class="title">
            Health Information
        </div>

        <ul>
        <li>
            {users.map((filer, index) => {
                return <li key={index}>
                 <li> {filer.News1}</li>
                 </li>
            })
          }
            </li>
            <li>
            {users.map((filer, index) => {
                return <li key={index}>
                 <li> {filer.News2}</li>
                 </li>
            })
          }
            </li>
            <li>
            {users.map((filer, index) => {
                return <li key={index}>
                 <li> {filer.News3}</li>
                 </li>
            })
          }
            </li>
        </ul>
            
    </div>
  );
}

export default News;