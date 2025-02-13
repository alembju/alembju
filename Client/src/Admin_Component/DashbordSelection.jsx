import React ,{useState } from 'react'
import Home from './Home'
import IRBUpload from './IRBUpload'
import InsertImage from '../InsertImage'
import NewsFeed from '../NewsFeed'
import Insert_Reportable_Deases from '../Insert_Reportable_Deases'
import Reportable_dease_report from '../Reportable_dease_report'

function DashbordSelection() {
    const [selected,setSelected]=useState('Home')

    const handleChange=(e)=>{
        console.log(e.target.value)
        setSelected(e.target.value)
    }
  return (
    <div className='main-container '>
            <select className="Space rounded-2 w-25 p-2"  value={selected} onChange={(e)=>handleChange(e)}>
                <option>Home</option>
                <option>IRBUpload</option>
                <option>InsertImage</option>
                <option>NewsFeed</option>
                <option>InsertImage</option>
                <option>Insert_Reportable_Deases</option>
                <option>Third Componant</option>
                <option>Reportable_dease_report</option>
               
                <option>SignUp</option>
               
            </select>
            {selected == "Home"?<Home/>:"" }
            {selected == "IRBUpload"?<IRBUpload/>:"" }
            {selected == "InsertImage"?<InsertImage/>:"" }
            {selected == "NewsFeed"? <NewsFeed/>:"" }
            
            {selected == "Insert_Reportable_Deases"?<Insert_Reportable_Deases/>:"" }
           
            {selected == "Reportable_dease_report"?<Reportable_dease_report/>:"" }
            
            
           
        </div>
  )
}

export default DashbordSelection