import { useEffect, useState } from 'react'
//import '../Client/bootstrap/dist/css/bootstrap.min.css'
//import DateRangePickerComp from '../components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//import './App.css'
import '../Admin_Component/Navbar.css'
import { useRef } from "react";
import axios from 'axios'
import { pdfjs } from "react-pdf";
import PhoneInput from 'react-phone-number-input'
//import Dowenload from './Dowenload.jsx'
import Header from '../Header.jsx'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Measles () {
  
  const [startDate, setStartDate] = useState(new Date())
  //const [RStartDate,setRStartDate ] = useState(new Date());
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [visible, setVisible]=useState(false);
  const [Sex, setSex] = useState('');
  const [Age, setAge]=useState("");
  const [HNumber , setHNumber] = useState("");
  const [PWoreda, setPWoreda] = useState("")
  const [pTWoreda,setpTWoreda] =useState("")
  const [PSubCity, setPSubCity] = useState("")
  const [PRegion, setPRegion] = useState("")
  const [WRegion, setWRegion] = useState("")
  const [BDate, setBDate]=useState(new Date())
  const [pname, setpname] = useState({});
  const [visit,setvisit]=useState(false)
  const [Eschool, setEschool]=useState(false);
  const [SName,setSName]=useState("")
  const [Hfacility,setHfacility]=useState(new Date())
  const [DseenHF,setDseenHF]=useState(new Date());
  const [visite,setevisit]=useState(false)
  const [PType, setPType] = useState("")
  const [Weight,setWeight]=useState('')
  const [Hight,setHight]=useState("")
  const [BMI,setBMI]= useState("")
  const [MUAC,setMUAC]=useState("")
  const [PPhone,setPPhone]=useState("")
  const [HRegion,setHRegion] = useState("")
  const [HTRegion,setHTRegion] = useState("")
  const [HSubCity, setHSubCity] =useState("")
  const [THSubCity, setTHSubCity] =useState("")
  const [HWoreda, setHWoreda] = useState("")
  const [HFTworeda, setHFTworeda] = useState("")
  const [HFName,setHFName] =useState("")
  const [HFTName,setHFTName] =useState("")
  const [NotifiedDate,setNotifiedDate] = useState(new Date())
  const [OnsetDate,setOnsetDate] = useState(new Date())
  const [Orash,setOrash]=useState(new Date())
  const [MNumber,setMNumber] = useState("")
  const [Vdate,setVdate]=useState(new Date())
  const [Aepidemics,setAepidemics]= useState("")
  const [visited,setvisited]=useState(false)
  const [visitedF,setvisitedF]=useState(false)
  const [Treatment,setTreatment] = useState("")
  const [TTreatment,setTTreatment] = useState("")
  const [visiblee, setVisiblee]=useState(false);
  const [Dspeciemen,setDspeciemen] = useState(new Date())
  const [DspeciemenS,setDspeciemenS] = useState(new Date())
  const [Tspecimen,setTspecimen] = useState("")
  const [TTspecimen,setTTspecimen] = useState("")
  const [sample, setsample] = useState("")
  const [TypeC,setTypeC]= useState("")
  const [Labresults,setLabresults]=useState("")
  const [SMeasles,setSMeasles]=useState("")
  const [Nmeasles,setNmeasles]=useState("")
  const [TNmeasles, setTNmeasles] = useState(new Date())
  const [visibleIso, setVisibleIso]=useState(false);
  const [Isolated,setIsolated]=useState("")
  const [visibles, setVisibles]=useState(false);
  const [vitaminA,setvitaminA]=useState("")
  const [visiting,setvisiting]=useState(false)
  const [Complication,setComplication]=useState("")
  const [AdmitedHF,setAdmitedHF]=useState("")
  const [Tcomplications,setTcomplications] = useState("")
  const [TTcomplications,setTTcomplications] = useState("")
  const [Pfactors,setPfactors]=useState("")
  const [WPfactors,setWPfactors]=useState("")
  const [CRFP,setCRFP] = useState("")
  const [DateSR, setDateSR] = useState(new Date())
  const [FCName, setFCName] = useState("")
  const [Phone,setPhone]=useState("")
  const [Pict, setPict] = useState("")
  const[PNeonat,setPNeonat] = useState("")
  const [Outcome,setOutcome]=useState("")
  const [email, setEmail] = useState("")
 const [file , setfile] = useState("");
 //const[date,setdate] =useState()
  //const [sampleTaken,setsampleTaken]=useState()
  //const [lastLvaccination,setlastLvaccination]=useState()
 // const [Tcomplication,setTcomplication]=useState()
  //const[DCleaned,setDCleaned]=useState()
  const [currLocation, setCurrLocation] = useState({});
  const [CurrLocationJs, setCurrLocationJs] = useState({});
//show or hide selection box//
  const [showhide, setShowhide]=useState('');
  const [allImage, setAllImage] = useState(null);

  //cascadind subcity and HF//
  /*const Sub_Cities = [
    {id:"1",name:"Addis Ketema"},{id:"2",name:"Akaki Kality"},{id:"3",name:"Arada"},{id:"4",name:"Bole"},{id:"5",name:"Gulele"},{id:"6",name:"Kirkos"},{id:"7",name:"Kolfe Keranyo"},{id:"8",name:"Lemi Kura"},{id:"9",name:"Lideta"},{id:"10",name:"Nifas Silk Lafto"},{id:"11",name:"Yeka"}];

  const Woreda = [
    {id:"1",Sub_CitiesId:"1",name:"Woreda 01"},{id:"2",Sub_CitiesId:"1",name:"Woreda 03"},{id:"3",Sub_CitiesId:"1",name:"Woreda 04"},{id:"4",Sub_CitiesId:"1",name:"Woreda 05"},{id:"5",Sub_CitiesId:"1",name:"Woreda 06"},{id:"6",Sub_CitiesId:"1",name:"Woreda 08"},
    {id:"7",Sub_CitiesId:"1",name:"Woreda 09"},{id:"8",Sub_CitiesId:"1",name:"Woreda 10"},{id:"9",Sub_CitiesId:"1",name:"Woreda 11"},{id:"10",Sub_CitiesId:"1",name:"Woreda 12"},{id:"11",Sub_CitiesId:"1",name:"Woreda 13"},{id:"12",Sub_CitiesId:"1",name:"Woreda 14"},
    {id:"13",Sub_CitiesId:"2",name:"Woreda 01"},{id:"14",Sub_CitiesId:"2",name:"Woreda 02"},{id:"15",Sub_CitiesId:"2",name:"Woreda 03"},{id:"16",Sub_CitiesId:"2",name:"Woreda 04"},{id:"17",Sub_CitiesId:"2",name:"Woreda 05"},{id:"18",Sub_CitiesId:"2",name:"Woreda 06"},
    {id:"19",Sub_CitiesId:"2",name:"Woreda 07"},{id:"20",Sub_CitiesId:"2",name:"Woreda 08"},{id:"21",Sub_CitiesId:"2",name:"Woreda 09"},{id:"22",Sub_CitiesId:"2",name:"Woreda 10"},{id:"23",Sub_CitiesId:"2",name:"Woreda 12"},{id:"24",Sub_CitiesId:"2",name:"Woreda 13"},
    {id:"25",Sub_CitiesId:"3",name:"Woreda 01"},{id:"26",Sub_CitiesId:"3",name:"Woreda 02"},{id:"27",Sub_CitiesId:"3",name:"Woreda 04"},{id:"28",Sub_CitiesId:"3",name:"Woreda 05"},{id:"29",Sub_CitiesId:"3",name:"Woreda 06"},{id:"30",Sub_CitiesId:"3",name:"Woreda 07"},
    {id:"31",Sub_CitiesId:"3",name:"Woreda 08"},{id:"32",Sub_CitiesId:"3",name:"Woreda 09"},{id:"33",Sub_CitiesId:"4",name:"Woreda 01"},{id:"34",Sub_CitiesId:"4",name:"Woreda 02"},{id:"35",Sub_CitiesId:"4",name:"Woreda 03"},{id:"36",Sub_CitiesId:"4",name:"Woreda 04"},{id:"37",Sub_CitiesId:"4",name:"Woreda 05"},{id:"38",Sub_CitiesId:"4",name:"Woreda 06"},
    {id:"39",Sub_CitiesId:"4",name:"Woreda 07"},{id:"40",Sub_CitiesId:"4",name:"Woreda 11"},{id:"41",Sub_CitiesId:"4",name:"Woreda 12"},{id:"42",Sub_CitiesId:"4",name:"Woreda 13"},{id:"43",Sub_CitiesId:"4",name:"Woreda 14"},
    {id:"44",Sub_CitiesId:"5",name:"Woreda 01"},{id:"45",Sub_CitiesId:"5",name:"Woreda 02"},{id:"46",Sub_CitiesId:"5",name:"Woreda 03"},{id:"47",Sub_CitiesId:"5",name:"Woreda 04"},{id:"48",Sub_CitiesId:"5",name:"Woreda 05"},{id:"49",Sub_CitiesId:"5",name:"Woreda 06"},
    {id:"50",Sub_CitiesId:"5",name:"Woreda 07"},{id:"51",Sub_CitiesId:"5",name:"Woreda 08"},{id:"52",Sub_CitiesId:"5",name:"Woreda 09"},{id:"53",Sub_CitiesId:"5",name:"Woreda 10"},{id:"54",Sub_CitiesId:"5",name:"Woreda 11"},
    {id:"55",Sub_CitiesId:"6",name:"Woreda 01"},{id:"56",Sub_CitiesId:"6",name:"Woreda 02"},{id:"57",Sub_CitiesId:"6",name:"Woreda 03"},{id:"58",Sub_CitiesId:"6",name:"Woreda 04"},{id:"59",Sub_CitiesId:"6",name:"Woreda 05"},{id:"60",Sub_CitiesId:"6",name:"Woreda 06"},
    {id:"61",Sub_CitiesId:"6",name:"Woreda 07"},{id:"62",Sub_CitiesId:"6",name:"Woreda 008"},{id:"63",Sub_CitiesId:"6",name:"Woreda 09"},{id:"64",Sub_CitiesId:"6",name:"Woreda 10"},{id:"65",Sub_CitiesId:"6",name:"Woreda 11"},
    {id:"66",Sub_CitiesId:"7",name:"Woreda 01"},{id:"67",Sub_CitiesId:"7",name:"Woreda 02"},{id:"68",Sub_CitiesId:"7",name:"Woreda 03"},{id:"69",Sub_CitiesId:"7",name:"Woreda 04"},{id:"70",Sub_CitiesId:"7",name:"Woreda 05"},{id:"71",Sub_CitiesId:"7",name:"Woreda 06"},
    {id:"72",Sub_CitiesId:"7",name:"Woreda 07"},{id:"73",Sub_CitiesId:"7",name:"Woreda 08"},{id:"74",Sub_CitiesId:"7",name:"Woreda 09"},{id:"75",Sub_CitiesId:"7",name:"Woreda 10"},
    {id:"76",Sub_CitiesId:"8",name:"Woreda 02"},{id:"77",Sub_CitiesId:"8",name:"Woreda 03"},{id:"78",Sub_CitiesId:"8",name:"Woreda 04"},{id:"79",Sub_CitiesId:"8",name:"Woreda 05"},{id:"80",Sub_CitiesId:"8",name:"Woreda 05"},{id:"81",Sub_CitiesId:"8",name:"Woreda 06"},
    {id:"82",Sub_CitiesId:"8",name:"Woreda 07"},{id:"83",Sub_CitiesId:"8",name:"Woreda 08"},{id:"84",Sub_CitiesId:"8",name:"Woreda 09"},{id:"85",Sub_CitiesId:"8",name:"Woreda 10"},
    {id:"86",Sub_CitiesId:"9",name:"Woreda 01"},{id:"87",Sub_CitiesId:"9",name:"Woreda 02"},{id:"88",Sub_CitiesId:"9",name:"Woreda 03"},{id:"89",Sub_CitiesId:"9",name:"Woreda 04"},{id:"90",Sub_CitiesId:"9",name:"Woreda 05"},{id:"91",Sub_CitiesId:"9",name:"Woreda 06"},
    {id:"92",Sub_CitiesId:"9",name:"Woreda 07"},{id:"93",Sub_CitiesId:"9",name:"Woreda 08"},{id:"94",Sub_CitiesId:"9",name:"Woreda 09"},{id:"95",Sub_CitiesId:"9",name:"Woreda 10"},
    {id:"96",Sub_CitiesId:"10",name:"Woreda 01"},{id:"97",Sub_CitiesId:"10",name:"Woreda 02"},{id:"98",Sub_CitiesId:"10",name:"Woreda 05"},{id:"99",Sub_CitiesId:"10",name:"Woreda 06"},{id:"100",Sub_CitiesId:"10",name:"Woreda 07"},{id:"101",Sub_CitiesId:"10",name:"Woreda 08"},
    {id:"102",Sub_CitiesId:"10",name:"Woreda 09"},{id:"103",Sub_CitiesId:"10",name:"Woreda 10"},{id:"104",Sub_CitiesId:"10",name:"Woreda 11"},{id:"105",Sub_CitiesId:"10",name:"Woreda 12"},{id:"106",Sub_CitiesId:"10",name:"Woreda 13"},{id:"107",Sub_CitiesId:"10",name:"Woreda 14"},
    {id:"108",Sub_CitiesId:"10",name:"Woreda 15"},{id:"109",Sub_CitiesId:"11",name:"Woreda 01"},{id:"110",Sub_CitiesId:"11",name:"Woreda 02"},{id:"111",Sub_CitiesId:"11",name:"Woreda 03"},{id:"112",Sub_CitiesId:"11",name:"Woreda 04"},{id:"113",Sub_CitiesId:"11",name:"Woreda 05"},{id:"114",Sub_CitiesId:"11",name:"Woreda 06"},
    {id:"115",Sub_CitiesId:"11",name:"Woreda 07"},{id:"116",Sub_CitiesId:"11",name:"Woreda 08"},{id:"117",Sub_CitiesId:"11",name:"Woreda 09"},{id:"118",Sub_CitiesId:"11",name:"Woreda 10"},{id:"119",Sub_CitiesId:"11",name:"Woreda 11"},{id:"120",Sub_CitiesId:"11",name:"Woreda 12"},
    {id:"121",Sub_CitiesId:"11",name:"Woreda 13"},
  ]

  const HF = [
    {id:"1",WoredaId:"1",name:"18 Shemach Health center"},{id:"2",WoredaId:"1",name:"Abinet DIC"},{id:"3",WoredaId:"1",name:"Dr. Temam Dental Clinic"},{id:"4",WoredaId:"1",name:"Family Guidance Association Ethiopia"},{id:"1",WoredaId:"1",name:"GIGI Dental Clinic"},{id:"2",WoredaId:"1",name:"Ginbot 20 Health Center"},{id:"3",WoredaId:"1",name:"Ruh Eye Clinic"},
    {id:"4",WoredaId:"2",name:"Abyssinia Health Center"}, {id:"5",WoredaId:"2",name:"Son Diego"}, {id:"6",WoredaId:"2",name:"Pride Medium Clinic"}, {id:"7",WoredaId:"2",name:"Finot Medium Clinic"}, {id:"8",WoredaId:"2",name:"Woreda 03 Health Center"}, {id:"9",WoredaId:"2",name:"Asrat Medium clinic"}, {id:"10",WoredaId:"2",name:"Gibe medium clinic"},{id:"11",WoredaId:"2",name:"ROHOBOT Medium clinic"},
    {id:"12",WoredaId:"3",name:"Addis Ketema Health Center"}, {id:"13",WoredaId:"3",name:"Adot Internal Mediciene speciality Clinic"}, {id:"14",WoredaId:"3",name:"Bilal Medium Clinic"}, {id:"15",WoredaId:"3",name:"Dr Fetiya Dental Clinic"}, {id:"16",WoredaId:"3",name:"Ethio Tebib Hospital"}, {id:"17",WoredaId:"3",name:"Rebim Medium Clinic"}, {id:"18",WoredaId:"3",name:"Jamuz internalmedicinespeciality clinic"},
    {id:"19",WoredaId:"4",name:"Abebe Bikila Health Center"},{id:"20",WoredaId:"4",name:"Alem Tena Higner  Clinic"},{id:"21",WoredaId:"4",name:"Bitania  Internal Medicine Speciality Clinic"},{id:"22",WoredaId:"4",name:"Enat Dermatology Clinic"},{id:"23",WoredaId:"4",name:"Girum Hospital"},{id:"24",WoredaId:"4",name:"Tirust Internal Medicine Speciality Clinic"},{id:"25",WoredaId:"4",name:"Zamar Medium Clinic"},
    {id:"26",WoredaId:"5",name:"Felegemeles Health Center"},{id:"27",WoredaId:"5",name:"Andnet Primary Clinic"},{id:"28",WoredaId:"5",name:"Andnet Primary Clinic"},{id:"29",WoredaId:"5",name:"Marrystop Clinic"},{id:"30",WoredaId:"5",name:"Addis Raey Health Center"},{id:"31",WoredaId:"5",name:"Arsho Laboratory"},{id:"32",WoredaId:"5",name:"Hiwot Fana Medium Clinic"},{id:"33",WoredaId:"5",name:"Melese Haylu Medium Clinic"},{id:"34",WoredaId:"5",name:"Wabi Dental Clinic"},{id:"35",WoredaId:"5",name:"Wello Medium Clinic"},
    {id:"36",WoredaId:"6",name:"Millinium Health Center"},{id:"37",WoredaId:"6",name:"Addis Ketema Medium Clinic"},{id:"38",WoredaId:"6",name:"AL-Enayan Medium Clinic"},{id:"39",WoredaId:"6",name:"Amede Internal Mediciene Speciallity Clinic"},{id:"40",WoredaId:"6",name:"Binas Medium Dental Clinic"},{id:"41",WoredaId:"6",name:"Birhan Medium Clinic"},{id:"42",WoredaId:"6",name:"Cher-Amlak Primary Clinic"},{id:"43",WoredaId:"6",name:"Dr. Teresa Medium Dental Clinic"},{id:"44",WoredaId:"6",name:"Elroyi Medium Dental ClinicBOT"},{id:"45",WoredaId:"6",name:"Haset Primary Clinic"},{id:"46",WoredaId:"6",name:"Hebret Medium Dental Clinic"},{id:"47",WoredaId:"6",name:"MAM Medium Clinic"},{id:"48",WoredaId:"6",name:"Munir MediMedium Dental Clinic"},{id:"49",WoredaId:"6",name:"Police Memriya Medium Clinic"},{id:"50",WoredaId:"6",name:"Radiet Medium Dental Clinic"},{id:"51",WoredaId:"6",name:"Sakina Medium Dental Clinic"},{id:"52",WoredaId:"6",name:"St. Merkorios Medium Clinic"},{id:"53",WoredaId:"6",name:"Tensay Medium Dental Clinic"},{id:"36",WoredaId:"6",name:"ROHOBOT"},{id:"54",WoredaId:"6",name:"TOZ In. Medicen Speciality  Clinic"},{id:"55",WoredaId:"6",name:"Tnesae Medium Clinic"},
    {id:"56",WoredaId:"7",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
    {id:"18",WoredaId:"3",name:"ROHOBOT"},
  ]

  const [ country, setCountry] = useState([]);
  const [ state, setState] = useState([]);
  const [ city, setCity] = useState([]);

  useEffect(()=>{
    setCountry(countries);
  },[])*/
  const Sub_Cities = [
    {
      name:'Addis_Ketema',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["18 Shemach Health center","Abinet DIC","Dr. Temam Dental Clinic","Family Guidance Association Ethiopia","GIGI Dental Clinic","Ginbot 20 Health Center","Ruh Eye Clinic"],
        },
        {
          name:"Woreda 03",
          HF:["Abyssinia Health Center","Pride Medium Clinic","Finot Medium Clinic","Woreda 03 Health Center","Asrat Medium clinic","Gibe medium clinic","ROHOBOT Medium clinic"],
        },
        {
          name:"Woreda 04",
          HF:["Addis Ketema Health Center","Adot Internal Mediciene speciality Clinic","Bilal Medium Clinic","Dr Fetiya Dental Clinic","Ethio Tebib Hospital","Rebim Medium Clinic","Jamuz internalmedicinespeciality clinic"],
        },
        {
          name:"Woreda 05",
          HF:["Abebe Bikila Health Center","Alem Tena Higner  Clinic","Bitania  Internal Medicine Speciality Clinic","Enat Dermatology Clinic","Girum Hospital","Tirust Internal Medicine Speciality Clinic","Zamar Medium Clinic"],
        },
        {
          name:"Woreda 06",
          HF:["Felegemeles Health Center","Andnet Primary Clinic","Ayub Medium Clinic","Marrystop Clinic","Addis Raey Health Center","Arsho Laboratory","Hiwot Fana Medium Clinic","Melese Haylu Medium Clinic","Wabi Dental Clinic","Wello Medium Clinic"],
        },
        {
          name:"Woreda 08",
          HF:["Millinium Health Center","Addis Ketema Medium Clinic","AL-Enayan Medium Clinic","Amede Internal Mediciene Speciallity Clinic","Binas Medium Dental Clinic","Birhan Medium Clinic","Cher-Amlak Primary Clinic","Dr. Teresa Medium Dental Clinic","Elroyi Medium Dental ClinicBOT","Haset Primary Clinic","Hebret Medium Dental Clinic","MAM Medium Clinic","Munir MediMedium Dental Clinic","Police Memriya Medium Clinic","Radiet Medium Dental Clinic","Sakina Medium Dental Clinic","St. Merkorios Medium Clinic","Tensay Medium Dental Clinic","TOZ In. Medicen Speciality  Clinic","Tnesae Medium Clinic"],
        },
        {
          name:"Woreda 09",
          HF:["Kuas Meda Health Center","Abera Wegesha","Dr.Abreham Medium Clinic","Fekadu Dental Clinic","Mekanehiwot Primary Clinic","Munir Denta Clinic","Tseday Gyn/Obs Speciality Clinic","Tsgereda Speciality  Clinic"],
        },
        {
          name:"Woreda 10",
          HF:["Woreda 10 Health Center","Beyan Dermatology clinic","Ethio Emnebered Clinic","Ramzi Dental clinic","Ringroad Medium Clinic",],
        },
        {
          name:"Woreda 11", 
          HF:["Philipos Health Center","Abuderda Msdium Clinic","Beferekot Msdium Clinic","Soramba Msdium Clinic","Tropical Msdium Clinic"],
        },
        {
          name:"Woreda 12 ",
          HF:["Kolfe Health Center","Dr Jeilan Medium Clinic","Ergib Medium Clinic","Esam Medium Clinic","Kolfe Psychiatric Clinic","Noah Medium clinic","Sndemer Medium Clinic","Lomimeda Health Center","Begonet Medium Clinic","Umma Medium Clinic"," Woliso Medium Clinic"],
        },
        {
          name:"Woreda 13",
          HF:["Mikilliland Health Center","AMikilliland Health Center","A/A Bottle Glass Medium Clinic","Jermabo Medium Clinic","Jeza Medium Clinic","Michot Medium Clinic","Mina Medium Clinic","Sheboka Medium Clinic"],
        },
        {
          name:"Woreda 14",
          HF:["A Hope Medium clinic", "GHT Medium Clinic","Kidus medium Clinic","Mery Joy Medium clinic","Milk Medium Clinic","Mirab bar Medium clinic","Mission of charity","Tikur Abay primary clinic"],
        },
      ],
    },
    {
      name:'Akaki Kality',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Abenez Medium Clinic","Aberash Medium Clinic","Addis medium clinic","Akaki Health Center","Alem Tena Medium Clinic","Alpha Medium Clinic","Ethio Kacha Primary Clinic","FGA Non-Governmental Organization","Garaduba Medium Clinic","Global Medium Clinic","Markan Medium Clinic","Markos Medium Clinic","Meseret Medium Clinic","Mission Medium Clinic","Selam Medium Clinic","St George Medium Clinic", ],
        },
        {
          name:"Woreda 02",
          HF:["Anbessa Shoe Factory Primary Clinic", "Kena Medium Clinic", "Lemu Medium Clinic", " Maranatha Medium Clinic"],
        },
        {
          name:"Woreda 03",
          HF:["Amazon Medium Clinic","Biretabiret Primary Clinic","Dr Mesfine Medium Clinic","Medihaniyalem Medium Clinic","Rahy Medium Clinic","Ravi Medium Clinic","Selamfre Health Center"],
        },
        {
          name:"Woreda 04",
          HF:["Afirica Medical Medium Clinic","Dr Dereje Medium Clinic","Dream Medium Clinic","Emmanuel Medium clinic","Fitsun Physiotherapy Clinic","Hosa Medium Clinic","Mehir kacha(G-7) Primary Clinic","Mekilit Medium Clinic","Naku Medium Clinic","Hidase Medium Clinic"],
        },
        {
          name:"Woreda 05",
          HF:["Alkyd Resine Primary Clinic","Awash Wine Primary Clinic","Berta Primary Clinic","Ethiopian Construction Works Corporation Medium Clinic","Elet Derash Primary Clinic","Elias Primary Clinic","EthioKorkina Tasa Primary Clinic","GIW Primary Clinic","Leather Industry Development Institute Primary Clinic","Meseret Medium Clinic","Oromia Pipe Primary Clinic","Ruhama Primary Clinic", "Saint Gabriel Catholic Health Center","Teklehaimanot Primary Clinic","Textile Primary Clinic","Wondiye Medium Clinic"],
        },
        {
          name:"Woreda 06",
          HF:["Abo Medium Clinic","Awashikoda Medium Clinic","Bahere Transport Medium Clinic","Biruh Medium Clinic","Equatorial Business Group Primary Clinic","Ethiopia Giberina Primary Clinic","Faffa Accession Primary Clinic","Horizon Medium Clinic","Nur Med Clinic","Reise Engineering Primary Clinic","Saris Health Center","Saris No.1 Medium Clinic","Tabor Medium Clinic"],
        },
        {
          name:"Woreda 07",
          HF:["Addis Ababa Foam and Plastic Factory Primary Clinic","Addis Hiwot Medium Clinic","Andinet Medium Clinic","Central Medium Clinic","Eagle vision Medium Clinic","Fawes Medium Clinic","Kality Health Center","Kality Kidus Medium Clinic","Kality Medium Clinic","Kality Migib Mederaja Primary Clinic", "Kality Police Mameria Medium Clinic","Lucy Medium Clinic","Tana Medium Clinic",],
        },
        {
          name:"Woreda 08",
          HF:["Abrak Maternal and Child Health Medical Center","Dr Bayu Medium Clinic","Dr Mekonnen Medium Clinic","Fitsum Primary Clinic","Hilana Medium Clinic","ITHIEL Maternal and Child Health Medical Center","Kality Construction Primary Clinic","Medico Medium Clinic", "Meftihe Medium Clinic","Saris No.2 Surgical Specialty Clinic", "Saron Primary Clinic","Serty Health Center", "Serty Mariam Medium Clinic","Yordan Medium Clinic","Amenab Medium Clinic","Kerzer Medium Clinic","MTH Maternal and Child Health Medical Center", "Rama Medium Clinic"],
        },
        {
          name:"Woreda 09",
          HF:["Asstu Medium Clinic","Family Medium Clinic","Fitsum Medium Clinic","Heineken Brewery Factory Primary Clinic","Kilinto Medium Clinic","Liyu Medium Clinic",],
        },
        {
          name:"Woreda 10",
          HF:["Gelangura Health Center"],
        },
        
        {
          name:"Woreda 12",
          HF:["Dr Abera Medium Dental Clinic","Dr Birhanu Medium Dental Clinic","Dr Sisay Medium Dental Clinic","Dr Woldu Kati Medium Dental Clinic", "Edom Medium Dental Clinic","Gelan Health Center","GOAH International Medium Clinic","Health care Medium Clinic","Kale Specialty Medium Dental Clinic","Kality Bretabiret Primary Clinic","Letena Medium Clinic","Salogorgis Medium Clinic","Yimran Medium Clinic",],
        },
        {
          name:"Woreda 13",
          HF:["Dr Delelegn Medium Clinic", "Dr Tsegahe Medium Dental Clinic","Dr Asefa Medium Clinic", "Eagle Medium Clinic", "Adone Prediatric Clinic", "Dr Endris Medium Clinic","Eshagere Medium Dental Clinic", "Meaza Medium Clinic No.2","Milla Medium Clinic No.2", "Safe-Med Medium Clinic",],
        },
      ],
    },
    {
      name:'Arada',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Churchill Health Center","Teklehaymanot  General Hospital","Mariestops Maternal and Child Health Center","Dr. Aemiro kebede Medium Clinic","Tesfa Medium Clinic","Yehuleshet Medical Center",],
        },
        {
          name:"Woreda 02",
          HF:["Ras Emeru Health Center", "Tsgereda Internal Medicine Speciality Clinic","Jiniad Medium Clinic","Abune Petrose Primary Clinic", "Simegn Kebede Health Center", "Zak Internal Medicine Speciality Clinic","Abebech Gobena Maternal and Child Health Center "],
        },
        
        {
          name:"Woreda 04",
          HF:["Semen Health Center","Eyoha Meskerem Medium Clinic","Rohobot Medium Clinic","Sabryot Medium Clinic", "Police Primary Clinic",],
        },
        {
          name:"Woreda 05",
          HF:["Afinchober Health Center", "Addis Ababa Polise Comission Medium Clinic", "Arada Giorgis Medical Center", "Anania Maternal and Child Health Especiality Clinic","Addis General Hospital", "Arada Health Center","Sheger Medium Clinic", "Semira Medium Clinic", "Esatina Dinigetegna Adegawoch Primary Clinic",],
        },
        {
          name:"Woreda 06",
          HF:["Janmeda Health Center", "6 killo Medium Clinic", "Christmass International Brain and Spine  Hospital", "Dr. Genene Maternal and Child Health", "Dogali Medium Clinic", "Missionary Of Charity Health Center","Yelema Internal Medicine Speciality clinic","Zoya Medium Clinic",],
        },
        {
          name:"Woreda 07",
          HF:["Kebena Health Center", "Life Addis Medium Clinic","Aware Health Center", ],
        },
        {
          name:"Woreda 08",
          HF:["Beata health Center","Berges Medium Clinic", ],
        },
        {
          name:"Woreda 09",
          HF:["Basha Wolde Chelot Health Center","Addis Ababa Universty Primary Clinic","Addis Maternal and Child Health Center","Birehan Ena Selam Primary Clinic","Damakesie Physiotherapy specaility Clinic","Danu Orthopedic  Specaility Center","Droga physiotherapy specaility Clinic","Haleluya Internal Medicine Speciality Clinic","Hemen Maternal and child health Center","Yehizb Tewokayoch Mikir Bet Primary Clinic","Silassie Medium Clinic", "Sunshine Medium Clinic", "Zion Physiotherapy Specaility Clinic",],
        },
        {
          name:"Woreda 10",
          HF:["Gelangura Health Center"],
        },
        
        {
          name:"Woreda 12 ",
          HF:["Dr Abera Medium Dental Clinic","Dr Birhanu Medium Dental Clinic","Dr Sisay Medium Dental Clinic","Dr Woldu Kati Medium Dental Clinic", "Edom Medium Dental Clinic","Gelan Health Center","GOAH International Medium Clinic","Health care Medium Clinic","Kale Specialty Medium Dental Clinic","Kality Bretabiret Primary Clinic","Letena Medium Clinic","Salogorgis Medium Clinic","Yimran Medium Clinic",],
        },
        {
          name:"Woreda 13",
          HF:["Dr Delelegn Medium Clinic", "Dr Tsegahe Medium Dental Clinic","Dr Asefa Medium Clinic", "Eagle Medium Clinic", "Adone Prediatric Clinic", "Dr Endris Medium Clinic","Eshagere Medium Dental Clinic", "Meaza Medium Clinic No.2","Milla Medium Clinic No.2", "Safe-Med Medium Clinic",],
        },
      ],
    },
    {
      name:'Bole',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Air port medium clinic", "St. Michael Medium Clinic","Nordic Medical Center", "Choice speciality clinic", "Bereket Medium Clinic","JBY EBOR Medium Clinic", "Maternal speciality clinic","Atnasia speciality clinic", "Dr. Menur medium clinic",],
        },
        {
          name:"Woreda 02",
          HF:["Dr.Yared Pediatrics Speciality Clinic","St. Urael Speciality Clinic","Washngton Medical Center","Ethio China Medium Clinic","Mulu G  Maternal and Pediatrics Speciality Clinic", "Bole 17/20 Health Center",],
        },
        {
          name:"Woreda 03",
          HF:["DUSAY medium clinic", "Dr. Abebe speciality clinic", "MOENCO Campany primary clinic","Civil Avation Medium Clinic","Sport Acadamy Primary Clinic","Bole 17 Health center","Grace Maternal and Pediatrics Center","Brass maternal and pediatrics Center", "Hayat General Hospital", ],
        },
        {
          name:"Woreda 04",
          HF:["Semah maternal and Pediatrics Center", "St. Rufael Medium Clinic","Addis Hiwot General Hospital","St. Gebriel General Hospital", "22 Mazoria speciality clinic","BGM Maternal and Pediatrics Center", "Mare NGO Medium Clinic","AHF Speciality Clinic", "Labeza Medium Clinic",],
        },
        {
          name:"Woreda 05",
          HF:["Model Medium Clinic", "Misale medium Clinic", "Chicho pediatrics speciality clinic","Lancet General hospital", "Kosmodent Dental Clinic", "City Dental Clinic", "Avante Speciality clinic","Arsho medium clinic",],
        },
        {
          name:"Woreda 06",
          HF:["Ethio Pastic primary clinic","AMCHE primary clinic","Zeorit medium clinic","Tsenu medium clinic","Ethiopian Standards medium clinic","Teshome medium clinic","Caring speciality clinic","Educational manufacture primary clinic",],
        },
        {
          name:"Woreda 07",
          HF:["Sweteral medium Clinic", "Selassie Medium Clinic", "Getachew primary clinic", "Elshaday Medium Clinic","Ursuline medium clinic","Mintesnot primary clinic", "Jackros medium clinic", "Meskerem primary clinic","Yerer Star medium Clinic","Zema medium Clinic",],
        },
        {
          name:"Woreda 11",
          HF: ["Faris Medium Clinic","Lemi Primary Clinic","Salem Primary Clinic", "Dashin Medium Clinic", "Central Medium Clinic","Medical medium  Clinic"],
        },
        
        {
          name:"Woreda 12",
          HF:["Bulbula Health Center", "A/W/Tinsae Medium Clinic", "Abigiya Medium Clinic No1", "Abigya Medium Clinic No2","Birhane Leul Medium Clinic", "Bisrat Medium Clinic", "Dr. Kassahun Medium Clinic","Eyob Medium Clinic", "Tihtina Medium Clinic","Twins Medium Clinic", "Rosemary Pediatric Clinic", "Ahadu Medium Clinic", "Geremew Medium Clinic","Tina Medium Clinic","Medan Medium Clinic", "Amanuel Primary Clinic", "Adi Primary Clinic", "Washington Maternal and pediatrics special Clinic", "Beimnet Primary Clinic",],
        },
        {
          name:"Woreda 13",
          HF:["Gerji Health Cener","Lalibela Medium Clinic", "Leku Medium Clinic","Giorgis Medium Clinic","Empire Medium Clinic","Worku Belife Medium clinic", "Zagoal Medium Clinic", "Kal Primary Clinic",],
        },
        {
          name:"Woreda 14",
          HF:["Dilfire Health Center","Korea Hospital","KADISCO General Hospital", "Selam Medium Clinic","Adinew Medium Clinic","Ethiopian Standards medium clinic", "EPHRATAN medical clinic", "Tinsie Medium Clinic","ANBESA Medium Clinic", "Arsema Medium Clinic", "Biretabiret Primary clinic","Unity UN Primary Clinic"],
        },
      ],
    },
    {
      name:'Gulele',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Entotofana Health Center", "Abaye medium clinic","Beimnet medium clinic", "Genet Medium Clinic", "Entotomariam Medium Clinic", "Gifti Medium Clinic" ],
        },
        {
          name:"Woreda 02",
          HF:["Mychew Health Center","Entoto Godana Medium Clinic", "Hamerenoh Medium Clinic", "Meskayehizunan medium Clinic", "Yesaq Medium Clinic",  "Addis Ababa University Health Center", "CURE hospital",],
        },
        {
          name:"Woreda 03",
          HF:["Shiromeda Health Center"],
        },
        {
          name:"Woreda 04",
          HF:["Guto Meda Health Center", "AHM Medium Clinic","Medhanealem Medium Clinic","Kibebetsehay Orphanage Center"],
        },
        {
          name:"Woreda 05",
          HF:["Tibeb Bekechene Health Center", "MercyCare Private Health Center","Kuri Medium Clinic","Enat Medium Clinic", ],
        },
        {
          name:"Woreda 06",
          HF:["Addis Hiwot Health Center "],
        },
        {
          name:"Woreda 07",
          HF:["Hidase Health Center","Cheshayer NGO Clinic","kechene Medhanealem medium Clinic", "Berhan ber Medium Clinic",  "Dembel Medium Clinic"],
        },
        {
          name:"Woreda 08",
          HF: ["Addisu Gebeya Health Center", "Global Medium Clinic", "Gulele Police Clinic",],
        },
        {
          name:"Wored 09",
          HF:["Selam Health Center", "Hutyehir Medium Clinic", "Kidus Lukas Medium Clinic", "Kidus Rufael Medium Clinic", "Miraf Medium Clinic", "Dr.kassahun and Mamo Medium Clinic","Yoko MCH Clinic", "Tesefmaryam Medium Clinic"],
        },
        {
          name:"Woreda 10",
          HF:["Shegole Health Center","Boniat Medium Clinic", "Lobie Medium Clinic","National Medium Clinic", "Miheret Medium Clinic"],
        },
        {
          name:"Woreda 11",
          HF:["Awoliya NGO Health Center","Jermet Medium Clinic","Finfine Medium Clinic","Semeyawi Medium Clinic", "Selam Medium Clinic"],
        },
      ],
    },
    {
      name:'Kirkos',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Sunshine Clinic", "Merso Eye Clinic", "Ewun Phsioterapy"],
        },
        {
          name:"Woreda 02",
          HF:["Efoyita Health center","Beham Clinic","Bethezatha Clinic", "Wosenein Clinic", "Tolicha Clinic","Police Clinic", "Bolematemya Clinic", "Rank Clinic",],
        },
        {
          name:"Woreda 03",
          HF:["Gotera Masalecha Health Center", "Alfa Cardiovascular Special Clinic", "Brana Matemia Primary Clinic","Etio Telecom Medium Clinic", "Mekelakeya Construction Medium Clinic", "Senay International  Center", "Mariestopes MCH Center", ],
        },
        {
          name:"Woreda 04",
          HF:["Felege Hiwot HC","Hallelujah General Hospital",  "Tazma medical and surgical center", "Suisse Medium and Pediatrics Speciality Clinic", "Addis Hiwot primary clinic", "Beza No.2 medium clinic",  "Moha Primary Clinic", "Beza Dental Speciality Clinic", "Lulita Dental Speciality Clinic", "Merry Staffs Clinic", "Federal Housing med. clinic", "Addis kidan gyn & obs. spc. clinic"],
        },
        {
          name:"Woreda 05",
          HF:["Feres Meda Health Center","Birhan Clinic", "Kerawoch Clinic", "AA Road Autority Clinic", ],
        },
        {
          name:"Woreda 06",
          HF:["Hiwot Amba  Health center",  "Selam mulu medium clinic", "Hamaressa medium clinic", "land mark general hospital", "Amaga primary clinic", "Shebele speciality clinic","Hewan Obst and Gyn. Clinic" ],
        },
        {
          name:"Woreda 07",
          HF:["Addis Ababa Poly Speciality Clinic", "Ambassador Dental Speciality Clinic", "Bethezatha Advanced Laboratory","Bethezatha General Hospital", "Central Dental Speciality Clinic",  "East Africa Eye Speciality Clinic", "Ethio Canada Diagnostic Center", "Ethiopia Hotel Primary Clinic", "Ethiopian Insurance Corporation Medium Clinic", "Filuha Dirjit Medium Clinic",  "Ghion Hotel Primary Clinic","Ihil Nigd Medium Clinic", "Selam Mulu Medium Clinic", "Sun Optical Eye Speciality Clinic",  "Merahut Internal medicine Medium Clinic", "AAU Commerce Branch Clinic", "Ethiopian Postal Service Primary Clinic","Kidanemihiret Dental Medium Clinic"],
        },
        {
          name:"Woreda 08",
          HF: ["Dr. Abeba dental clinic", "Hilton primary clinic", "Radisson primary clinic", "Enderasie medim clinic", "Ethio medium clinic", "Kazanchis Health center","Mekrez general hospital"],
        },
        {
          name:"Wored 09",
          HF:["Meshualekiya Health center",  "Adera Medical Center", "KT St.Gebreal Internal Speciality Clinic", "Family Guidance Association" ],
        },
        {
          name:"Woreda 10",
          HF:["Zewi Medium Clinic",   "Yishaq Physiotherapy Clinic" ],
        },
        {
          name:"Woreda 11",
          HF:["Kirkos Health Center "],
        },
      ],
    },
    {
      name:'Kolfe Keranyo',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Woreda 01  Health Center", "Afran General Hospital","Aynalem Primary Hospital", "Elnatan Medium Clinic",  "Dildiy  Medium Clinc",   "Cherecher Medium Clinic",   "Warka  Medium Clinic",  "Dani  Medium Clinic", "Hanaba  Medium Clinic", "Dr. Notia Medium Clinic","Lucy Multi Speciality Center"],
        },
        {
          name:"Woreda 02",
          HF:["Repi Medahnalm Medium Clinic", "Debub Hibert Medium Clinic", "Lemma Family Medium Clinic","Bama Gyn/Obs speciality Clinic",  "Al-Amin Primary Clinic",  "Dr. Bilal Medium Clinic"],
        },
        {
          name:"Woreda 03",
          HF:["Woreda 03 Health Center","Ayan Medium Clinic", "Aye Medium Clinic",  "Al-Fewth Medium clinic", "Bewketu Medium Clinic",  "Beteseb Medium Clinic", "Fews Medium Clinic", "Hamad Medium Clinic", "Luqman Medium Clinic", "Liyu Medium Clinic",  "Mame Medium Clinic", "Enat Medium Clinic",  "Nur Medium Clinic", "Raniya lukman Medium Clinic", "Repi Samuna Medium Clinic", "Siham Medium Clinic", "Tebuk Medium Clinic","Makiba Medium Clinic",  "Yisakor Medium Clinic", "Zemen Medium Clinic","Zad Medium Clinic", "Al-Afdel Medium Clinic","Relief-Care Medium Clinic" ],
        },
        {
          name:"Woreda 04",
          HF:["Alembank Health Center","Jerment Gyn/Obs Clinic",  "Afran Medium Clinic", "Ayertena Primary Hospital",  "Reyat pediatric clinic", "Lidya Medium Clinic", "Tesfation Medium Clinic", "Alembank Medium Clinic", "Jemo Pediatric Clinic", "Mulu Medium Clinic", "Andualem Medium Clinic", "Alhayat Medium Clinic", "Melik Medium Clinic","Dr. Ali Medium Clinic", "Betel Medium Clinic", "3s Medium Clinic","Dr. Mohamod Medium Clinic", "Dr. Daniel Medium Clinic", "Dr. Meliha MCH Clinic"],
        },
        {
          name:"Woreda 05",
          HF:["Woreda 05  Health Center", "Yohanes Medium Clinic", "Feysel Medium Clinic"],
        },
        {
          name:"Woreda 06",
          HF:["St. George Medium Clinic","Meba Medium Clinic", "Abed Speciality Clinic",  "Dr. kalid speciality Clinic","Petroyal Medium Clinic", "Danu Medium Clinic", "Care  Medium Clinic", "Betselot Medium Clinic", "Woreda 06 Health Center",  "Michot Medium Clinic" ],
        },
        {
          name:"Woreda 07",
          HF:["Bethel General Teaching Hospital","St. Gebreal Medium Clinic", "Sinehiwot Medium clinic", "Alafiya Medical center", "Bekur Gyn/Obs Clinic",  "Dr.Hadra & Dr Abas Medium Clinic", "Anfo Medium Clinic", "Efoyita Medium Clinic", "Meron Chiled & Pediatrics Clinic", "Selihom Medium Clinic", "Bereka Gyn/Obs Clinic", "Sekina Medium Clinic", "Sumi Gyn and Pediatric Clinic",  "Optimum Physiotherapy Clinic", "Tersis Medium Clinic","Tigist Primary Clinic"],
        },
        {
          name:"Woreda 08",
          HF: ["Keraniyo Health Center","Zowi Medium Clinic",  "St. Arsema Medium Clinic",  "Liyat Medium Clinic",  "Woybila Medium Clinic", "Admas Medium Clinic", "Wabiegzer Medium Clinic" ],
        },
        {
          name:"Wored 09",
          HF:["Woreda 09 Health Center", "Sintayehu Medium Clinic", "Geta Medium Clinic", "TZNA General Hospital", "Police Medium Clinic", "Dr. Shemse Gyn/Obs Clinic", "Fistula Hospital",  "Sitota Medium Clinic", "Mary Stop Medium Clinic",  "Dembel Medium Clinic", "Apex Medical & Sexual Center" ],
        },
        {
          name:"Woreda 10",
          HF:["Paulos Mekbib Medium Clinic", "Arsema Medium Clinic", "Selam Medium Clinic"],
        },
      ],
    },
    {
      name:'Lemi Kura',
      Woreda:[
        {
          name:"Woreda 02",
          HF:["Woreda 02 Health Center","GFB Medium Clinic","Rama Medium Clinic",  "Waka Medium Clinic",  "Oliyad Medium Clinic",   "Hasset Medium Clinic",  "Dr.Yordanos Medium Clinic", "Ayat Star Medium Clinic","Yiscor Medium Clinic",  "Police Maremia Clinic",   "Tanadam Medium Clinic",  "Misgana Medium Clinic", "Yeka Abado Medium Clinic", "Fikre Selam Medium Clinic", "Dr.Wondosen Medium Clinic", "Enat Medium Clinic" ],
        },
        {
          name:"Woreda 03",
          HF:["Meri Health Center","Happy Child Speciality Clinic",  "Hamerno Medium Clinic","Haron Medium clinic", "Univers Medium clinic", "Maya Medium clinic",  "Fikerselam Medium Clinic no 2", "Bemisale 24 Medium Clinic", "Unique  Medium Clinic","Merry Medium Clinic", "Paioner Medium Clinic", "Dessalegn Medium Clinic" ],
        },
        {
          name:"Woreda 04",
          HF:["Arabsa Helth Center","Dr Seyef Medium Clinic", "Wudase Medium Clinic",  "Selihome Medium Clinic", "Arabsa Medium Clinic", "Befinote Medium Clinic"],
        },
        {
          name:"Woreda 05",
          HF:["Summit Health Center", "Biruk sew Medium Clinic", "Mercy Medium Clinic", "SAS Medium Clinic", "Saint Gorger Medium Clinic"],
        },
        {
          name:"Woreda 06",
          HF:["Beki Medium Clinic","Yoham Medium Clinic",  "Benet Medium Clinic",   "Frame Medium Clinic",  "Nubira Medium Clinic" ],
        },
        
        {
          name:"Woreda 08",
          HF: ["Amoraw Health Center", "Fikre Selam Medium Clinic", "Jeruselam Selam  Speciality Clinic", "Dr. Tenagne Medium Clinic",  "Luna Medium Clinic",  "Nova Medium Clinic", "Ghamaronoye Medium Clinic", "Mahdot Medium Clinic", "Pomi Speciality Clinic", "Zebibe Medium Clinic","Negash worku Medium Clinic", "Abichu Medium Clinic", "Ajora MCH Speciality clinic", "Africa Speciality Clinic", "Primary Medium Clinic",  "Dr Saba Medium Clinic", "Yeju Medium Clinic", "Dr.Tigist Medium Clinic",  "Indian Surgical and Internal Medicine Center" ],
        },
        {
          name:"Wored 09",
          HF:["Goro Health Center", "Africa Medium Clinic", "Chris Medium Clinic",  "Curative Primary Clinic", "Dr.Kemila Pediatrics Speciality Clinic",  "Dr.Mulugeta Mediuem Clinic", "Dr.Mohamed Medium Clinic", "Evana Medium Clinic", "Feyesan Medahnialem Medium Clinic", "Florence Medium Clinic", "Getenet Medium Clinic",  "Hailu Getahun Medium Clinic",  "Hibir Medium Clinic", "Kidest Mariyam Mediums Clinic", "Melese Amede Primary Clinic", "Paramedical Medium Clinic", "Sabeh Medium Clinic", "Safe Care Medium Clinic", "Sefera Medium Clinic", "Selase Primary Clinic", "Summit Int. Medium Clinic", "Unity Medium Clinic","Yerer General Hospital" ],
        },
        {
          name:"Woreda 10",
          HF:["Summit Moha Leslasa Medium Clinic", "Hawi Medium Clinic", "Dr.Bekele Medium Clinic", "Galatcy medium clinic", "Hiwot Fana Medium Clinic", "Yitbarek Medium Clinic", "Global Medium Clinic", "Rohobot Medium Clinic", "Meri Medium clinic",  "Yanet General Hospital", "Bilum Children Clinic", "Tebahar Medium Clinic", "Dr.Lelise Medium Clinic" ],
        },
        {
          name:"Woreda 13",
          HF:["Raey Health Center", "ICMC General Hospital",  "American Medic center", "Samaritan Surgical Center", "Ethio Scandic internal Medical  speciality clinic", "Elbetel  Medium Clinic","Eleyob Medium Clinic", "Axon Stroke and Spine Center", "Meri prime Medium Clinic", "Gesund Cardiac and Medical Center", "Selam Children Village Medium clinic"],
        },
        {
          name:"Woreda 14",
          HF:["Yeka Abado Health Center", "Vain Medium clinic", "Amen Medium clinic","Meskelegna MediumClinic", "Dr Habtamu M/Clinic", "Hidase  Heallth Center", "Ayu Primary Hospital","Firdose Medium clinic", "Yegna Tena Medium clinic","Gedra Medium clinic", "Fewse Medium clcinic", "Aresema Primary Clinic "],
        },
      ],
    },
    {
      name:'Lideta',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Hidase Fire Health Center",  "faris medium dentalclinic" ],
        },
        {
          name:"Woreda 02",
          HF:["Dagm Hidase Health center", "Arsema Medium Clinic", "Bethesayda Medium clinic", "Awash weyn teji Medium  Clinic" ],
        },
        {
          name:"Woreda 03",
          HF:["Abinet Health Center","Tad Medium Clinic","East Africa Bottling Share Company (SC) Clinic", "Amin General Hospital", "Lideta Manufacturing College Clinic", "Abinet Medium Clinic",  "Atlas Medium Clinic", "Ethiopia Institute of Architecture Building Construction Clinic", "Finot Medium Dental Clinic" ],
        },
        {
          name:"Woreda 04",
          HF:["Woreda 04 Health Center", "Silk Road Hospital", "Harere Speciality clinic", "Emiran medium clinic",  "Ethiopia national security medium clinic",  "Tropical  medium clinic", "Paragon phyisotherapy clinic" ],
        },
        {
          name:"Woreda 05",
          HF:["Tena Medium Clinic", "Antoli Medium Clinic", "Conile Medium Clinic", "Moha Soft drink Factory Medium  clinic .w5", "Moha Soft Drink Factory Medium Clinic"],
        },
        {
          name:"Woreda 06",
          HF:["Dr. Alazar clinic", "Rooboth  Medium  clinic", "Ethiopia phrmaceutical share company clinic","FOHA  speciality  clinic" ],
        },
        {
          name:"Woreda 07",
          HF:["Tekelehaymanot Health center", "chechela Medium clinic",  "Yordanos orthopedics Hospital", "vision Medium clinic"],
        },
        
        {
          name:"Woreda 08",
          HF: ["General Jagama  kllooHealth center",  "Banks clinic", "Biruk clinic",  "Dr. Fisseha clinic",  "Abed dermatology clinic",  "Dr. Esete midum clinic",  "Rita clerce  midum clinic", "Ethio Ena mag factory clinic", "Mina dental clinic", "Sante dental clinic",  "Nazerawi dental clinic", "Mezmur dental clinic",  "Sam vision optalmology clinic",  "Unique smale dental clinic",  "Dr. Tesfaye midum clinic",  "Awash wine factory clinic",   "International community school clinic",  "International alchohol factory cilnic" ],
        },
        {
          name:"Wored 09",
          HF:["Beletshchew Health center", "Abinet specialty clinic",  "Yehulushet Specialty clinic",  "Niaht Skin Clinic", "BGI Medium clinic",  "Tegbare Ed Low Clinic",  "Vision Specialty Clinic",  "Dr. Tedla Dental Clinic",  "Dr. Zemzem Dental Clinic", "Map Optics Eye Clinic",  "Abeba Dental Clinic",  "Dr. Abdi Dental Clinic", "Betezata Bethic Labaratory service",  "Enetu Home to Home Health", "Fetih Dental Clinic", "Eye Care Optimet Eye Clinic", "Damota Dental Clinic"],
        },
        {
          name:"Woreda 10",
          HF:["Lideta Health Center", "Legehar General Hospital", "Atlas Internal Medicine Speciality Clinic", "United Vission Internal Medicine Speciality  Clinic", "Dr. Abdurhaman Internal Medicine Speciality Clinic", "Addis Kokob Medium Clinic", "War Disability Center Medium  Clinic","Addis Machionery Manufacturing Medium Clinic", "Mychew Medium Clinic",  "Ethiopian Electric Utility Medium clinic", "Ethiopian Petrolium Supply Medium Clinic", "Mirtamanet Primarry Clinic", "Don Dental Number 4 Speciality Dental Clinic",  "Sayan Medium Dental Clinic" ],
        }, 
      ],
    },
    {
      name:'Nifas Silk Lafto',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Nifas silk Lafto  Woreda 1 Health Center",  "Health Net Internal Clinic",  "Amba Medium Clinic",  "Rank Derma clinic",  "Lebu star internal medicine", "Aser Medium Clinic", "Dr. Lemlem No.1 Medium Clinic",  "Physiotherapy Clinic", "Hawi Medium Clinic" ],
        },
        {
          name:"Woreda 02",
          HF:["Nifas Silk Lafto  Woreda 2 Health Center", "Care MCH Center",  "Mestawot MCH Center", "Fuha Medium Clinic", "Dr. Habtamu Medium Clinic",   "Dr. Tgist Medium Clinic",  "Dr. Sisay & Sr. Tsedale Medium Clinic",   "Kore Medium Clinic",   "Jasmin Medium Clinic",  "Amesoda Medium Clinic",  "Adonay Medium Clinic",  "Dr. Habtamu Mekonnen Medium Clinic",  "Cuba-Cur Medium Clinic",  "Zemen Medical Medium Clinic", "Kabgar Medium Clinic" ],
        },
        {
          name:"Woreda 05",
          HF:["Nifas silk Lafto  Woreda 5 H. Center","Berhan selam Intera speciality clinic",  "Gofa kidane Mehiret Medium Clinic",   "Fekir Medium Clinic" ],
        },
        {
          name:"Woreda 06",
          HF:["Nifas Silk lafto W6 H.Center","BMI Medium clinic",   "Dr. Araya Medium clinic",  "MM  Medium clinic",   "Nine MCH  Medium Clinic",  "Shewaye  Medium clinic",  "Sosa Medium clinic", "St.merry internal Medicine Speciality",  "Nine Medium Clinic" ],
        },
        {
          name:"Woreda 07",
          HF:["Family Guidance Association", "Nifas Silk Police Clinic","Coffee prossessing and warehouse clinic" ],
        },
        {
          name:"Woreda 08",
          HF: ["Zenbaba General Hospital","Nifas silk Primary Clinic" ],
        },
        {
          name:"Wored 09",
          HF:["Nifas Silk Lafto W 9 Health Center", "Vision Medium Clinic", "Web Medium Clinic",  "Shedeho Internal specialist Clinic",  "Zagora General Medium Clinic", "Kidanmeret primary clinic",  "Dr Birehanu Asefa Medium Clinic" ],
        },
        {
          name:"Woreda 10",
          HF:["Nifas Silk Lafto W10 Health Center", "Yemeserach Medum linic", "Tana Medum Clinic",  "Lubu MCH Clinic",  "Abicinica Medum Clinic", "Afiya Medium Clinic", "Yergalem Textile Primary Clinic", "Asfaw Beyene Primary Clinic", "Nifas Silk Primary Clinic", "ECAFCO Primary Clinic", "Biskut Primary Clinic",  "Saris Family Guidance  Association Clinic" ],
        }, 
        {
          name:"Woreda 11",
          HF:["Nifas Silk Lafto woreda 11 Health center", "Hana Selihome medium clinic", "Dream medium clinic",  "Dr. Henok medium clinic", "Amen medium clinic", "Abay medium clinic", "Abenezer medium clinic",  "Haile primary clinic",  "Genet primary clinic", "Hilina primary clinic",  "Ghion medium clinic", "Tsiyon Gyne & OBS clinic", "Blend medium clinic",  "Letemariam medium clinic",  "Mulugeta medium clinic", "Bewket medium clinic", "Nardos medium clinic",  "mekuriya medium clinic",  "Dr. Tolera specialty clinic", "Abenezer medium clinic", "Addis Hiwot primary clinic"],
        }, 
        {
          name:"Woreda 12",
          HF:["Nifas Siilk Lafto woreda 12 Health Center", "Mahlet  Medum linic", "Rekik  Medum Clinic", "New Life Medum Clinic", "Mekonnen Medium Clinic", "St.Maryam Medium Clinic",  "Africa Medium  Clinic", "Medhanyalem Medium Clinic", "Addis kidan Medium Clinic",  "St.Michal Medium Clinic", "Dr.Worku Medium Clinic","Dr.Mulugita Medium Clinic" ],
        }, 
        {
          name:"Woreda 13",
          HF:["Dr Haile Internal Medicine Speciality Clinic", "Blatena pediatricd Speciality clinic", "Swift medium Clinic",  "Jemo no 1 Medium Clinic", "Kabgar Medium Clinic", "Tenaye Jemo Medium Clinic", "Mestawot Mefium Clinic", "Dalo Medium Clinic", "Gibe Internal Medicine Speciality Clinic", "Grand Mark Medium Clinic",  "Beteseb Medium Clinic", "Feye Medium Clinic", "Biftu Medium Clinic", "Biftu G.A Medium Clinic", "Debube primary clinic", "Afdel Medium clinic", "Harot Medium Clinic" ],
        },
        {
          name:"Woreda 14",
          HF:["Addis primary clinic","Vision primary clinic",  "Bezalem Medium clinic", "Dawahealth medium clinic", "DAWA1 medium  clinic", "Dawa2 medium clinic", "Shewayrga Medium clinic", "Beteseb Medium clinic", "Tena Medium clinic",  "Selam Medium clinic",  "Sefera Medium clinic",  "Rihan Medium clinic", "Mahir Medium clinic",  "Hemen Medium clinic",  "Ethio maleda medium clinic",  "Ethio health Medium clinic",  "Dr. Delesa medium clinic", "Best Care Medium clinic", "Amen Medium clinic",  "Altar Medium clinic", "Bogale Primary clinic"],
        },
        {
          name:"Woreda 15",
          HF:["Geremew Medium.C", "Saron Medium Clinic",  "Meron Medium Clinic", "Hiwot Medium Clinic", "Germew No 3 Medium clinic"],
        },
      ],
    },
    {
      name:'Yeka',
      Woreda:[
        {
          name:"Woreda 01",
          HF:["Ferensay Akababi Health Center","Biniyam Medium Clinic",  "Merry Ferenassy Medium Clinic",  "Yewedekuten Ansu Medium Clinic"],
        },
        {
          name:"Woreda 02",
          HF:["Entoto Number 2 Health Center",  "Zemen Medium Clinic", "MBA Medium Clinic"],
        },
        {
          name:"Woreda 03",
          HF:["Entoto Number 1 Health Center", "Santa Medium Clinic" ],
        },
        {
          name:"Woreda 04",
          HF:["Korea veterans memorial Health Center", ],
        },
        {
          name:"Woreda 05",
          HF:["Afek internsl medicine speciality clinic", "Afek Internal  Medicine Speciality Clinic",  "Efeson Medium Clinic", "Yegna Medium Clinic",   "Lemaryam Medium Clinc",  "Yeka Health Center"],
        },
        {
          name:"Woreda 06",
          HF:["Kazanchis Yetenesh Metasebia Medium clinic " ],
        },
        {
          name:"Woreda 07",
          HF:["Woreda 07 Health  centrer", "Benus medium  Clinic",  "Migbareseany Hospital", "Arsho international medicine",  "Joy obstetrics  speciality clinic"  ],
        },
        
        {
          name:"Woreda 08",
          HF: ["Yetsehay mengesh metasibya medium clinic","Yeka kiduse michale Medium Clinic",  "Sholla Ber Medium Clinic", "Lealem Medium Clinic",  "Elidana number 2 Medium Clinic", "Ethiopia Turist Treading Entrprise", "Yeka sub-city department",  "Alpha medical and cardiac center",  "Chefe Health center",  "Dinberua Maternal and Child health hospital" ],
        },
        {
          name:"Wored 09",
          HF:["kotebe health center", "Fanose medium clinic",   "Addis Tena medium clinic",   "Emana number 1 medium clinic",   "Rohobot medium clinic",   "Elidina number 1 medium clinic",   "Batefwuse medium clinic",   "Addis Tasefa medium clinic",   "Loza Mariyam medium clinic",   "Rosela medium clinic",   "Faderal Technice ena muya medium clinic",   "Kidest Kidane Mehert medium clinic",   "Emana number 2 medium clinic",   "Kidus geberial medium clinic",  "Lucy medium clinic", "Terses medium clinic",   "Asefa Gobeze medium clinic",  "Maberat Hayele medium  clinic"  ],
        },
        {
          name:"Woreda 10",
          HF:["Woreda 10 Health Center","Eyuela primary  Clinic","Hiwot Medium Clinic", "Etsubdink Medium Clinic", "National lntelligence university College  Medium Clinic", "Beimnet Medium Clinic", "Hana Primary Clinic", "Selam Primary Clinic" , "Beiment Primary Clinic" ],
        }, 
        {
          name:"Woreda 11",
          HF:["Arma Medium Clinic", "Helen Yonatan Abel Yosfe Medium Clinic",  "Tsion Pediatric Clinic", "Misale Medium Clinic", "Betesahil Medium Clinic",  "Yegna Number 2 Medium Clinc", "Ewnet Medium Clinic", "Kotebe university Primary Clinic",  "Debebe Ejeta Medium Clinic", "St. Michael Medium Clinic",  "Yehulum Medium Clinic"  ],
        }, 
        {
          name:"Woreda 12",
          HF:["woreda 12 Heath center", "Ayu Internal medicine Sclinic",  "Zerihun Medium Clinic", "Global Medium Clinic", "Green Medium Clinic","Harar Medium Clinic", "Happy Primary Clinic", "Degesew Wondemagegn Bethany Primary Clinic",  "Karalo Medium Clinic",  "Geberiel  Medium Clinic", "Elberhan Medium Clinic",  "Ultra medical Medium Clinic" ],
        }, 
        {
          name:"Woreda 13",
          HF:["ALTHEA medical Medium Clinic"],
        },
        
      ],
    },
  ];

  const [ EPIWeek, setEPIWeek] = useState("--SubCities--");
  const EPI_Week = [
    
  {Week: 'Week-1'},{Week:'Week-2'},{Week:'Week-3'},{Week:'Week-4'},{Week:'Week-5'},{Week:'Week-6'},{Week:'Week-7'},{Week:'Week-8'},{Week:'Week-9'},{Week:'Week-10'},{Week:'Week-11'},{Week:'Week-12'},{Week:'Week-13'},{Week:'Week-14'},{Week:'Week-15'},{Week:'Week-16'},{Week:'Week-17'},{Week:'Week-18'},{Week:'Week-19'},{Week:'Week-20'},{Week:'Week-21'},{Week:'Week-22'},{Week:'Week-23'},{Week:'Week-24'},{Week:'Week-25'},{Week:'Week-26'},{Week:'Week-27'},{Week:'Week-28'},{Week:'Week-29'},{Week:'Week-30'},{Week:'Week-31'},{Week:'Week-32'},{Week:'Week-33'},{Week:'Week-34'},{Week:'Week-35'},{Week:'Week-36'},{Week:'Week-37'},{Week:'Week-38'},{Week:'Week-39'},{Week:'Week-40'},{Week:'Week-41'},{Week:'Week-42'},{Week:'Week-43'},{Week:'Week-44'},{Week:'Week-45'},{Week:'Week-46'},{Week:'Week-47'},{Week:'Week-48'},{Week:'Week-49'},{Week:'Week-50'},{Week:'Week-51'},{Week:'Week-52'}
    
  ]

  const [ SubCitie, setSubCitie] = useState("--SubCities--");
  const [ Woredas, setWoredas] = useState("--Woreda--");
  const [ HFs, setHFs] = useState("--Health Facility--");
  const [ Woreda, setWoreda] = useState([]);
  const [ HF, setHF] = useState([]);


  const changeSubcity= (event) =>{
    setSubCitie(event.target.value);
    setWoreda(Sub_Cities.find(Ctr => Ctr.name === event.target.value).Woreda);

  }
  const changeWoreda= (event) =>{
    setWoredas(event.target.value);
    setHF(Woreda.find(Woredas => Woredas.name === event.target.value).HF);

  }
   
   
  /*const Woreda  = {
    'Addis Ketema': ['Woreda 01', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06', 'Woreda 08','Woreda 09', 'Woreda 10', 'Woreda 11','Woreda 12', 'Woreda 13', 'Woreda 14'],
    'Akaki Kality': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06',, 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10', 'Woreda 12', 'Woreda 13'],
    'Arada': ['Woreda 01','Woreda 02',  'Woreda 04','Woreda 05', 'Woreda 06',, 'Woreda 07' ,'Woreda 08','Woreda 09'],
    'Bole': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06', 'Woreda 07', 'Woreda 11' , 'Woreda 12', 'Woreda 13', 'Woreda 14'],
    'Gulele': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06', 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10', 'Woreda 11'],
    'Kirkos': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06', 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10', 'Woreda 11'],
    'Kolfe Keranyo': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06', 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10'],
    'Lemi Kura': ['Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06','Woreda 08','Woreda 09', 'Woreda 10', 'Woreda 13', 'Woreda 14'],
    'Lideta': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06',, 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10'],
    'Nifas Silk Lafto': ['Woreda 01','Woreda 02','Woreda 05', 'Woreda 06',, 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10',, 'Woreda 11','Woreda 12', 'Woreda 13', 'Woreda 14' , 'Woreda 15' ],
    'Yeka': ['Woreda 01','Woreda 02', 'Woreda 03', 'Woreda 04','Woreda 05', 'Woreda 06',, 'Woreda 07' ,'Woreda 08','Woreda 09', 'Woreda 10',, 'Woreda 11' , 'Woreda 12', 'Woreda 13']
  }*/
  

  
  //radiobuton //

  //dropdowen//
  const handleshowhide=(event)=>{
    const getuser = event.target.value;    
    setShowhide(getuser);

  }
  //GPS//
  useEffect(() => {
    getLocation();
    getLocationJs();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };

function  multiply (){
var Hight = document.getElementById("Hight").value;
var Weight = document.getElementById("Weight").value;
var BMI = parseFloat(Weight)/parseFloat(Hight);
document.getElementById("BMI").value=BMI;

}
  
 
const [SamColl, setSamColl] = useState("");
const [title, setTitle] = useState("");
useEffect(() => {
  getPdf();
}, []);
const getPdf = async () => {
  const result = await axios.get("http://localhost:3000/get-files");
  console.log(result.data.data);
  setAllImage(result.data.data);
};

const submitImage = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("startDate", startDate);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("CurrLocationJs", CurrLocationJs);
  formData.append("visible", visible);
  formData.append("Sex", Sex);
  formData.append("Age", Age);
  formData.append("HNumber", HNumber);
  formData.append("PWoreda", PWoreda);
  formData.append("pTWoreda", pTWoreda);
  formData.append("PSubCity", PSubCity);
  formData.append("PRegion", PRegion);
  formData.append("WRegion", WRegion);
  formData.append("BDate", BDate);
  formData.append("pname", pname);
  formData.append("visit", visit);
  formData.append("SName", SName);
  formData.append("Eschool", Eschool);
  formData.append("Hfacility", Hfacility);
  formData.append("visite", visite);
  formData.append("PType", PType);
  formData.append("Weight", Weight);
  formData.append("Hight", Hight);
  formData.append("BMI", BMI);
  formData.append("MUAC", MUAC);
  formData.append("PPhone", PPhone);
  formData.append("HRegion", HRegion);
  formData.append("HTRegion", HTRegion);
  formData.append("HSubCity", HSubCity);
  formData.append("THSubCity", THSubCity);
  formData.append("HWoreda", HWoreda);
  formData.append("HFTworeda", HFTworeda);
  formData.append("HFName", HFName);
  formData.append("HFTName", HFTName);
  formData.append("NotifiedDate", NotifiedDate);
  formData.append("OnsetDate", OnsetDate);
  formData.append("Orash", Orash);
  formData.append("MNumber", MNumber);
  formData.append("Vdate", Vdate);
  formData.append("Aepidemics", Aepidemics);
  formData.append("visited", visited);
  formData.append("Treatment", Treatment);
  formData.append("TTreatment", TTreatment);
  formData.append("visiblee", visiblee);
  formData.append("SamColl", SamColl);
  formData.append("Dspeciemen", Dspeciemen);
  formData.append("DspeciemenS", DspeciemenS);
  formData.append("Tspecimen", Tspecimen);
  formData.append("TTspecimen", TTspecimen);
  formData.append("sample", sample);
  formData.append("TypeC", TypeC);
  formData.append("Labresults", Labresults);
  formData.append("SMeasles", SMeasles);
  formData.append("Nmeasles", Nmeasles);
  formData.append("TNmeasles", TNmeasles);
  formData.append("visibleIso", visibleIso);
  formData.append("Isolated", Isolated);
  formData.append("visibles", visibles);
  formData.append("vitaminA", vitaminA);
  formData.append("visiting", visiting);
  formData.append("Complication", Complication);
  formData.append("AdmitedHF", AdmitedHF);
  formData.append("Tcomplications", Tcomplications);
  formData.append("TTcomplications", TTcomplications);
  formData.append("Pfactors", Pfactors);
  formData.append("WPfactors", WPfactors);
  formData.append("DateSR", DateSR);
  formData.append("FCName", FCName);
  formData.append("Phone", Phone);
  formData.append("PNeonat", PNeonat);
  formData.append("Outcome", Outcome);
  formData.append("email", email);
  formData.append("EPIWeek", EPIWeek);
  formData.append("file", file);
  //console.log(title, file);

  const result = await axios.post(
    "http://localhost:3000/MeaslesFile",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(result);
  if (result.data.status == "ok") {
    window.localStorage.clear();
    alert("Uploaded Successfully!!!");
    getPdf();
  }
  setStartDate('')
  setlatitude('')
  setlongitude('')
  setVisible('')
  setSex('')
  setAge('')
  setHNumber('')
  setPWoreda('')
  setpTWoreda('')
  setPSubCity('')
  setPRegion('')
  setWRegion('')
  setBDate('')
  setpname('')
  setvisit('')
  setEschool('')
  setSName('')
  setHfacility('')
  setevisit('')
  setPType('')
  setWeight('')
  setHight('')
  setBMI('')
  setMUAC('')
  setPPhone('')
  setHRegion('')
  setHTRegion('')
  setHSubCity('')
  setTHSubCity('')
  setHWoreda('')
  setHFTworeda('')
  setHFName('')
  setHFTName('')
  setNotifiedDate('')
  setOnsetDate('')
  setOrash('')
  setMNumber('')
  setVdate('')
  setAepidemics('')
  setvisited('')
  setvisitedF('')
  setTreatment('')
  setTTreatment('')
  setVisiblee('')
  setDspeciemen('')
  setDspeciemenS('')
  setTspecimen('')
  setTTspecimen('')
  setsample('')
  setTypeC('')
  setLabresults('')
  setSMeasles('')
  setNmeasles('')
  setTNmeasles('')
  setVisibleIso('')
  setIsolated('')
  setVisibles('')
  setvitaminA('')
  setvisiting('')
  setComplication('')
  setAdmitedHF('')
  setTcomplications('')
  setTTcomplications('')
  setPfactors('')
  setWPfactors('')
  setCRFP('')
  setDateSR('')
  setFCName('')
  setPhone('')
  setPict('')
  setPNeonat('')
  setOutcome('')
  setEmail('')
  setEPIWeek('')
  setfile('')

};


// const Upload= (event) => {
//   event.preventDefault();
//   const formData = new FormData()
//   formData.append('Measle' , file)
//   axios.post('http://localhost:3000/MeaslesFile',formData)
//   .then(res =>console.log(res))
//   .catch(er=>console.log(er))
//   alert('Upload File successful')

  
// }
//   const handleSubmit = (e) =>{
//     e.preventDefault();
//     axios.post('http://localhost:3000/Measles',{startDate,Latitude,Longitude,visible,Sex,Age,HNumber,PWoreda,pTWoreda,PSubCity,PRegion,WRegion,BDate,pname,visit,Eschool,SName,Hfacility,visite,PType,Weight,Hight,BMI,MUAC,PPhone,HRegion,HTRegion,HSubCity,HWoreda,HFTworeda,HFName,HFTName,NotifiedDate,OnsetDate,Orash,MNumber,Vdate,Aepidemics,visited,Treatment,TTreatment,visiblee,Dspeciemen,DspeciemenS,Tspecimen,TTspecimen,sample,TypeC,Labresults,SMeasles,Nmeasles,TNmeasles,visibleIso,Isolated,visibles,vitaminA,visiting,Complication,AdmitedHF,Tcomplications,Pfactors,WPfactors,DateSR,FCName,Phone,PNeonat,Outcome,email,EPIWeek})
//     .then(result =>console.log(result)) 
//     .catch(err => console.log(err))
//   }
  
  ///////////////////////////selection option from mongo/////////////
const currentPage=useRef();
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/Facility-info")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"Facility list")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    
  }, []);
/////////////////////////////////////////serchable by name  text box /////////////////////////////////////////////////////////
  
// const [data, setData] = useState([]);
// const [searchQuery,setSearchQuery]=useState("")

// useEffect(() => {
//   getAllUser();
// },[searchQuery]);

// //fetching all user
// const getAllUser = () => {
//   fetch(`http://localhost:5000/getAllUserH?search=${pname}`, {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data, "userData");
//       setData(data.data);
//     });
// };

//////////////////////////////////////////multiple selection////////////////////////
  
    const  handleOnchangespec  =  val  => {
      setTspecimen(val)
    }
    const  optionsspec  = [
      { label:  'Stool', value:  'Stool'  },
      { label:  'Blood', value:  'Blood'  },
      { label:  'Serum', value:  'Serum'  },
      { label:  'CSF', value:  'CSF'  },
      { label:  'Throat swab', value:  'Throat swab'  },
    ]



  return (
    <>
    <div className=' bgcoll    main-containers  '>
    
      <form onSubmit={submitImage}>
      <div class='row'>
        <div className=' col bg-light rounded border border-danger vh-1 text-dark p-2'>
          <h4 className='border border-secondary bgcoll text-white rounded text-center'>Measles patient information</h4>
          <table className='table-responsive'>
        <tr className='border border-secondary'>
         
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email"> Date of form filled</label><br></br>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} 
                    dateFormat='dd/MM/yyyy'                    
                    maxDate={new Date()}
                    isClearable 
                    readOnly  
                    showIcon 
                    className='form-control justify-center rounded-lg w-70 text-3x1'              
                  />
                  </h6>
                </div>
              </th>
              <th> <div className='mb-0'>
                <h6><label htmlFor="email">GPS/if patient at home</label>
                  <p onChange={(e) => setlatitude(e.target.value) }>Latitude: {currLocation.latitude}</p>
                  <p onChange={(e) => setlongitude(e.target.value) }>Longitude: {currLocation.longitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
                <div  className='form-check-inline p-2'>
                  <h6><label htmlFor="email">Sex</label><br></br>
                 <th className='p-3'><h6> Male</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setVisible(true)} onChange={(e) => setSex(e.target.value)} /></th>
                 <th className='p-3'><h6>Female</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setVisible(false)} onChange={(e) => setSex(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Age</label>
                  <input type="Decimal" placeholder="Age" autoComplete="off" name="Age" value={Age} className='form-control justify-center rounded-lg w-90 text-3x1 p-2'
                    onChange={(e) => setAge(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient House  Number </label>
                  <input type="number" placeholder="House Numbe Name" autoComplete="on" name="House Numbe" value={HNumber} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHNumber(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Residency Woreda</label>
                  <select type="text" className='form-control rounded-3 w-50 mb-2' onChange={(e)=>(handleshowhide(e),setPWoreda(e.target.value))}  >
                  <option value="" selected disabled >-- Select--</option>
                    <option value="woreda 01">woreda 01</option>
                    <option value="woreda 02">woreda 02</option>
                    <option value="woreda 03">woreda 03</option>
                    <option value="woreda 04">woreda 04</option>
                    <option value="woreda 05">woreda 05</option>
                    <option value="woreda 06">woreda 06</option>
                    <option value="woreda 07">woreda 07</option>
                    <option value="woreda 08">woreda 08</option>
                    <option value="woreda 09">woreda 09</option>
                    <option value="woreda 10">woreda 10</option>
                    <option value="woreda 11">woreda 11</option>
                    <option value="woreda 12">woreda 12</option>
                    <option value="woreda 13">woreda 13</option>
                    <option value="woreda 14">woreda 14</option>
                    <option value="woreda 15">woreda 15</option>
                    <option value="1">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='1' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Name of Woreda</label></h6>
                  <input type="text" placeholder="Name of Woreda"  value={pTWoreda} autoComplete="off" name="Name of Woreda" className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
                  )}           

              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Zone | Sub City</label>
                  <select type="text" className='form-control rounded-2 w-70' onChange={(e)=> setPSubCity(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Akaki Sub City">Akaki Sub City</option>
                    <option value="Addis Ketema Sub city">Addis Ketema Sub city</option>
                    <option value="Arada Sub city">Arada Sub city</option>
                    <option value="Bole sub city">Bole sub city</option>
                    <option value="Gulele Sub city">Gulele Sub city</option>
                    <option value="kirkos sub city">kirkos sub city</option>
                    <option value="kolife keranio sub city">kolife keranio sub city</option>
                    <option value="Other">Nifas silik lafto sub city</option>
                    <option value="Nifas silik lafto sub city">lemi kura sub city</option>
                    <option value="lideta sub city">lideta sub city</option>
                    <option value="yeka sub city">yeka sub city</option>
                    
                  </select></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Patient Residency Region</label>
                  <select type="text" className='form-control rounded-2 w-70' onChange={(e)=> setPRegion(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option defaultValue="Addis Ababa">Addis Ababa</option>
                    <option value="Oromya">Oromya</option>
                    <option value="Dire Dawa"> Dire Dawa</option>
                    <option value="Afar Region">Afar Region</option>
                    <option value="Amhara Region">Amhara Region</option>
                    <option value="Benishangul-Gumuz Region">Benishangul-Gumuz Region</option>
                    <option value="Gambela Region">Gambela Region</option>
                    <option value="Harari Region">Harari Region</option>
                    <option value="Sidama Region">Sidama Region</option>
                    <option value="Somali Region">Somali Region</option>
                    <option value="South Ethiopia Regional State">South Ethiopia Regional State</option>
                    <option value="South West Ethiopia Peoples' Region">South West Ethiopia Peoples' Region</option>
                    <option value="Tigray Region">Tigray Region</option>
                    <option value="2">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='2' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Residency Region</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Name of Region" value={WRegion} className='form-control rounded-2 w-70'
                    onChange={(e) => setWRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th> <div className='mb-2'>
              <h6><label htmlFor="email">Location when symptom started</label>
                  <p onChange={(e) => setlatitude(e.target.value)} >Latitude: {currLocation.latitude}</p>
                  <p onChange={(e) => setlongitude(e.target.value)}>Longitude: {currLocation.longitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Date of Berth</label><br></br>
                  <DatePicker selected={BDate} onChange={(date) => setBDate(date)} 
                    dateFormat='dd/MM/yyyy'                    
                    maxDate={new Date()}
                    isClearable
                    showMonthDropdown
                    showYearDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-70 text-3x1'
                   /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Name of Patient</label>
                  <input type="text" placeholder=" Name of Patient" autoComplete="off"  name=" Name of Patient" className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setpname(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2 form-check-inline'>
                <h6> <label htmlFor="email"> Child enrolled in school</label><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='Child' value='Yes' onClick={ ()=>setvisit(true)} onChange={(e) =>setEschool(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='Child' value='No'onClick={ ()=>setvisit(false)} onChange={(e) => setEschool(e.target.value)} /> </th></h6>
                </div>
                { visit &&

                    <div className="form-group row">
                   <h6> <label htmlFor="email">IF Yes name of the school</label>
                  <input type="text" placeholder="name of the school" autoComplete="off" name="name of the school" value={SName} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setSName(e.target.value)} /></h6>
                    </div>
                    
                    }
              </th>
              </tr>
              <tr className='border border-secondary'>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date seen at health facility</label><br></br>
                  <DatePicker selected={DseenHF} onChange={(date) => setDseenHF(date)} 
                  dateFormat='dd/MM/yyyy'
                  
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 showIcon
                 className='form-control justify-center rounded-lg w-70 text-3x1'
                  /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2 form-check-inline'>
                <h6><label htmlFor="email">patient Type</label><br></br>
                  <th className='p-3'><h6>Inpatient (I)</h6><input type="radio" name='patient' value='Inpatient (I)'  onClick={ ()=>setevisit(true)} onChange={(e) => setPType(e.target.value)} /> </th>
                 <th className='p-3'><h6>outpatient(O)</h6> <input type="radio" name='patient' value='outpatient(O)'onClick={ ()=>setevisit(false)} onChange={(e) => setPType(e.target.value)} /> </th>
                 </h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Hight in (M)</label>
                  <input type="Number" placeholder="Hight" autoComplete="off" name="Hight"  id="Hight"  className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHight(e.target.value)}/></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Weight in(Kg)</label>
                  <input type="Number" placeholder="Weight" autoComplete="off" name="Weight" id="Weight"  className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) =>(multiply() ,setWeight(e.target.value))} />
               </h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Body Mass Index (BMI) in(bmi)</label>
                  <input type="Number" placeholder="Hight" autoComplete="off" name="BMI"  id="BMI" defaultValue={BMI} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setBMI(e.target.value)} readOnly/></h6>
                </div>
              </th>
              <th></th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">MUAC in CM</label>
                  <input type="Number" placeholder="MUAC" autoComplete="off" name="MUAC" value={MUAC} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setMUAC(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone Number</label>
                  <input type="Number" placeholder="Enter Phone Number" autoComplete="off" value={PPhone} name="Phone Number" className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPPhone(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              </table>
        </div>
        <div className='col-md-6 bg-white rounded p-0 border border-danger text-dark p-2 '>
          <h4 className='border border-secondary  rounded bgcoll text-white text-center'>Measles Health Facility information</h4>
          <table className='border border-secondary'>
            <tr>
            <th> <div className='mb-2'>
            <h6><label htmlFor="email">GPS/if patient at home</label>
                  <p onChange={(e) => setlatitude(e.target.value)}>Latitude: {currLocation.latitude}</p>
                  <p onChange={(e) => setlongitude(e.target.value)}>Longitude: {currLocation.longitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
              <div>
            <label><h5>Region | ጤና ተቋሙ የሚገኝበት ክልል</h5></label>
            <select 
             id="Region"
             placeholder="select the Region"
             value={HRegion}
             required
            onChange={(e)=>setHRegion(e.target.value)} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HRegion}</option>})
                }
                <option value="7">Other</option>
            </select>
            </div>
                {
                  showhide==='7' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Region</label>
                  <input type="text" placeholder=" Region.." autoComplete="off"  name="Facility Name" value={HTRegion} className='form-control rounded-0 w-50'
                    onChange={(e) => setHTRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div>
                        <label><h5> Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h5></label>
                        <select 
                        id="Sub City"
                        placeholder="select the Sub City"
                        value={HSubCity}
                        required
                        
                        onChange={(e)=>(handleshowhide(e),setHSubCity(e.target.value))} className='form-control rounded-2 w-50'>
                            <option value="" selected disabled >-- Select--</option>
                            {
                                values.map((opts,i)=>{return <option key={i}>{opts.HSubCity}</option>})
                            }
                            <option value="8">Other</option>
                        </select>
                        </div>
                {
                  showhide==='8' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Sub-City</label>
                  <input type="text" placeholder=" Sub-City.." autoComplete="off"  value={THSubCity} name="Facility Name" className='form-control rounded-0 w-50'
                    onChange={(e) =>(handleshowhide(e), setTHSubCity(e.target.value))} /></h6>
                    </div>
                  )}           
                
              </th>
              
              <th>
              <div>
            <label><h5> Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h5></label>
            <select 
             id="Woreda"
             placeholder="select Woreda"
             value={HWoreda}
             required
            onChange={(e)=>(handleshowhide(e),setHWoreda(e.target.value))} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HWoreda}</option>})
                }
                <option value="9">Other</option>
            </select>
            </div>
                
                {
                  showhide==='9' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Woreda if not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTworeda} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setHFTworeda(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div>
            <label><h5>Reporting Health Facility Name | የጤና ተቋሙ ስም</h5></label>
            <select 
             id="HName"
             placeholder="select the title"
             value={HFName}
             required
            onChange={(e)=>(handleshowhide(e),setHFName(e.target.value))} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HFName}</option>})
                }
                <option value="10">Other</option>
            </select>
            
            </div>
                {
                  showhide==='10' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Specify if name of health facility is not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTName} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setHFTName(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              <th>
                <div className='mb-2 p-4'>
                <h6> <label htmlFor="email"> Date Health Facility notified Woreda/ zone</label><br></br>
                <DatePicker selected={NotifiedDate} onChange={(date) => setNotifiedDate(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                    showMonthDropdown
                    showYearDropdown
                    className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
            </tr>
          </table>
        </div>
        <div className=' col w-5 bg-white rounded p-3 border border-danger h6 text-dark '>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Measles Reporting Format</h4>
          <table className='Scrol-Table'>
            <tr className='border border-secondary'>
            <th>
                <div className='mb-5'>
                <h6> <label htmlFor="email">Date of onset </label><br></br>
                  <DatePicker selected={OnsetDate} onChange={(date) => setOnsetDate(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                 /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of onset of rash</label><br></br>
                <DatePicker selected={Orash} onChange={(date) => setOrash(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Number of Measles vaccine/TT doses received</label>
                <select type="text" className='form-control rounded-0 w-70' value={MNumber} onChange={(e)=>(handleshowhide(e), setMNumber(e.target.value))}>
                <option value="" selected disabled >-- Select--</option>
                    <option value="First Dose">First Dose</option>
                    <option value="Second Dose">Second Dose</option>
                    <option value="Third Dose / Fist Dose + Second Dose">Third Dose / Fist Dose + Second Dose</option>
                    <option value="Unknown vaccination status">Unknown vaccination status</option>
                    <option value="Not Vaccinated">Not Vaccinated</option> 
                  </select>
                  </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Date of last vaccination</label><br></br>
                <DatePicker selected={Vdate} onChange={(date) => setVdate(date)} 
                  dateFormat='dd/MM/yyyy'
                  showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Associated with epidemics</label>
                <th className='p-3'><h6>Yes</h6><input type="radio" name='epidemics' value='Yes' onClick={ ()=>setvisitedF(true)} onChange={(e) =>setAepidemics(e.target.value)} /> </th>
                  <th className='p-3'><h6>Not</h6><input type="radio" name='epidemics' value='No'onClick={ ()=>setvisitedF(false)} onChange={(e) => setAepidemics(e.target.value)} /> </th>
                  </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Treatment given </label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='Treatment' value='Yes' onClick={ ()=>setvisited(true)} onChange={(e) =>setTreatment(e.target.value)} /> </th>
                  <th className='p-3'><h6>Not</h6><input type="radio" name='Treatment' value='No'onClick={ ()=>setvisited(false)} onChange={(e) => setTreatment(e.target.value)} /> </th>
                </div>
                { visited &&

                    <div className="form-group row">
                    <h6><label htmlFor="email">If yes (specify)</label>
                  <input type="text" placeholder="name of the school" autoComplete="off" name="name of the school" value={TTreatment} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setTTreatment(e.target.value)} /></h6>
                    </div>
                    
                    }
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">  Is sample collected ?</label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='sample' value='Yes'onClick={ ()=>setVisiblee(true)} onChange={(e) => setSamColl(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='sample' value='No'onClick={ ()=>setVisiblee(false)} onChange={(e) => setSamColl(e.target.value)} /> </th>
                  
                </div>
              </th>
             
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of speciemen collected:</label><br></br>
                <DatePicker selected={Dspeciemen} onChange={(date) => setDspeciemen(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
                </th>
                
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of speciemen sent to lab</label><br></br>
                <DatePicker selected={DspeciemenS} onChange={(date) => setDspeciemenS(date)} 
                  dateFormat='dd/MM/yyyy'
                showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
                </th>
                 <th>
                  <div className="app">
                  <div  className="preview-values">
                  <h6>Type of specimen</h6>
                  {Tspecimen}
                  </div>
                  <MultiSelect
                  value={Tspecimen}
                  Searchable
                  onChange={(e)=>(handleOnchangespec(e), setTspecimen(e.target.value))}
                  options={optionsspec}
                  className='form-control rounded-3 w-100'
                   />           
                </div>
                </th>
              <th>
                
            
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If other specify</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Facility Name" value={TTspecimen} className='form-control rounded-2 w-75'
                    onChange={(e) => setTTspecimen(e.target.value)} /></h6>
                    </div>
        
              </th>             
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Lab. Tests/ sample taken</label>
                  <input type="text" placeholder="epidemics" autoComplete="off" name="Residential Area" value={sample} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setsample(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Type of case:</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={TypeC} onChange={(e) => setTypeC(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="suspected case">suspected case</option>
                    <option value="confirmed cas">confirmed cas</option>
                    <option value="Ep-linked">Ep-linked </option>
                   
                  </select></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Lab results</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Labresults} onChange={(e) => setLabresults(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Positive for measele">Positive for measele</option>
                    <option value="positive for rubella">positive for rubella</option>
                    <option value="Negative for both">Negative for both</option>
                    <option value="pending">pending </option>
                  </select></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Sign of Measles</label>
                  <select type="text" className='form-control rounded-2 w-75' value={SMeasles} onChange={(e)=>(handleshowhide(e), setSMeasles(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Fever">Fever</option>
                    <option value="Cough">Cough</option>
                    <option value="Rash"> Rash</option>
                    <option value="conjuctivities">conjuctivities</option>
                    <option value="Coryza">Coryza</option>                   
                  </select></h6>
                </div>           
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">No of valid measles doses:</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Nmeasles} onChange={(e) => setNmeasles(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="Unknown">Unknown</option>
                    
                  </select></h6>
                </div>               
              </th>
                       
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">If yes/last vaccination date:</label><br></br>
                <DatePicker selected={Hfacility} onChange={(date) => setHfacility(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">  Isolated ?</label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='Isolated' value='Yes'onClick={ ()=>setVisibleIso(true)} onChange={(e) => setIsolated(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='Isolated' value='No'onClick={ ()=>setVisibleIso(false)} onChange={(e) => setIsolated(e.target.value)} /> </th>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <label htmlFor="email">  <h6> vitamin A supplement</h6></label><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='vitamin' value='Yes'onClick={ ()=>setVisibles(true)} onChange={(e) => setvitaminA(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='vitamin' value='No'onClick={ ()=>setVisibles(false)} onChange={(e) => setvitaminA(e.target.value)} /> </th>
                  
                </div>
              </th>
              </tr>
             <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Complication</label>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='Complication' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) =>setComplication(e.target.value)}  /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='Complication' value='No'onClick={ ()=>setvisiting(false)} onChange={(e) =>setComplication(e.target.value)}  /> </th>
                  </h6>
                </div>
                { visiting &&
                  <div className="form-group row">
                  <h6><label htmlFor="email"> If has complcation Admited Health Facility:</label>
                  <input type="text" placeholder="Admited Health Facility" autoComplete="off" name="Admited Health Facility" value={AdmitedHF} className='form-control justify-center rounded-lg h-50 w-50 text-3x1'
                    onChange={(e) => setAdmitedHF(e.target.value)} /></h6>
                  </div>
                  }
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Type of complications:</label>
                    <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Tcomplications} onChange={(e)=>(handleshowhide(e),setTcomplications(e.target.value))}>
                    <option Value="" selected disabled >-- Select--</option>
                    <option value="Pneumonia">Pneumonia</option>
                    <option value="S.Pneumonia">S.Pneumonia</option>
                    <option value="Mild pneumonia">Mild pneumonia</option>
                    <option value="7">Other</option>
                  </select></h6>
                  {
                  showhide==='7' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Name of Potential risk factors:</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={TTcomplications} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setTTcomplications(e.target.value)} /></h6>
                    </div>
                  )}  
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Potential risk factors:</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Pfactors} onChange={(e)=>(handleshowhide(e),setPfactors(e.target.value))}>
                  <option Value="" selected disabled >-- Select--</option>
                    <option value="crowdness">crowdness</option>
                    <option value="lack of immunization">lack of immunization</option>
                    <option value="poor case mgt">poor case mgt</option>
                    <option value="malnerished">malnerished </option>
                    <option value="comorbidity &other"> comorbidity &other</option>
                    <option value="8">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='8' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Name of Potential risk factors:</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={WPfactors} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setWPfactors(e.target.value)} /></h6>
                    </div>
                  )}           

              </th>
              
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Date sent to region/submission to server</label><br></br>
                <DatePicker selected={DateSR} onChange={(date) => setDateSR(date)} 
                  dateFormat='dd/MM/yyyy'
                 showIcon
                 maxDateDate={new Date()}
                 isClearable
                 showYearDropdown
                 showMonthDropdown
                 className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Name of officer completing the form:</label>
                  <input type="text" placeholder="Enter Phone Number" autoComplete="off" name="Phone Number" value={FCName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setFCName(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone number of officer completing form:</label>
                <PhoneInput
              placeholder="Enter phone number"
              value={Phone}
              onChange={setPhone}/>
                  </h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div >
                <h6><label htmlFor="email">the patient is neonate or child,write full name of mother and father</label>
                  <input type="text" placeholder="Enter name of mother and father" autoComplete="off" name="name of mother and father" value={PNeonat} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setPNeonat(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div>
                <h6><label htmlFor="email">Outcome of the patient at the time of report</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Outcome} onChange={(e) => setOutcome(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Alive">Alive</option>
                    <option value="Recover">Recover</option>
                    <option value="On treatment">On treatment</option>
                    <option value="Dead">Dead</option>
                    
                  </select></h6>
                </div>
              </th>
              <br />
              <th>
                <div>
                <h6><label htmlFor="email">Email</label>
                  <input type="text" placeholder="Principal Name" autoComplete="off" name="email" value={email} className='form-control rounded-0 w-75'
                    onChange={(e) => setEmail(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-5'>
                <h6><label htmlFor="email">EPI_Week</label>
                  <select type="number" className='form-control justify-center rounded-lg w-75 text-3x1' value={EPIWeek} onChange={(e)=>setEPIWeek(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    { EPI_Week .map(Ctr => (
                      <option value={Ctr.Week}>{Ctr.Week}</option>
                    ))}
                  </select></h6>
                </div>
              </th>
              
              <th>
              <div className='mb-5'>
              <h6><label htmlFor="email">Choose a photo to be uploaded</label><br />
                  <input type='file' name='file'   accept="application/pdf" onChange={(e) => setfile(e.target.files[0])} required multiple/><br></br>
                  
                  </h6></div>
              </th>
            </tr>
          </table>
          <button className='btn btn-info border w-15  rounded-3 bgcoll text-white' onClick={submitImage}><h5>Submit</h5></button>      
           </div>
           </div>    
            </form>
           </div>
      
  
    </>
  )
}

export default Measles
