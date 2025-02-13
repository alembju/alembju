import React from 'react'
import Header from './Header'
import News from './News'
import Photo from './Photo'
import Footer from './Footer'
import DaSharing from './DaSharing'
import AboutUs from './AboutUs'
import Navbar from './Navbar'
import SideBar from './SideBar'
import ScrollToTop from './components/ScrollToTop'
import Aphrem from './Aphrem'



export default function HomePage() {
  return (
    <div><ScrollToTop />
      <div ><Header /></div><br></br>
      <div ><News /></div><br></br>
      <div ><Photo /></div><br></br>
      <div className='App3  p-5'><SideBar /></div><br></br>
      <div><Aphrem /></div>
      <div ><DaSharing /></div><br></br>
      <div ><AboutUs /></div><br></br>
     
      <div ><Footer /></div><br></br>
    </div>
  )
}
