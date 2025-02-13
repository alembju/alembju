import React from 'react'
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dowenload from './Dowenload.jsx'
import AEFI from './Disease/AEFI.jsx'
//import Upload from './Upload.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
//import DataSharing from './DataSharing.jsx'
import News from './News.jsx'
import Photo from './Photo.jsx'
import Upload from './Upload.jsx'
import HomePage from './HomePage.jsx'
import Aphrem from './Aphrem.jsx'
import TabsComponent from './TabsComponent.jsx'
import TabsPage from './TabsPage.jsx'
import NewsFeed from './NewsFeed.jsx'
import InsertImage from './InsertImage.jsx'
import ImageSlider from './ImageSlider'
import Navbar from './Navbar'
import Admini_page from './Admin_Component/Admini_page.jsx'


import Reportable_dease_report from './Reportable_dease_report.jsx'
import ResponsivPopup from './PopUp/ResponsivPopup.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      
    </BrowserRouter>
  </React.StrictMode>,

)
