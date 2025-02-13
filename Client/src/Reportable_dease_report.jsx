import React, { useState } from 'react'
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
import MeselesReport from './Disease-Report/MeselesReport'
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
import Navebar from './Admin_Component/Navebar'

import ReportableDeases_Dashbored from './ReportableDeases_Dashbored'




const RepDeses =[
  "DASHBORED","Cholera","Measles" ,"Maternal death" ,  "PrenatalDeath", "AEFI", "Meningits","Obstetric fistula" ,"Yellow fever" ,"Polio" ,
   "Malaria","Relapsing fever", "Rabies", "Dracunculiasis-Guinea worm" , "Dysenter", "HIV new", "Human influenza caused by new subtype", "Hypertention new","Diabetic Mellitus new" ,
    "MAM_U5C", "Brucellosis","ChemicalP" ,"Chikungunya", "Monkeypox virus", "Neonatal Tetanus","Acute jaundice syndrome within fourtthen days of illness" ,"Diarrhea with dehydration_U5" , "COVID",
    "Rift Valley Fever", "SAM_U5", "SARS", "Scabies" , "Sever pneumonia in children U5", "Small pox", "Tuberculosis new", "Viral hemorrhagic fever", "Anthrax", "Dengue fever","Weekly_Reporting_Format"
]
const RenderRepDeases = ({index}) => {
    switch (index) {
        case 0: return <ReportableDeases_Dashbored />
        break;
        case 1: return <Cholera_Report />
        break;
        case 2: return <MeselesReport />
        break;
        case 3: return <MaternalDeath_Report />
        break;
        case 4: return <PrenatalDeath_Report />
        break;
        case 5: return <AEFI_Report />
        break;
        case 6: return <Meningits_Report />
        break;
        case 7: return <Fistula_Report />
        break;
        case 8: return  <YellowFever_Report />
        break;
        case 9: return <Polio_Report />
        break;
        case 10: return <Malaria_Report />
        break;
        case 11: return <Relapsing_Report />
        break;
        case 12: return <Rabies_Report />
        break;
        case 13: return <Guineaworm_Report />
        break;
        case 14: return <Dysenter_Report />
        break;
        case 15: return <HIV_Report />
        break;
        case 16: return <HumanInfluenza_Report />
        break;
        case 17: return <Hypertention_Report />
        break;
        case 18: return  <DiabeticM_Report />
        break;
        case 19: return <MAMU5C_Report />
        break;
        case 20: return <Brucellosis_Report />
        break;
        case 21: return <ChemicalP_Report />
        break;
        case 22: return <Chikungunya_Report />
        break;
        case 23: return <Monkeypox_Report />
        break;
        case 24: return <Tetanus_Report />
        break;
        case 25: return <Acute_Report />
        break;
        case 26: return <DiarrheaU5_Report />
        break;
        case 27: return <COVID_Report />
        break;
        case 28: return <RiftValleyFever_Report />
        break;
        case 29: return <SAMU5_Report />
        break;
        case 30: return <SARS_Report />
        break;
        case 31: return <Scabies_Report />
        break;
        case 32: return <PhneumoniaU5_Report />
        break;
        case 33: return <Smallpox_Report />
        break;
        case 34: return <Tuberculosis_Report />
        break;
        case 35: return <Viralhemorrhagicfever_Report />
        break;
        case 36: return <Anthrax_Report />
        break;
        case 37: return <Dengue_Report />
        break;
        case 38: return <Weekly_Reporting_Format />
        break;
        default:
            break;
    }
}




function Reportable_dease_report() {
    const [isSelected, setIsSelected] = useState(0)
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <><div className='grid-contain BgcolorAdmins '>

          <Reportable_dease_reportGroup RepDeses={RepDeses} isSelected={isSelected} setIsSelected={setIsSelected} />

          <RenderRepDeases index={isSelected} />
      </div></>
  )
}

export default Reportable_dease_report