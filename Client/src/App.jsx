
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
//import Users from './Users'
//import CreateUser from './CreateUser'
//import UpdateUser from './UpdateUser'
import HomePage from './HomePage'
import Header from './Header'
import ContactUs from './ContactUs'
import Upload from './Upload'
import Dowenload from './Dowenload'
import Aphrem from './Aphrem'
import Chikungunya from './Disease/Chikungunya'
import AEFI from './Disease/AEFI'
import Acute from './Disease/Acute'
import Polio from './Disease/Polio'
import Anthrax from './Disease/Anthrax'
import Brucellosis from './Disease/Brucellosis'
import ChemicalP from './Disease/ChemicalP'
import Cholera from './Disease/Cholera'
import COVID from './Disease/COVID'
import Dengue from './Disease/Dengue '

import DiabeticM from './Disease/DiabeticM'
import DiarrheaU5 from './Disease/DiarrheaU5'
import Guineaworm from './Disease/Guineaworm'
import HIV from './Disease/HIV '
import HumanInfluenza from './Disease/HumanInfluenza '
import Hypertention from './Disease/Hypertention '
import Malaria from './Disease/Malaria'
import MAMU5C from './Disease/MAMU5C'
import Measles from './Disease/Measles'
import Meningits from './Disease/Meningits'
import Monkeypox from './Disease/Monkeypox '
import Fistula from './Disease/Fistula'
import Relapsing from './Disease/Relapsing'
import SAMU5 from './Disease/SAMU5'
import Rabies from './Disease/Rabies'
//import Rabies from './Disease/Rabies '
import RiftValleyFever from './Disease/RiftValleyFever'
import SARS from './Disease/SARS'
import Scabies from './Disease/Scabies'
import PhneumoniaU5 from './Disease/PhneumoniaU5'
import Tuberculosis from './Disease/Tuberculosis'
import YellowFever from './Disease/YellowFever'
import Tetanus from './Disease/Tetanus'
import Smallpox from './Disease/Smallpox'
import Dysenter from './Disease/Dysenter'
import Viralhemorrhagicfever from './Disease/Viralhemorrhagicfever'
import Proposal from './Proposal' 
import Reserch from './Reserch'

import Navbar from './Navbar'
import CollegRegistration from './CollegRegistration'
import CommentSec from './CommentSec'
import IRBUpload from './Admin_Component/IRBUpload'
import { SearchResult } from './SearchResult'
import { SearchResultsList } from './SearchResultsList'
import TabsComponent from './TabsComponent'
import TabsPage from './TabsPage'
import NewsFeed from './NewsFeed'
import News from './News'
import AboutUs from './AboutUs'
import InsertImage from './InsertImage'
import Photo from './Photo'
import SideBar from './SideBar'

import Table from './Table'
import PrenatalDeath from './Disease/PrenatalDeath'
import ReportGenerated from './ReportGenerated'
import Navebar from './Admin_Component/Navebar'
import Admini_page from './Admin_Component/Admini_page'
import Home from './Admin_Component/Home'
import Reportable_dease_report from './Reportable_dease_report'
import Insert_Reportable_Deases from './Insert_Reportable_Deases'
import SlidesData from './SlidesData'
import DashbordSelection from './Admin_Component/DashbordSelection'
import ReviewReserchPaper from './ReviewReserchPaper'
import ReportableDeasesHompage from './ReportableDeasesHompage'
import ReportableDeasesGroup from './Disease/ReportableDeasesGroup'
import RequestList from './RequestList'
import FacilityInfo from './FacilityInfo'
import DowenloadReview from './DowenloadReview'
import MaternalDeath from './Disease/MaternalDeath'
import MeselesReport from './Disease-Report/MeselesReport'
import ReportableDeases_Dashbored from './ReportableDeases_Dashbored'
import Reportable_dease_reportGroup from './Reportable_dease_reportGroup'
import Acute_Report from './Disease-Report/Acute_Report'
import AEFI_Report from './Disease-Report/AEFI_Report'
import Anthrax_Report from './Disease-Report/Anthrax_Report'
import Brucellosis_Report from './Disease-Report/Brucellosis_Report'
import ChemicalP_Report from './Disease-Report/ChemicalP_Report'
import Chikungunya_Report from './Disease-Report/Chikungunya_Report'
import Cholera_Report from './Disease-Report/Cholera_Report'
import COVID_Report from './Disease-Report/COVID_Report'
import Dengue_Report from './Disease-Report/Dengue_Report '
import DiabeticM_Report from './Disease-Report/DiabeticM_Report'
import DiarrheaU5_Report from './Disease-Report/DiarrheaU5_Report'
import Dysenter_Report from './Disease-Report/Dysenter_Report'
import Fistula_Report from './Disease-Report/Fistula_Report'
import Guineaworm_Report from './Disease-Report/Guineaworm_Report'
import HIV_Report from './Disease-Report/HIV_Report '
import HumanInfluenza_Report from './Disease-Report/HumanInfluenza_Report '
import Hypertention_Report from './Disease-Report/Hypertention_Report '
import Malaria_Report from './Disease-Report/Malaria_Report'
import MAMU5C_Report from './Disease-Report/MAMU5C_Report'
import MaternalDeath_Report from './Disease-Report/MaternalDeath_Report'
import Meningits_Report from './Disease-Report/Meningits_Report'
import Monkeypox_Report from './Disease-Report/Monkeypox_Report'
import PhneumoniaU5_Report from './Disease-Report/PhneumoniaU5_Report'
import Polio_Report from './Disease-Report/Polio_Report'
import PrenatalDeath_Report from './Disease-Report/PrenatalDeath_Report'
import Rabies_Report from './Disease-Report/Rabies_Report'
import Relapsing_Report from './Disease-Report/Relapsing_Report'
import RiftValleyFever_Report from './Disease-Report/RiftValleyFever_Report'
import SAMU5_Report from './Disease-Report/SAMU5_Report'
import SARS_Report from './Disease-Report/SARS_Report'
import Scabies_Report from './Disease-Report/Scabies_Report'
import Smallpox_Report from './Disease-Report/Smallpox_Report'
import Tetanus_Report from './Disease-Report/Tetanus_Report'
import Tuberculosis_Report from './Disease-Report/Tuberculosis_Report'
import Viralhemorrhagicfever_Report from './Disease-Report/Viralhemorrhagicfever_Report'
import YellowFever_Report from './Disease-Report/YellowFever_Report'
import Weekly_Reporting_Format from './Disease-Report/Weekly_Reporting_Format'

import DataCollectionP from './DataCollectionP'

import Missing from './Missing'
import Gallary from './Gallary'
import EventsGallary from './EventsGallary'
import VidioGallary from './VidioGallary'
import Login from './Login_component'
import SignUp from './Signup_component'
import UserDetails from './UserDetails'
import AdminHome from './adminHome'
import ProtectedRoute from './ProtectedRoute'
import SideAdminbar from './Admin_Component/SideAdminbar'
import Campain from './Campain'
import StudentReserc from './StudentReserc'
import IRBAccount from './IRBAccount'
import Student from './Student'
import Unauthorized from './Unauthorized'
import Layout from './Layout'
import Update from './Update'

/*const userType = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
   <Route path='/' element={isLoggedIn == "true" ? <UserDetails /> : <Login/>} />
    
}
*/

function App() {
  const [count, setCount] = useState(0)
  const [results, setResults] = useState([]);
  const[clicked,isClicked] = useState(false)
  const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.localStorage.getItem("userType");
  return (
    
    <div>
   
    <Routes>
    
     
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/Gallary' element={<Gallary />}></Route>
      <Route path='/HomePage' element={<HomePage />}></Route>
      <Route path='/VidioGallary' element={<VidioGallary />}></Route>
      <Route path='/EventsGallary' element={<EventsGallary />}></Route>
      <Route path='/ContactUs' element={<ContactUs />}></Route>
      <Route path='/Upload' element={<Upload />}></Route>
      <Route path='/Dowenload' element={<Dowenload />}></Route>
      <Route path='/Reserch' element={<Reserch />}></Route>
      <Route path='/TabsPage' element={<TabsPage />}></Route>
      
      <Route path='/Campain' element={<Campain />} />
      <Route path='/Sighnup' element={<Student/>}/>

       {/* Sighenup for Admin */}
      <Route path='/register' element={<SignUp />} />
       {/* Login for Admin */}
      <Route path='/Login' element={<Login />} />
       {/* Login for IRB
      <Route path='/LoginAsIRB' element ={<LoginAsIRB />}></Route>
      {/*Login for IRB */}
      {/* <Route path='/SighenupAsIRB' element={<SighenupAsIRB />}/> */} 

       <Route path='/ReportableDeases_Dashbored' element={<ReportableDeases_Dashbored />}></Route>
       <Route path='/DataCollectionP' element={<DataCollectionP />}></Route>
       <Route path='/ReportableDeasesHompage' element={<ReportableDeasesHompage />}/>
       {/* this is the admin pages that is going to be visible */}
       <Route path='/Reportable_dease_report' element={<Reportable_dease_report />} />
       <Route path='/RequestList' element={<RequestList />} /> 
       <Route path='/InsertImage' element={<InsertImage />} />
       <Route path='/NewsFeed' element={<NewsFeed />} />  
       <Route path='/Insert_Reportable_Deases' element={<Insert_Reportable_Deases />} />
       <Route path='/FacilityInfo' element={<FacilityInfo />}/>

       {!isLoggedIn && (
            <>
             <Route path="/Login" element={<Login />} />
             <Route path="/register" element={<SignUp />} />
            </>
          )}


        {/* ProtectedRoutes */}
        <Route element={<ProtectedRoute />}>
                <Route path="/Login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="/" element={<Login />} />
             {userType == "Owener" ? (
                <>
              { /*Owener*/}
           
      <Route path="/Adminipage" element={<Admini_page />} />
      
      
      
     
      <Route path='/Home' element={<Home />}></Route>
      <Route path='/Proposal' element={<Proposal />}></Route>
      
      
      <Route path='/StudentReserc' element={<StudentReserc />}/>
     
     <Route path='/CollegRegistration' element={<CollegRegistration />}/>
     <Route path='/CommentSec' element={<CommentSec />}/>
     
     </>
              ) :userType == "Admin" ? (
                <>
                { /*Admin*/}
               
    
       
     
     <Route path='/Home' element={<Home />}></Route>
     <Route path='/Proposal' element={<Proposal />}></Route>
     
             </>
              ) :userType == "IRB" ? (
                <>
     { /*Colledge IRB */}
     {/* <Route path='/IRBUpload' element={<IRBUpload />} /> */}
     <Route path='/StudentReserc' element={<StudentReserc />}/>
     <Route path='/IRBUpload' element={<IRBUpload />} />
     <Route path='/CollegRegistration' element={<CollegRegistration />}/>
               </>
              ) :userType == "Reserch" ? (
                <>

     { /*Reserch Unit Resercher*/}
     <Route path='/CommentSec' element={<CommentSec />}/>

               </>
              ) :userType == "RegionalPhem" ? (
                <>


     { /*Regional Eoce Officers
     <Route path="/Adminipage" element={<Admini_page />} />
     <Route path='/Reportable_dease_report' element={<Reportable_dease_report />} />
     <Route path='/ReportableDeasesHompage' element={<ReportableDeasesHompage />}/>*/}
         { /*Subcity Phem Officer & Regional Eoce Officers*/}
     <Route path="/Adminipage" element={<Admini_page />} />
     
     {/* //<Route path='ReportableDeasesHompage' element={<ReportableDeasesHompage />} /> */}
     
      </>
              ) :userType == "HFPhem" ? (
                <>
                { /*Health facility phem officer*/}
                
                {/* <Route path='ReportableDeasesHompage' element={<ReportableDeasesHompage />} /> */}
                
            </>
                ):(<></>)
              }
        </Route>
        
        <Route path='/UserDetails' element={<UserDetails />} />
        <Route path='/News/:id' element={<News/>}/>
        <Route path='/AdminHome' element={<AdminHome />} />
        <Route path='/SlidesData' element= {<SlidesData />}></Route>

        <Route path='/MaternalDeath' element={<MaternalDeath />}></Route>
        
        <Route path='ReportableDeasesGroup' element={<ReportableDeasesGroup />}></Route>
        <Route path='/edit/:id' element={<ReviewReserchPaper />}></Route>
        <Route path='/Update/:id' element={<Update />}></Route>
        <Route path='/DowenloadView/:id' element={<DowenloadReview />}></Route>
        <Route path='./DashbordSelection' element={<DashbordSelection /> }></Route>
        <Route path='/Navebar' element={<Navebar />}></Route>
        <Route path='/ReportGenerated' element={<ReportGenerated />}></Route>
        <Route path='/SideBar' element={<SideBar />}></Route>
        <Route path='/Table' element={<Table />}></Route>
        <Route path='/Photo' element={<Photo />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/SearchResultsList' element={<SearchResultsList />}></Route>
        <Route path='/Header' element={<Header />} ></Route>{results && results.length > 0 && <SearchResultsList results={results} />}
        <Route path='/SearchResult' element={<SearchResult />}></Route>
        <Route path='/TabsComponent' element={<TabsComponent />}></Route>
        <Route path='/Navbar' element={<Navbar />}></Route>
        <Route path='/Acute_Report' element={<Acute_Report />}></Route>
        <Route path='/MeselesReport' element={<MeselesReport />}></Route>
        <Route path='/AEFI_Report' element={<AEFI_Report />}></Route>
        <Route path='/Anthrax_Report' element={<Anthrax_Report />}></Route>
        <Route path='/Brucellosis_Report' element={<Brucellosis_Report />}></Route>
        <Route path='/ChemicalP_Report' element={<ChemicalP_Report/>}></Route>
        <Route path='/Chikungunya_Report' element={<Chikungunya_Report />}></Route>
        <Route path='/Cholera_Report' element={<Cholera_Report />}></Route>
        <Route path='/COVID_Report' element={<COVID_Report />}></Route>
        <Route path='/Dengue_Report ' element={<Dengue_Report  />}></Route>
        <Route path='/DiabeticM_Report' element={<DiabeticM_Report />}></Route>
        <Route path='/DiarrheaU5_Report' element={<DiarrheaU5_Report />}></Route>
        <Route path='/Dysenter_Report' element={<Dysenter_Report />}></Route>
        <Route path='/Fistula_Report' element={<Fistula_Report />}></Route>
        <Route path='/Guineaworm_Report' element={<Guineaworm_Report />}></Route>
        <Route path='/HIV_Report ' element={<HIV_Report  />}></Route>
        <Route path='/HumanInfluenza_Report ' element= {<HumanInfluenza_Report  />}></Route>
        <Route path='/Hypertention_Report ' element={<Hypertention_Report  />}></Route>
        <Route path='/Malaria_Report' element={<Malaria_Report />}></Route>
        <Route path='/MAMU5C_Report' element={<MAMU5C_Report /> }></Route>
        <Route path='/MaternalDeath_Report' element={<MaternalDeath_Report />}></Route>
        <Route path='/Meningits_Report' element={<Meningits_Report />}></Route>
        <Route path='/Monkeypox_Report' element={<Monkeypox_Report />}></Route>
        <Route path='/PhneumoniaU5_Report' element={<PhneumoniaU5_Report />}></Route>
        <Route path='/Polio_Report' element={<Polio_Report />}></Route>
        <Route path='/PrenatalDeath_Report' element={<PrenatalDeath_Report />}></Route>
        <Route path='/Rabies_Report' element={<Rabies_Report />}></Route>
        <Route path='/Relapsing_Report' element={<Relapsing_Report />}></Route>
        <Route path='/RiftValleyFever_Report' element={<RiftValleyFever_Report />}></Route>
        <Route path='/SAMU5_Report' element={<SAMU5_Report />}></Route>
        <Route path='/SARS_Report' element={<SARS_Report />}></Route>
        <Route path='/Scabies_Report' element={<Scabies_Report />} ></Route>{results && results.length > 0 && <SearchResultsList results={results} />}
        <Route path='/Smallpox_Report' element={<Smallpox_Report />}></Route>
        <Route path='/Tetanus_Report' element={<Tetanus_Report />}></Route>
        <Route path='/TabsComponent' element={<TabsComponent />}></Route>
        <Route path='/Tuberculosis_Report' element={<Tuberculosis_Report />}></Route>
        <Route path='/Weekly_Reporting_Format' element={<Weekly_Reporting_Format />}></Route>
        <Route path='/Viralhemorrhagicfever_Report' element={<Viralhemorrhagicfever_Report />}></Route>
        <Route path='/YellowFever_Report' element={<YellowFever_Report/>} ></Route>
        <Route path='/Aphrem' element={<Aphrem />}></Route>
        <Route path='/Chikungunya' element={<Chikungunya />} />
        <Route path='/Acute' element={<Acute />} />
        <Route path='/AEFI' element={<AEFI />} />
        <Route path='/Polio' element={<Polio />} />
        <Route path='/Anthrax' element={<Anthrax />} />
        <Route path='/Brucellosis' element={<Brucellosis />} />
        <Route path='/ChemicalP' element={<ChemicalP />} />
        <Route path='/Cholera' element={<Cholera />} />
        <Route path='/COVID' element={<COVID />} />
        <Route path='/PrenatalDeath' element={<PrenatalDeath/>} />
        <Route path='/Dengue' element={<Dengue />} />
        <Route path='/DiabeticM' element={<DiabeticM />} />
        <Route path='/Dysenter' element={<Dysenter />} />
        <Route path='/DiarrheaU5' element={<DiarrheaU5 />} />
        <Route path='/Guineaworm' element={<Guineaworm />} />
        <Route path='/HIV' element={<HIV />} />
        <Route path='/HumanInfluenza' element={<HumanInfluenza />} />
        <Route path='/Hypertention' element={<Hypertention />} />
        <Route path='/Malaria' element={<Malaria />} />
        <Route path='/MAMU5C' element={<MAMU5C />} />
        <Route path='/Measles' element={<Measles />} />
        <Route path='/Meningits' element={<Meningits />} />
        <Route path='/Monkeypox' element={<Monkeypox />} />
        <Route path='/Tetanus' element={<Tetanus />} />
        <Route path='/Fistula' element={<Fistula />} />
        <Route path='/Rabies' element={<Rabies />} />
        <Route path='/Relapsing' element={<Relapsing />} />
        <Route path='/RiftValleyFever' element={<RiftValleyFever />} />
        <Route path='/SAMU5' element={<SAMU5 />} />
        <Route path='/SARS' element={<SARS />} />
        <Route path='/Scabies' element={<Scabies />} />
        <Route path='/PhneumoniaU5' element={<PhneumoniaU5 />} />
        <Route path='/Tetanus' element={<Tetanus />} />
        <Route path='/Smallpox' element={<Smallpox />} />
        <Route path='/Tuberculosis' element={<Tuberculosis />} />
        <Route path='/Viralhemorrhagicfever' element={<Viralhemorrhagicfever />} />
        <Route path='/YellowFever' element={<YellowFever />} />
    
    
      {/* catch all 
       <Route path="/" element={<Login />} />*/}
      <Route path="*" element={<Unauthorized />} />
    
    </Routes>

    </div>


  )
}

export default App


