import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import GallaryNavbar from './GallaryNavbar'

function EventsGallary() {
    const[users, getUser] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/EVENTSGet')
        //.then(Response => Response.json())
        .then(users =>getUser(users.data)) 
        .catch(erer => console.log(erer))
        
      } , [])
  return (
    <><GallaryNavbar /><div className='row '>
          <form className='rounded-4'>
              <div className='mb-0'>
      
                  <table><br />
                      <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.map((filer, index) => {
                              return <tr key={index}>
                                 <th className='p-5 justify-content-left'> <tr className=''><h5>{filer.EVENTS1Date.slice(0, 10)}</h5><p className='rounded text-bgcoll p-4 align-items-center w-50 '><h5>{filer.EVENTS1}</h5></p></tr></th><br />
                                 <th className='p-5'> <tr className=''><h5>{filer.EVENTS2Date.slice(0, 10)}</h5><p className='rounded text-bgcoll p-4 align-items-center w-50'><h5>{filer.EVENTS2}</h5></p></tr></th><br />
                                 <th className='p-5'><tr className=''><h5>{filer.EVENTS3Date.slice(0, 10)}</h5><p className=' rounded text-bgcoll p-4 align-items-center w-50'><h5>{filer.EVENTS3}</h5></p></tr></th>

                              </tr>
                          })}
                      </tbody>
                  </table>
              </div>
          </form>
      </div><br /></>
  )
}

export default EventsGallary
