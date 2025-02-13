import React, { useState } from 'react'
import ReportableDeasesGroup from './Disease/ReportableDeasesGroup'
import Acute from './Disease/Acute'
import AEFI from './Disease/AEFI'
import Polio from './Disease/Polio'

import Anthrax from './Disease/Anthrax'

import ChemicalP from './Disease/ChemicalP'
import Chikungunya from './Disease/Chikungunya'
import Cholera from './Disease/Cholera'
import COVID from './Disease/COVID'
import PrenatalDeath from './Disease/PrenatalDeath'
import Dengue from './Disease/Dengue '
import DiabeticM from './Disease/DiabeticM'
import DiarrheaU5 from './Disease/DiarrheaU5'
import Guineaworm from './Disease/Guineaworm'
import Dysenter from './Disease/Dysenter'
import HIV from './Disease/HIV '
import HumanInfluenza from './Disease/HumanInfluenza '
import Hypertention from './Disease/Hypertention '
import Malaria from './Disease/Malaria'
import MAMU5C from './Disease/MAMU5C'
import Brucellosis from './Disease/Brucellosis'
import Measles from './Disease/Measles'
import Meningits from './Disease/Meningits'
import Monkeypox from './Disease/Monkeypox '
import Tetanus from './Disease/Tetanus'
import Fistula from './Disease/Fistula'
import Rabies from './Disease/Rabies'
import Relapsing from './Disease/Relapsing'
import RiftValleyFever from './Disease/RiftValleyFever'
import SAMU5 from './Disease/SAMU5'
import SARS from './Disease/SARS'
import Scabies from './Disease/Scabies'
import PhneumoniaU5 from './Disease/PhneumoniaU5'
import Smallpox from './Disease/Smallpox'
import Tuberculosis from './Disease/Tuberculosis'
import Viralhemorrhagicfever from './Disease/Viralhemorrhagicfever'
import YellowFever from './Disease/YellowFever'
import Navebar from './Admin_Component/Navebar'
import MaternalDeath from './Disease/MaternalDeath'
import Campain from './Campain'




const RepDeses =[
    "Cholera", "Measles", "Maternal death", "PrenatalDeath", "AEFI", "Meningits","Obstetric fistula" , "Relapsing fever","Yellow fever"  ,
    "AFP(Polio)", "Malaria", "Rabies", "Dracunculiasis-Guinea worm" , "Dysenter", "HIV new", "Human influenza caused by new subtype", "Hypertention new","Diabetic Mellitus new" ,
    "MAM_U5C", "Brucellosis","ChemicalP" , "Chikungunya" , "Monkeypox virus", "Neonatal Tetanus", "Acute jaundice syndrome within fourtthen days of illness","Diarrhea with dehydration_U5" , "COVID",
    "Rift Valley Fever", "SAM_U5", "SARS", "Scabies" , "Sever pneumonia in children U5", "Small pox", "Tuberculosis new", "Viral hemorrhagic fever", "Anthrax","Dengue fever","Reportable Deases Campain"
]
const RenderRepDeases = ({index}) => {
    switch (index) {
        case 0: return <Cholera />
        break;
        case 1: return <Measles />
        break;
        case 2: return <MaternalDeath />
        break;
        case 3: return <PrenatalDeath />
        break;
        case 4: return <AEFI />
        break;
        case 5: return <Meningits />
        break;
        case 6: return <Fistula />
        break;
        case 7: return  <Relapsing />
        break;
        case 8: return  <YellowFever />
        break;
        case 9: return <Polio />
        break;
        case 10: return <Malaria />
        break;
        case 11: return <Rabies />
        break;
        case 12: return <Guineaworm />
        break;
        case 13: return <Dysenter />
        break;
        case 14: return <HIV />
        break;
        case 15: return <HumanInfluenza />
        break;
        case 16: return <Hypertention />
        break;
        case 17: return <DiabeticM />
        break;
        case 18: return <MAMU5C />
        break;
        case 19: return <Brucellosis />
        break;
        case 20: return <ChemicalP />
        break;
        case 21: return <Chikungunya />
        break;
        case 22: return <Monkeypox />
        break;
        case 23: return <Tetanus />
        break;
        case 24: return <Acute />
        break;
        case 25: return <DiarrheaU5 />
        break;
        case 26: return <COVID />
        break;
        case 27: return <RiftValleyFever />
        break;
        case 28: return <SAMU5 />
        break;
        case 29: return <SARS />
        break;
        case 30: return <Scabies />
        break;
        case 31: return <PhneumoniaU5 />
        break;
        case 32: return <Smallpox />
        break;
        case 33: return <Tuberculosis />
        break;
        case 34: return <Viralhemorrhagicfever />
        break;
        case 35: return <Anthrax />
        break;
        case 36: return <Dengue />
        break;
        case 37: return <Campain />
        break;
        default:
            break;
    }
}




function ReportableDeasesHompage() {
    const [isSelected, setIsSelected] = useState(0)
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <><Navebar /><div className='grid-contain BgcolorAdmins '>

          <ReportableDeasesGroup RepDeses={RepDeses} isSelected={isSelected} setIsSelected={setIsSelected} />

          <RenderRepDeases index={isSelected} />
      </div></>
  )
}

export default ReportableDeasesHompage