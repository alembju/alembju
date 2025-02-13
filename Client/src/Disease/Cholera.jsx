import { useEffect, useState } from 'react'
//import '../Client/bootstrap/dist/css/bootstrap.min.css'
//import DateRangePickerComp from '../components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//import './App.css'
import '../Admin_Component/Navbar.css'
import axios from 'axios'
import { useRef } from "react";
import { pdfjs } from "react-pdf";
import PhoneInput from 'react-phone-number-input'
import '../CholeraPoup/CholeraPoup.css'
import '../CholeraCasepopup/CholeraCasepopup.css'
import CholeraMiniPoup from '../CholeraPoup/CholeraMiniPoup.jsx'
import CholeraCasepopup from '../CholeraCasepopup/CholeraCasepopup.jsx'
import CholeraContactPopup from '../CholeraContact/CholeraContactPopup.jsx'
import ReactFlagsSelect from "react-flags-select";
//import Dowenload from './Dowenload.jsx'
import Header from '../Header.jsx'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Cholera () {
  const [startDate, setStartDate] = useState(new Date())
  const [pname, setpname] = useState({});
  const [MRN, setMRN] = useState({});
  const [Age, setAge]=useState("");
  const [Sex, setSex] = useState({});
  const [Pregnancy, setPregnancy] = useState("");
  const [PPhone,setPPhone]=useState("")
  const [PRegion, setPRegion] = useState("")
  const [TRegion, setTRegion] = useState("")
  const [PSubCity, setPSubCity] = useState("")
  const [PWoreda, setPWoreda] = useState("")
  const [pTWoreda,setpTWoreda] =useState("")
  const [SpecificA,setSpecificA] =useState("")
  const [Ketena,setKetena] =useState("")
  const [HNumber , setHNumber] = useState("");
  const [POccupation , setPOccupation] = useState("");
  const [TPOccupation , setTPOccupation] = useState("");
  const [AddPatientInfo , setAddPatientInfo] = useState("");
  const [HRegion,setHRegion] = useState("")
  const [HTRegion,setHTRegion] = useState("")
  const [HSubCity, setHSubCity] =useState("")
  const [THSubCity, setTHSubCity] =useState("")
  const [HWoreda, setHWoreda] = useState("")
  const [HFTworeda, setHFTworeda] = useState("")
  const [HFName,setHFName] =useState("")
  const [HFTName,setHFTName] =useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [DSHfacility, setDSHfacility] = useState("")
  const [ODisease, setODisease] = useState("")
  const [PClinical, setPClinical] = useState("")
  const [TPClinical, setTPClinical] = useState("")
  const [Dehydration, setDehydration] = useState("")
  const [TDehydration, setTDehydration] = useState("")
  const [Sample, setSample] = useState("")
  const [DSample, setDSample] = useState("")
  const [DTSample, setDTSample] = useState("")

  const [Ttest, setTtest] = useState("")
  const [RDTTtest, setRDTTtest] = useState("")
  const [RTTtest, setRTTtest] = useState("")


  const [Ccategory, setCcategory] = useState("")
  const [PHstatus, setPHstatus] = useState("")
  const [TPHstatus, setTPHstatus] = useState("")
  const [Travel, setTravel] = useState("")
  const [TTravel, setTTravel] = useState("")
  const [TTTravel, setTTTravel] = useState("")
  const [Priskarea, setPriskarea]=useState(new Date())
  const [TPriskarea,setTPriskarea]=useState("")
  const [PChistory, setPChistory]=useState("");
  const [TPChistory,setTPChistory]=useState("")
  const [TTPChistory,setTTPChistory]=useState("")
  const [PCOhistory,setPCOhistory]=useState(new Date())
  const [Foodexposure,setFoodexposure]=useState("")
  const [TFoodexposure, setTFoodexposure] = useState("")
  const [WaterS,setWaterS]=useState('')
  const [TWaterS,setTWaterS]=useState("")
  const [PModeA,setPModeA]= useState("")
  const [Referral,setReferral]=useState("")

  const [Treatment,setTreatment] = useState("")
  const [ACTC,setACTC] = useState("")
  const [TACTC,setTACTC] = useState("")
  const [Adate,setAdate] = useState(new Date())
  const [Ddate,setDdate] = useState(new Date())
  const [Outcome,setOutcome]=useState("")
  const [TOutcome,setTOutcome]= useState("")
  const [Rdate,setRdate]=useState(new Date())
  const [CoMorbidity,setCoMorbidity] = useState("")
  const [TCoMorbidity, setTCoMorbidity]=useState(false);
  const [TTCoMorbidity, setTTCoMorbidity]=useState(false);

  const [STTCoMorbidity,setSTTCoMorbidity]= useState("")
  const [LComplication,setLComplication]= useState("")
  const [Complication,setComplication]=useState("")

  const [Nutrition,setNutrition]=useState("")
  const [MUAC, setMUAC] = useState("")
  const [Disinfection,setDisinfection]=useState("")
  const [Vaccination, setVaccination] = useState()
  const [DCName, setDCName]=useState("");
  const [Phone,setPhone]=useState("")
  const [file , setfile] = useState("");
  ////////////////////CholeraCasepopup////////////////
  const [Holywater,setHolywater]=useState("")
  const [THolywater,setTHolywater]=useState("")
  const [FContainers,setFContainers]=useState("")
  const [TFContainers, setTFContainers] = useState("")
  const [LastFiveDaysF,setLastFiveDaysF]=useState("")
  const [Cooking, setCooking] = useState()
  const [LeftoverFood, setLeftoverFood]=useState("");
  const [TLeftoverFood,setTLeftoverFood]=useState("")
  const [OThome , setOThome] = useState("");
  const [TOThome, setTOThome] = useState()
  const [ActualLocation, setActualLocation]=useState("");
  const [RawFood,setRawFood]=useState("")
  const [TRawFood , setTRawFood] = useState("");
  const [TRawFoodwater, setTRawFoodwater] = useState()
  const [TTRawFoodwater, setTTRawFoodwater]=useState("");
  const [WaterConsumed,setWaterConsumed]=useState("")
  const [TWaterConsumed , setTWaterConsumed] = useState("");
  const [TTWaterConsumed, setTTWaterConsumed] = useState()
  const [WaterTreat, setWaterTreat]=useState("");
  const [DContainers,setDContainers]=useState("")
  const [TDContainers , setTDContainers] = useState("");


  //////////////////////CholeraPoup///////////////////////////////
  const [WStaying,setWStaying]=useState("")
  const [Income,setIncome]=useState("")
  const [Religion,setReligion]=useState("")
  const [TReligion, setTReligion] = useState("")
  const [Educational,setEducational]=useState("")
  const [FamilyS, setFamilyS] = useState()
  const [UnderF, setUnderF]=useState("");
  const [Information,setInformation]=useState("")
  const [TInformation , setTInformation] = useState("");
  const [TTInformation, setTTInformation] = useState()
  const [CoMorbidFM, setCoMorbidFM]=useState("");
  const [TsetCoMorbidFM,setTsetCoMorbidFM]=useState("")
  const [SimilarC , setSimilarC] = useState("");
  const [TreatmentF, setTreatmentF] = useState()
  const [Latrine, setLatrine]=useState("");
  const [TLatrine,setTLatrine]=useState("")
  const [LatrineU , setLatrineU] = useState("");
  const [Lenvironment, setLenvironment] = useState()
  const [Odefecation, setOdefecation]=useState("");
  const [WasteDisposal,setWasteDisposal]=useState("")
  const [Flies , setFlies] = useState("");
  const [Hygienic, setHygienic]=useState("");
  const [HandWashing,setHandWashing]=useState("")
  const [Observations , setObservations] = useState("");
  const [Recommendations, setRecommendations]=useState(false);
  const [AddContactInfo, setAddContactInfo]=useState(false);

  //////////////////////Cholera Contact Popup///////////////////////////////
  const [ppname,setppname]=useState("")
  const [Cname,setCname]=useState("")
  const [CSex,setCSex]=useState("")
  const [CAge, setCAge] = useState("")
  const [LContactDate,setLContactDate]=useState(new Date())
  const [EnrolmentDate, setEnrolmentDate] = useState(new Date())
  const [selected, setSelected] = useState("");
  const [CRegion, setCRegion]=useState("");
  const [TCRegion,setTCRegion]=useState("")
  const [CSubCity , setCSubCity] = useState("");
  const [District, setDistrict] = useState()
  const [CKebele, setCKebele]=useState("");
  const [CHNumber,setCHNumber]=useState("")
  const [CPhone , setCPhone] = useState("");
  const [CLatitude, setCLatitude] = useState()
  const [CLongitude, setCLongitude]=useState("");
  const [COccupation,setCOccupation]=useState("")
  const [TCOccupation , setTCOccupation] = useState("");
  const [Pwork, setPwork] = useState()
  const [Tcontact, setTcontact]=useState("");
  const [Syptomatic,setSyptomatic]=useState("")
  const [ExpectedDate , setExpectedDate] = useState(new Date());
  const [COutcome, setCOutcome]=useState("");
  const [AgeCategory,setAgeCategory]=useState("")
  const [EpiWeek , setEpiWeek] = useState("");
  const [TracerTeam, setTracerTeam]=useState(false);
  const [CRemark, setCRemark]=useState(false);


  //////////////////////////////////////////////////////////
  const [visited,setvisited]=useState(false)
  const [visiting,setvisiting]=useState(false)
  const [visible, setVisible]=useState(false);
  const [visite,setevisit]=useState(false)
  const [visiteA,setevisitA]=useState(false)
  const [visibleB, setVisibleB]=useState(false);
  const [visibleC, setVisibleC]=useState(false);
  const [visibleD, setVisibleD]=useState(false);
  const [visibleE, setVisibleE]=useState(false);
  const [visibleF, setVisibleF]=useState(false);
  const [visibleG, setVisibleG]=useState(false);
  const [visibleH, setVisibleH]=useState(false);
  const [visibleI, setVisibleI]=useState(false);
  const [visitized,setvisitized]=useState(false)
  const [visitizedA,setvisitizedA]=useState(false)
  const [visit,setvisit]=useState(false)
  const [visitizedB,setvisitizedB]=useState(false)
  const [visitizedC,setvisitizedC]=useState(false)
  const [visitizedD,setvisitizedD]=useState(false)
  const [visibles, setVisibles]=useState(false);
  const [visiblesA, setVisiblesA]=useState(false);
  const [visitA,setvisitA]=useState(false)
  const [visitB,setvisitB]=useState(false)
  const [visitC,setvisitC]=useState(false)
  const [visiblesB, setVisiblesB]=useState(false);
  const [visiblesC, setVisiblesC]=useState(false);
  const [visitez,setvisitez]=useState(false)
  const [visitezA,setvisitezA]=useState(false)
  const [visitezB,setvisitezB]=useState(false)
  const [visitezC,setvisitezC]=useState(false)
  

  const [currLocation, setCurrLocation] = useState({});
  const [CurrLocationJs, setCurrLocationJs] = useState({});
//show or hide selection box//
  const [showhide, setShowhide]=useState('');
  const [allImage, setAllImage] = useState(null);
  const[show,setShow] = useState(false)
  const[Display,setDisplay] = useState(false)

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

const submitCholera = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("startDate", startDate);
  formData.append("pname", pname);
  formData.append("MRN", MRN);
  formData.append("Age", Age);
  formData.append("Sex", Sex);
  formData.append("Pregnancy", Pregnancy);
  formData.append("PPhone", PPhone);
  formData.append("PRegion", PRegion);
  formData.append("TRegion", TRegion);
  formData.append("PSubCity", PSubCity);
  formData.append("PWoreda", PWoreda);
  formData.append("pTWoreda", pTWoreda);
  formData.append("SpecificA", SpecificA);
  formData.append("Ketena", Ketena);
  formData.append("HNumber", HNumber);
  formData.append("POccupation", POccupation);
  formData.append("TPOccupation", TPOccupation);
  formData.append("AddPatientInfo", AddPatientInfo);
  formData.append("HRegion", HRegion);
  formData.append("HTRegion", HTRegion);
  formData.append("HSubCity", HSubCity);
  formData.append("THSubCity", THSubCity);
  formData.append("HWoreda", HWoreda);
  formData.append("HFTworeda", HFTworeda);
  formData.append("HFName", HFName);
  formData.append("HFTName", HFTName);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("DSHfacility", DSHfacility);
  formData.append("ODisease", ODisease);
  formData.append("PClinical", PClinical);
  formData.append("TPClinical", TPClinical);
  formData.append("Dehydration", Dehydration);
  formData.append("TDehydration", TDehydration);
  formData.append("Sample", Sample);
  
  formData.append("DSample", DSample);
  formData.append("DTSample", DTSample);
 
  formData.append("Ttest", Ttest);
  formData.append("RDTTtest", RDTTtest);
  formData.append("RTTtest", RTTtest);


  formData.append("Ccategory", Ccategory);
  formData.append("PHstatus", PHstatus);
  formData.append("TPHstatus", TPHstatus);
  formData.append("Travel", Travel);
  formData.append("TTravel", TTravel);
  formData.append("TTTravel", TTTravel);
  formData.append("Priskarea", Priskarea);
  formData.append("TPriskarea", TPriskarea);
  formData.append("PChistory", PChistory);
  formData.append("TPChistory", TPChistory);
  formData.append("TTPChistory", TTPChistory);
  formData.append("PCOhistory", PCOhistory);
  formData.append("Foodexposure", Foodexposure);
  formData.append("TFoodexposure", TFoodexposure);
  formData.append("WaterS", WaterS);
  formData.append("TWaterS", TWaterS);
  formData.append("PModeA", PModeA);
  formData.append("Referral", Referral);
 
  formData.append("Treatment", Treatment);
  formData.append("ACTC", ACTC);
  formData.append("TACTC", TACTC);
  formData.append("Adate", Adate);
  formData.append("Ddate", Ddate);
  formData.append("Outcome", Outcome);
  formData.append("TOutcome", TOutcome);
  formData.append("Rdate", Rdate);
  formData.append("CoMorbidity", CoMorbidity);
  formData.append("TCoMorbidity", TCoMorbidity);
  formData.append("TTCoMorbidity", TTCoMorbidity);

  formData.append("STTCoMorbidity", STTCoMorbidity);
  formData.append("LComplication", LComplication);
  formData.append("Complication", Complication);

  
  formData.append("Nutrition", Nutrition);
  formData.append("MUAC", MUAC);
  formData.append("Disinfection", Disinfection);
  formData.append("Vaccination", Vaccination);
  formData.append("DCName", DCName);
  formData.append("Phone", Phone);

  formData.append("Holywater", Holywater);
  formData.append("THolywater", THolywater);
  formData.append("FContainers", FContainers);
  formData.append("TFContainers", TFContainers);
  formData.append("LastFiveDaysF", LastFiveDaysF);
  formData.append("Cooking", Cooking);
  formData.append("LeftoverFood", LeftoverFood);
  formData.append("TLeftoverFood", TLeftoverFood);
  formData.append("OThome", OThome);
  formData.append("TOThome", TOThome);
  formData.append("ActualLocation", ActualLocation);
  formData.append("RawFood", RawFood);
  formData.append("TRawFood", TRawFood);
  formData.append("TRawFoodwater", TRawFoodwater);
  formData.append("TTRawFoodwater", TTRawFoodwater);
  formData.append("WaterConsumed", WaterConsumed);
  formData.append("TWaterConsumed", TWaterConsumed);
  formData.append("TTWaterConsumed", TTWaterConsumed);
  formData.append("WaterTreat", WaterTreat);
  formData.append("DContainers", DContainers);
  formData.append("TDContainers", TDContainers);

  formData.append("WStaying", WStaying);
  formData.append("Income", Income);
  formData.append("Religion", Religion);
  formData.append("TReligion", TReligion);
  formData.append("Educational", Educational);
  formData.append("FamilyS", FamilyS);
  formData.append("UnderF", UnderF);
  formData.append("Information", Information);
  formData.append("TInformation", TInformation);
  formData.append("TTInformation", TTInformation);
  formData.append("CoMorbidFM", CoMorbidFM);
  formData.append("TsetCoMorbidFM", TsetCoMorbidFM);
  formData.append("SimilarC", SimilarC);
  formData.append("TreatmentF", TreatmentF);
  formData.append("Latrine", Latrine);
  formData.append("TLatrine", TLatrine);
  formData.append("LatrineU", LatrineU);
  formData.append("Lenvironment", Lenvironment);
  formData.append("Odefecation", Odefecation);
  formData.append("WasteDisposal", WasteDisposal);
  formData.append("Flies", Flies);
  formData.append("Hygienic", Hygienic);
  formData.append("HandWashing", HandWashing);
  formData.append("Observations", Observations);
  formData.append("Recommendations", Recommendations);
  formData.append("AddContactInfo", AddContactInfo);

  formData.append("ppname", ppname);
  formData.append("Cname", Cname);
  formData.append("CSex", CSex);
  formData.append("CAge", CAge);
  formData.append("LContactDate", LContactDate);
  formData.append("EnrolmentDate", EnrolmentDate);
  formData.append("selected", selected);
  formData.append("CRegion", CRegion);
  formData.append("TCRegion", TCRegion);
  formData.append("CSubCity", CSubCity);
  formData.append("District", District);
  formData.append("CKebele", CKebele);
  formData.append("CHNumber", CHNumber);
  formData.append("CPhone", CPhone);
  formData.append("CLatitude", CLatitude);
  formData.append("CLongitude", CLongitude);
  formData.append("COccupation", COccupation);
  formData.append("TCOccupation", TCOccupation);
  formData.append("Pwork", Pwork);
  formData.append("Tcontact", Tcontact);
  formData.append("Syptomatic", Syptomatic);
  formData.append("ExpectedDate", ExpectedDate);
  formData.append("COutcome", COutcome);
  formData.append("AgeCategory", AgeCategory);
  formData.append("EpiWeek", EpiWeek);
  formData.append("TracerTeam", TracerTeam);
  formData.append("CRemark", CRemark);
  formData.append("file", file);
  console.log(title, file);

  const result = await axios.post(
    "http://localhost:3000/CholeraFile",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(result);
  if (result.data.status == "ok") {
    alert("Uploaded Successfully!!!");
    getPdf();
  }
  setStartDate('')
setpname('') 
setMRN('')
setAge('')
setSex('')
setPregnancy('')
setPPhone('')
setPRegion('')
setTRegion('')
setPSubCity('')
setPWoreda('')
setpTWoreda('')
setSpecificA('')
setKetena('')
setHNumber('')
setPOccupation('')
setTPOccupation('')
setAddPatientInfo('')
setHRegion('')
setHTRegion('')
setHSubCity('')
setTHSubCity('')
setHWoreda('')
setHFTworeda('')
setHFName('')
setHFTName('')
setLatitude('')
setLongitude('')
setDSHfacility('')
setODisease('')
setPClinical('')
setTPClinical('')
setDehydration('')
setTDehydration('')
setSample('')
setDSample('')
setDTSample('')
setTtest('')
setRDTTtest('')
setRTTtest('')
setCcategory('')
setPHstatus('')
setTPHstatus('')
setTravel('')
setTTravel('')
setTTTravel('')
setPriskarea('')
setTPriskarea('')
setPChistory('')
setTPChistory('')
setTTPChistory('')
setPCOhistory('')
setFoodexposure('')
setTFoodexposure('')
setWaterS('')
setTWaterS('')
setPModeA('')
setReferral('')
setTreatment('')
setACTC('')
setTACTC('')
setAdate('')
setDdate('')
setOutcome('')
setTOutcome('')
setRdate('')
setCoMorbidity('')
setTCoMorbidity('')
setTTCoMorbidity('')
setSTTCoMorbidity('')
setLComplication('')
setComplication('')
setNutrition('')
setMUAC('')
setDisinfection('')
setVaccination('')
setDCName('')
setPhone('')
setfile('')
setHolywater('')
setTHolywater('')
setFContainers('')
setTFContainers('')
setLastFiveDaysF('')
setCooking('')
setLeftoverFood('')
setTLeftoverFood('')
setOThome('')
setTOThome('')
setActualLocation('')
setRawFood('')
setTRawFood('')
setTRawFoodwater('')
setTTRawFoodwater('')
setWaterConsumed('')
setTWaterConsumed('')
setTTWaterConsumed('')
setWaterTreat('')
setDContainers('')
setTDContainers('')
setWStaying('')
setIncome('')
setReligion('')
setTReligion('')
setEducational('')
setFamilyS('')
setUnderF('')
setInformation('')
setTInformation('')
setTTInformation('')
setCoMorbidFM('')
setTsetCoMorbidFM('')
setSimilarC('')
setTreatmentF('')
setLatrine('')
setTLatrine('')
setLatrineU('')
setLenvironment('')
setOdefecation('')
setWasteDisposal('')
setFlies('')
setHygienic('')
setHandWashing('')
setObservations('')
setRecommendations('')
setAddContactInfo('')
setppname('')
setCname('')
setCSex('')
setCAge('')
setLContactDate('')
setEnrolmentDate('')
setSelected('')
setCRegion('')
setTCRegion('')
setCSubCity('')
setDistrict('')
setCKebele('')
setCHNumber('')
setCPhone('')
setCLatitude('')
setCLongitude('')
setCOccupation('')
setTCOccupation('')
setPwork('')
setTcontact('')
setSyptomatic('')
setExpectedDate('')
setCOutcome('')
setAgeCategory('')
setEpiWeek('')
setTracerTeam('')
setCRemark('')
setvisited('')
setvisiting('')
setVisible('')
setevisit('')
setevisitA('')
setVisibleB('')
setVisibleC('')
setVisibleD('')
setVisibleE('')
setVisibleF('')
setVisibleG('')
setVisibleH('')
setVisibleI('')
setvisitized('')
setvisitizedA('')
setvisit('')
setvisitizedB('')
setvisitizedC('')
setvisitizedD('')
setVisibles('')
setVisiblesA('')
setvisitA('')
setvisitB('')
setvisitC('')
setVisiblesB('')
setVisiblesC('')
setvisitez('')
setvisitezA('')
setvisitezB('')
setvisitezC('')
setCurrLocation('')
setCurrLocationJs('')
setShowhide('')
setAllImage('')
};


  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/Measles',{startDate,pname,MRN,Age,Sex,Pregnancy,PPhone,PRegion,TRegion,PSubCity,PWoreda,pTWoreda,Ketena,HNumber,POccupation,TPOccupation,HRegion,HTRegion,HSubCity,HWoreda,HFTworeda,HFName,HFTName,Latitude,Longitude,DSHfacility,ODisease,PClinical,TPClinical,Dehydration,TDehydration,Sample,DSample,Ttest,RDTTtest,Ccategory,PHstatus,TPHstatus,Travel,TTravel,Priskarea,TPriskarea,PChistory,TPChistory,PCOhistory,Foodexposure,TFoodexposure,WaterS,TWaterS,PModeA,Referral,Treatment,ACTC,TACTC,Adate,Ddate,Outcome,TOutcome,Rdate,CoMorbidity,TCoMorbidity,TTCoMorbidity,Complication,Nutrition,MUAC,Disinfection,Vaccination,DCName,Phone,file})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  
///////////////////////////selection option from mongo/////////////
const currentPage=useRef();
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/Facility-info")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"Cholera file is sent")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    
  }, []);
  


  return (
    <>
    <div className=' bgcoll    main-containers  '>
    
      <form onSubmit={submitCholera}>
      <div class='row'>
        <div className=' col bg-light rounded border border-danger vh-1 text-dark p-1'>
          <h4 className='border border-secondary bgcoll text-white rounded text-center'>Cholera patient information</h4>
          <table className='Scrol-Table table light padding table-responsive'>
        <tr className='border border-secondary'>
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email"> Date of form filled</label><br></br>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} 
                    dateFormat='dd/MM/yyyy'                    
                    maxDate={new Date()}
                    isClearable
                    showMonthDropdown
                    showYearDropdown
                    showIcon
                    readOnly 
                    className='form-control justify-center rounded-lg w-70 text-3x1'          
                  />
                  </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Patient Full name</label>
                  <input type="text" placeholder="Patient Name" autoComplete="off" name=" Name of Patient"  className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setpname(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> MRN</label>
                  <input type="number" placeholder=" MRN" autoComplete="off" name=" MRN" value={MRN} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setMRN(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Age(In Years & Months)</label>
                  <input type="Decimal" placeholder="Age" autoComplete="off" name="Age" value={Age} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setAge(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Sex</label><br></br>
                 <th className='p-1'><h6> Male</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setvisited(false)} onChange={(e) => setSex(e.target.value)} /></th>
                 <th className='p-1'><h6>Female</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setvisited(true)} onChange={(e) => setSex(e.target.value)} /></th>
                 </h6>
                </div>
                { visited &&
                        <div className='mb-2'>
                        <h6> <label htmlFor="email">Pregnancy status if Female</label>
                          <select type="text" className='form-control rounded-2 w-70' value={Pregnancy} onChange={(e)=> setPregnancy(e.target.value)}>
                          <option value="" selected disabled >-- Select--</option>
                            <option defaultValue="Pregnant">Pregnant</option>
                            <option value="Lactating">Lactating</option>
                            <option value="Not pregnant"> Not pregnant</option>
                            <option value="NA">NA</option>
                          </select></h6>
                        </div>
                    }
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone number </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={PPhone}
                    onChange={setPPhone}/>
                  </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Patient Residency Region</label>
                  <select type="text" className='form-control rounded-2 w-70' value={PRegion} onChange={(e)=> setPRegion(e.target.defaultValue)}>
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
                  </select></h6>
                </div>       
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Zone | Sub City</label>
                  <select type="text" className='form-control rounded-2 w-70' value={PSubCity} onChange={(e)=> setPSubCity(e.target.value)}>
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
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Residency Woreda</label>
                  <select type="text" className='form-control rounded-3 w-70' value={PWoreda} onChange={(e)=>(handleshowhide(e),setPWoreda(e.target.value))}  >
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
                  <input type="text" placeholder="Name of Woreda"  autoComplete="off" name="Name of Woreda" value={pTWoreda} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
                  )}           
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Specific Residency Area</label>
                  <input type="text" placeholder="Specific.." autoComplete="on" name="Specific" value={SpecificA} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setSpecificA(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Ketena | Got </label>
                  <input type="number" placeholder="Ketena.." autoComplete="on" name="Ketena" value={Ketena} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setKetena(e.target.value)} /></h6>
                </div>
              </th>

              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient House  Number </label>
                  <input type="number" placeholder="House Numbe Name" autoComplete="on" name="House Numbe" value={HNumber} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHNumber(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className=''>
                <h6><label htmlFor="email">Patient Current Occupation</label>
                  <select type="text" className='form-control rounded-3 w-70' value={POccupation} onChange={(e)=>(handleshowhide(e),setPOccupation(e.target.value))}  >
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Daily laborer">Daily laborer</option>
                    <option value="Driver">Driver</option>
                    <option value="Employed (Private & Government)">Employed (Private & Government)</option>
                    <option value="No Job">No Job</option>
                    <option value="Private (Self Employed)">Private (Self Employed)</option>
                    <option value="Street Children">Street Children</option>
                    <option value="Student">Student</option>
                    <option value="House wife">House wife</option>
                    <option value="2">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='2' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">If other, Specify Occupation</label></h6>
                  <input type="text" placeholder="Occupation.."  autoComplete="off" name="Occupation" value={TPOccupation} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setTPOccupation(e.target.value)} />
                    </div>
                  )}           

              </th>
              </tr>
              <tr className='border border-secondary'>
        <th colSpan="4">
        
        
        <div  className='form-check-inline'>
        <h6><label htmlFor="email"><strong>+ Additional Patient related Information</strong></label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='AdditionalP' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setAddPatientInfo(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='AdditionalP' value='NO'onClick={ ()=>setvisiting(false)} onChange={(e) => setAddPatientInfo(e.target.value)} /></th>
                 </h6>
                </div>
                { visiting &&
                    
                    <span className='title'>
                    
                    
                            <tr className='border border-secondary p-1 mb-1'>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Regular working (staying) place of the patient? (Specify)</label>
                                    <input type="text" placeholder="staying.." autoComplete="on" name="staying" value={WStaying} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setWStaying(e.target.value)} /></h6>
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Monthly average family Income (birr)</label>
                                    <input type="number" placeholder="Income.." autoComplete="on" name="Income" value={Income} className='form-control justify-center rounded-lg w-50 text-3x1'
                                      onChange={(e) => setIncome(e.target.value)} /></h6>
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Religion</label>
                                    <select type="text" className='form-control rounded-3 w-50' value={Religion} onChange={(e) => (handleshowhide(e), setReligion(e.target.value))}>
                                    <option value="" selected disabled >-- Select--</option>
                                      <option value="Orthodox">Orthodox</option>
                                      <option value="Muslim">Muslim</option>
                                      <option value="Chatholic">Chatholic</option>
                                      <option value="Protestant">Protestant</option>
                                      <option value="3">Other</option>
                                    </select></h6>
                                </div>

                                {showhide === '3' && (
                                  <div className="col-md-10 form-group">
                                    <h6> <label htmlFor="email">If other, Religion</label></h6>
                                    <input type="text" placeholder="Religion.." autoComplete="off" name="Religion" value={TReligion} className='form-control justify-center rounded-lg w-50 text-3x1'
                                      onChange={(e) => setTReligion(e.target.value)} />
                                  </div>
                                )}

                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Educational status</label>
                                    <select type="text" className='form-control rounded-3 w-50' value={Educational} onChange={(e) => (handleshowhide(e), setEducational(e.target.value))}>
                                    <option value="" selected disabled >-- Select--</option>
                                      <option value="OrUnder age (if ﹤ 4yrs)thodox">Under age (if ﹤ 4yrs)</option>
                                      <option value="Kinder Garden (KG)">Kinder Garden (KG)</option>
                                      <option value="Primary (grade 1-8)">Primary (grade 1-8)</option>
                                      <option value="Secondary (grade 9-10)">Secondary (grade 9-10)</option>
                                      <option value="Preparatory (11-12)">Preparatory (11-12)</option>
                                      <option value="Higher level (above grade 12)">Higher level (above grade 12)</option>

                                    </select></h6>
                                </div>
                              </th>

                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Family size (including the patient)</label>
                                    <input type="number" placeholder="Family.." autoComplete="on" name="Family" value={FamilyS} className='form-control justify-center rounded-lg w-50 text-3x1'
                                      onChange={(e) => setFamilyS(e.target.value)} /></h6>
                                </div>
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Number of under five children in family?</label>
                                    <input type="number" placeholder="under five.." autoComplete="on" name="under five" value={UnderF} className='form-control justify-center rounded-lg w-50 text-3x1'
                                      onChange={(e) => setUnderF(e.target.value)} /></h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Do you have any information about cholera disease?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisible(true)} onChange={(e) => setInformation(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisible(false)} onChange={(e) => setInformation(e.target.value)} /></th>
                                  </h6>
                                </div>
                                {visible && (
                                  <div className='mb-2'>
                                    <h6><label htmlFor="email">If yes, what do you know?</label>
                                      <select type="text" className='form-control rounded-3 w-50' value={TInformation} onChange={(e) => (handleshowhide(e), setTInformation(e.target.value))}>
                                      <option value="" selected disabled >-- Select--</option>
                                        <option value="Transmision way">Transmision way</option>
                                        <option value="Severity">Severity</option>
                                        <option value="Cause/Risk factors of the disease">Cause/Risk factors of the disease</option>
                                        <option value="Prevention methods">Prevention methods</option>
                                        <option value="Clinical features">Clinical features</option>
                                        <option value="4">Other</option>
                                      </select></h6>
                                  </div>
                                )}
                                {showhide === '4' && (
                                  <div className="col-md-10 form-group">
                                    <h6> <label htmlFor="email">If the answer for the above question is other, specify.</label></h6>
                                    <input type="text" placeholder="specify.." autoComplete="off" name="specify" value={TTInformation} className='form-control justify-center rounded-lg w-50 text-3x1'
                                      onChange={(e) => setTTInformation(e.target.value)} />
                                  </div>
                                )}
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Is there any elderly/bed ridden/comorbid family member?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={() => setevisit(true)} onChange={(e) => setCoMorbidFM(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={() => setevisit(false)} onChange={(e) => setCoMorbidFM(e.target.value)} /></th>
                                  </h6>
                                </div>
                                {visite &&
                                  <div className="col-md-10 form-group">
                                    <h6><label htmlFor="email">If yes, number</label>
                                      <input type="number" placeholder=" Co-Morbidity ..." autoComplete="off" name=" Co-Morbidity " value={TsetCoMorbidFM} className='form-control rounded-2 w-75'
                                        onChange={(e) => setTsetCoMorbidFM(e.target.value)} /></h6>
                                  </div>}

                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Are there any family members with similar complaints?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={() => setevisitA(true)} onChange={(e) => setSimilarC(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={() => setevisitA(false)} onChange={(e) => setSimilarC(e.target.value)} /></th>
                                  </h6>
                                </div>
                                {visiteA &&
                                  <div className='form-check-inline'>
                                    <h6><label htmlFor="email">If yes did he/she visit health facility for treatment?</label><br></br>
                                      <th className='p-1'><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={() => setevisit(true)} onChange={(e) => setTreatmentF(e.target.value)} /></th>
                                      <th className='p-1'><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={() => setevisit(false)} onChange={(e) => setTreatmentF(e.target.value)} /></th>
                                    </h6>
                                  </div>}
                              </th>

                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Is there a latrine in the premise (residency area/Compound) of the patient?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleB(true)} onChange={(e) => setLatrine(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleB(false)} onChange={(e) => setLatrine(e.target.value)} /></th>
                                  </h6>
                                </div>
                                {visibleB && (
                                  <div className='mb-2'>
                                    <h6><label htmlFor="email">If yes, what type of latrine the patient and his/her family members are using?</label>
                                      <select type="text" className='form-control rounded-3 w-50' value={TLatrine} onChange={(e) => (handleshowhide(e), setTLatrine(e.target.value))}>
                                      <option value="" selected disabled >-- Select--</option>
                                        <option value="Traditional pit latrine (unimproved)">Traditional pit latrine (unimproved)</option>
                                        <option value="Traditional pit latrine /improved/">Traditional pit latrine /improved/</option>
                                        <option value="Traditional pit latrine /improved and ventilated/">Traditional pit latrine /improved and ventilated/</option>
                                        <option value="Latrine with Flush (aqua privy)">Latrine with Flush (aqua privy)</option>

                                      </select></h6>
                                  </div>
                                )}

                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Latrine utilization status</label>
                                    <select type="text" className='form-control rounded-3 w-50' value={LatrineU} onChange={(e) =>  setLatrineU(e.target.value)}>
                                    <option value="" selected disabled >-- Select--</option>
                                      <option value="Shared within compound">Shared within compound</option>
                                      <option value="Private">Private</option>
                                      <option value="Communal">Communal</option>
                                      <option value="No latrine around">No latrine around</option>

                                    </select></h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Is there a leakage from the latrines to the immediate environment?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleC(true)} onChange={(e) => setLenvironment(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleC(false)} onChange={(e) => setLenvironment(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Is there open defecation practice in the surrounding or neighborhood? (Please observe the immediate environment)</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleD(true)} onChange={(e) => setOdefecation(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleD(false)} onChange={(e) => setOdefecation(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Is there proper waste disposal and collection site in the vicinity?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleE(true)} onChange={(e) => setWasteDisposal(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleE(false)} onChange={(e) => setWasteDisposal(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>

                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Are there flies in the residential environment? Observe</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleF(true)} onChange={(e) => setFlies(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleF(false)} onChange={(e) => setFlies(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">During your observation, is the environment clean/hygienic?</label><br></br>
                                    <th className='p-1'><h6> Yes</h6> <input type="radio" name='information' value='Yes' onClick={() => setVisibleG(true)} onChange={(e) => setHygienic(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleG(false)} onChange={(e) => setHygienic(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">How is hand washing practices of the patient and his family at critical times (Before/after eating, after toilets, after caring for children, before/after food preparation etc )</label><br></br>
                                    <th className='p-1'><h6>Yes, always</h6> <input type="radio" name='information' value='Yes, always' onClick={() => setVisibleH(true)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                                    <th className='p-1'><h6>Yes, sometimes</h6><input type="radio" name='information' value='Yes, sometimes' onClick={() => setVisibleH(false)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='information' value='No' onClick={() => setVisibleI(true)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                              <th>
                                  <h6><label htmlFor="email">Any other additional observations to be documented</label>
                                  <textarea
                                  id="observations"
                                
                                required
                                  onChange={(e) => setObservations(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="observations.."
                                ></textarea></h6>
                                  
                                  </th>
                                  <th>
                                  <h6><label htmlFor="email">Any team recommendations and interventions requested by team</label>
                                  <textarea
                                  id="recommendations"
                               
                                required
                                  onChange={(e) => setRecommendations(e.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="recommendations.."
                                ></textarea></h6>
                                  
                                </th>
                            </tr>
                         </span>
                 
                    }</th>
                    </tr>
                    <tr className='border border-secondary'>
                    <th colSpan="4">
                    
                   
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email"><strong>+ Add Contact trace information</strong></label>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='trace' value='Yes'onClick={ ()=>setvisitized(true)} onChange={(e) => setAddContactInfo(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='trace' value='NO'onClick={ ()=>setvisitized(false)} onChange={(e) => setAddContactInfo(e.target.value)} /></th>
                 </h6>
                </div>
                { visitized &&
                    
                  
                    <span className='title'>
                            <tr className='border border-secondary'>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email"> Name of Patient</label>
                                    <input type="text" placeholder=" Name of Patient" autoComplete="off" name=" Name of Patient" value={ppname} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setppname(e.target.value)} /></h6>
                                </div>
                              </th>

                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Contact Name</label>
                                    <input type="text" placeholder=" Name of Patient" autoComplete="off" name=" Name of Patient" value={Cname} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setCname(e.target.value)} /></h6>
                                </div>
                              </th>
                              <th>
                                <div className='form-check-inline'>
                                  <h6><label htmlFor="email">Contact Sex</label><br></br>
                                    <th className='p-1'><h6> Male</h6> <input type="radio" name='Sex' value='Male' onClick={() => setvisitizedA(true)} onChange={(e) => setCSex(e.target.value)} /></th>
                                    <th className='p-1'><h6>Female</h6><input type="radio" name='Sex' value='Female' onClick={() => setvisitizedA(false)} onChange={(e) => setCSex(e.target.value)} /></th>
                                  </h6>
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Contact Age</label>
                                    <input type="Decimal" placeholder="Age" autoComplete="off" name="Age" value={CAge} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setCAge(e.target.value)} /></h6>
                                </div>
                              </th>

                              <th>
                                <div className='mb-0 '>
                                  <h6><label htmlFor="email">Last Contact Date</label><br></br>
                                    <DatePicker selected={LContactDate} onChange={(date) => setLContactDate(date)}
                                      dateFormat='dd/MM/yyyy'                    
                                      maxDate={new Date()}
                                      isClearable
                                      showMonthDropdown
                                      showYearDropdown
                                      showIcon
                                      className='form-control justify-center rounded-lg w-70 text-3x1'
                                       />
                                       
                                  </h6>
                                </div>
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className='mb-0 '>
                                  <h6><label htmlFor="email">Enrolment date</label><br></br>
                                    <DatePicker selected={EnrolmentDate} onChange={(date) => setEnrolmentDate(date)}
                                      dateFormat='dd/MM/yyyy'                    
                                      maxDate={new Date()}
                                      isClearable
                                      showMonthDropdown
                                      showYearDropdown
                                      showIcon
                                      className='form-control justify-center rounded-lg w-70 text-3x1'
                                       />
                                      
                                  </h6>
                                </div>
                              </th>
                              <th>
                                <h6><label htmlFor="email">Country of Origin</label><br></br>
                                  <ReactFlagsSelect
                                    selected={selected}
                                    onSelect={(code) => setSelected(code)} />;</h6>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6> <label htmlFor="email">Patient Residency Region</label>
                                    <select type="text" className='form-control rounded-2 w-70' value={CRegion} onChange={(e) =>(handleshowhide(e), setCRegion(e.target.value))}>
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
                                      <option value="5">Other</option>
                                    </select></h6>
                                </div>

                                {showhide === '5' && (
                                  <div className="col-md-10 form-group">
                                    <h6> <label htmlFor="email">Write Residency Region</label>
                                      <input type="text" placeholder="Name of Region" autoComplete="off" name="Name of Region" value={TCRegion} className='form-control rounded-2 w-70'
                                        onChange={(e) => setTCRegion(e.target.value)} /></h6>
                                  </div>
                                )}
                              </th>

                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Patient Zone | Sub City</label>
                                    <select type="text" className='form-control rounded-2 w-70' value={CSubCity} onChange={(e) => setCSubCity(e.target.value)}>
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
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">District</label></h6>
                                  <input type="text" placeholder="District" autoComplete="off" name="District" value={District} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setDistrict(e.target.value)} />
                                </div>
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Kebele/Got</label></h6>
                                  <input type="number" placeholder="Kebele" autoComplete="off" name="Kebele" value={CKebele} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setCKebele(e.target.value)} />
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Contact House  Number </label>
                                    <input type="number" placeholder="House Numbe Name" autoComplete="on" name="House Numbe" value={CHNumber} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setCHNumber(e.target.value)} /></h6>
                                </div>
                              </th>

                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Phone Number</label>
                                    <input type="Number" placeholder="Enter Phone Number" autoComplete="off" name="Phone Number" value={CPhone} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setCPhone(e.target.value)} /></h6>
                                </div>
                              </th>
                              <th> <div className='mb-0'>
                                <h6><label htmlFor="email">GPS Coordinate</label>
                                  <p onChange={(e) => setCLatitude(e.target.value)}>Latitude: {currLocation.latitude}</p>
                                  <p onChange={(e) => setCLongitude(e.target.value)}>Longitude: {currLocation.longitude}</p>
                                  <p>City: {currLocation.city}</p></h6>
                              </div>
                              </th>
                              <th>
                                <div className=''>
                                  <h6><label htmlFor="email">Contact Current Occupation</label>
                                    <select type="text" className='form-control rounded-3 w-70' value={COccupation} onChange={(e) => (handleshowhide(e), setCOccupation(e.target.value))}>
                                    <option value="" selected disabled >-- Select--</option>
                                      <option value="Daily laborer">Daily laborer</option>
                                      <option value="Driver">Driver</option>
                                      <option value="Employed (Private & Government)">Employed (Private & Government)</option>
                                      <option value="No Job">No Job</option>
                                      <option value="Private (Self Employed)">Private (Self Employed)</option>
                                      <option value="Street Children">Street Children</option>
                                      <option value="Student">Student</option>
                                      <option value="Petty Trader (ጉልት ሻጭ)">Petty Trader (ጉልት ሻጭ)</option>
                                      <option value="Food Handler">Food Handler</option>
                                      <option value="House wife">House wife</option>
                                      <option value="6">Other</option>
                                    </select></h6>
                                </div>

                                {showhide === '6' && (
                                  <div className="col-md-10 form-group">
                                    <h6> <label htmlFor="email">If other, Specify Occupation</label></h6>
                                    <input type="text" placeholder="Occupation.." autoComplete="off" name="Occupation" value={TCOccupation} className='form-control justify-center rounded-lg w-70 text-3x1'
                                      onChange={(e) => setTCOccupation(e.target.value)} />
                                  </div>
                                )}
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Place of work</label></h6>
                                  <input type="text" placeholder="Occupation.." autoComplete="off" name="Occupation" value={Pwork} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setPwork(e.target.value)} />
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Type of contact</label>
                                    <select type="text" className='form-control rounded-3 w-70' value={Tcontact} onChange={(e) =>  setTcontact(e.target.value)}>
                                    <option value="" selected disabled >-- Select--</option>
                                      <option value="Household">Household</option>
                                      <option value="Comman Exposure">Comman Exposure</option>
                                    </select></h6>
                                </div>
                              </th>
                              <th>
                                <div className='mb-2 form-check-inline'>
                                  <h6> <label htmlFor="email">Syptomatic Contact</label><br></br>
                                    <th className='p-1'><h6>Yes</h6><input type="radio" name='Contact' value='Yes' onClick={() => setvisit(true)} onChange={(e) => setSyptomatic(e.target.value)} /> </th>
                                    <th className='p-1'><h6>No</h6><input type="radio" name='Contact' value='No' onClick={() => setvisit(false)} onChange={(e) => setSyptomatic(e.target.value)} /> </th></h6>
                                </div>
                              </th>
                              <th>
                                <div className='mb-2'>
                                  <h6><label htmlFor="email">Expected date to Discharge</label><br></br>
                                    <DatePicker selected={ExpectedDate} onChange={(date) => setExpectedDate(date)}
                                      dateFormat='dd/MM/yyyy'                    
                                      maxDate={new Date()}
                                      isClearable
                                      showMonthDropdown
                                      showYearDropdown
                                      showIcon />
                                       className='form-control justify-center rounded-lg w-70 text-3x1'
                                       </h6>
                                </div>
                              </th>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Outcome</label></h6>
                                  <input type="text" placeholder="Outcome" autoComplete="off" name="Outcome" value={COutcome} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setCOutcome(e.target.value)} />
                                </div>
                              </th>
                            </tr>
                            <tr className='border border-secondary'>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Age Category</label></h6>
                                  <input type="text" placeholder="Age Category" autoComplete="off" name="Age Category" value={AgeCategory} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setAgeCategory(e.target.value)} />
                                </div>
                              </th>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Epi week</label></h6>
                                  <input type="number" placeholder="Epi week" autoComplete="off" name="Epi week" value={EpiWeek} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setEpiWeek(e.target.value)} />
                                </div>
                              </th>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Tracer Team</label></h6>
                                  <input type="text" placeholder="Tracer Team.." autoComplete="off" name="Tracer Team" value={TracerTeam} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setTracerTeam(e.target.value)} />
                                </div>
                              </th>
                              <th>
                                <div className="col-md-10 form-group">
                                  <h6> <label htmlFor="email">Remark</label></h6>
                                  <input type="text" placeholder="Remark" autoComplete="off" name="Remark" value={CRemark} className='form-control justify-center rounded-lg w-70 text-3x1'
                                    onChange={(e) => setCRemark(e.target.value)} />
                                </div>
                              </th>

                            </tr></span>
                      
        
                    }</th>
                    
              </tr>
              </table>
              
               
        </div>
        

        <div className='col-md-6 bg-light rounded p-0 border border-danger text-dark p-1 '>
          <h4 className='border border-secondary  rounded bgcoll text-white text-center'>Cholera Health Facility information</h4>
          <table className='border border-secondary Scrol-Table  table light padding table-responsive'>
            <tr>
            <th>
            <div>
            <label><h5>Region | ጤና ተቋሙ የሚገኝበት ክልል</h5></label>
            <select 
             id="Region"
             placeholder="select the Region"
             value={HRegion}
             required
            onChange={(e)=>(handleshowhide(e),setHRegion(e.target.value))} className='form-control rounded-2 w-70'>
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
                  <input type="text" placeholder=" Region.." autoComplete="off"  name="Facility Name" value={HTRegion} className='form-control rounded-0 w-70'
                    onChange={(e) => setHTRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              <th>
              <div>
            <label><h5> Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h5></label>
            <select 
             id="Sub City"
             placeholder="select the Sub City"
             value={HSubCity}
             required
            onChange={(e)=>(handleshowhide(e),setHSubCity(e.target.value))} className='form-control rounded-2 w-70'>
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
                  <input type="text" placeholder=" Sub-City.." autoComplete="off"  name="Facility Name" value={THSubCity} className='form-control rounded-0 w-70'
                    onChange={(e) => setTHSubCity(e.target.value)} /></h6>
                    </div>
                  )}           
                
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div>
            <label><h5> Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h5></label>
            <select 
             id="Woreda"
             placeholder="select Woreda"
             value={HWoreda}
             required
            onChange={(e)=>(handleshowhide(e),setHWoreda(e.target.value))} className='form-control rounded-2 w-70'>
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
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTworeda} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHFTworeda(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              <th>
              <div>
            <label><h5> Health Facility Name | የጤና ተቋሙ ስም</h5></label>
            <select 
             id="HName"
             placeholder="select the title"
             value={HFName}
             required
            onChange={(e)=>(handleshowhide(e),setHFName(e.target.value))} className='form-control rounded-2 w-70'>
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
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTName} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHFTName(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
            </tr>
          </table>
        </div>
       
        <div className=' col w-5 bg-white rounded p-3 border border-danger h6 text-dark '>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Reporting Format</h4>
          <table className='Scrol-Table table light padding table-responsive'>
            <tr className='border border-secondary'>
            <th> 
              <div className='mb-2'>
            <h6><label htmlFor="email">GPS | Location Coordinate</label>
                  <p onChange={(e) => setLatitude(e.target.value)}>latitude: {currLocation.latitude}</p>
                  <p onChange={(e) => setLongitude(e.target.value)}>longitude: {currLocation.longitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date Seen at Health Facility</label><br></br>
                  <DatePicker selected={DSHfacility} onChange={(date) =>setDSHfacility (date)} 
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
                <h6><label htmlFor="email">Date of onset of Disease</label><br></br>
                  <DatePicker selected={ODisease} onChange={(date) => setODisease(date)} 
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
                <h6><label htmlFor="email">Presenting Clinical Feature</label>
                  <select type="text" className='form-control rounded-0 w-70' value={PClinical} onChange={(e)=>(handleshowhide(e), setPClinical(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Profuse Watery Diarrhea">Profuse Watery Diarrhea</option>
                    <option value="Nausea">Nausea</option>
                    <option value="Fever">Fever</option>
                    <option value="Muscle pain">Muscle pain</option>
                    <option value="11">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='11' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If other, Specify additional clinical featu</label>
                  <input type="text" placeholder="clinical featu.." autoComplete="off"  name="Facility Name" value={TPClinical} className='form-control rounded-0 w-70'
                    onChange={(e) => setTPClinical(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Dehydration status of the Patient</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Dehydration} onChange={(e)=> setDehydration(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="No Dehydration">No Dehydration</option>
                    <option value="Some Dehydration">Some Dehydration</option>
                    <option value="Sever Dehydration"> Sever Dehydration</option>
                  </select></h6>
                </div>    
              </th>   
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is sample taken for the patient?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='sample' value='Yes'onClick={ ()=>setvisitizedB(true)} onChange={(e) => setSample(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='sample' value='NO'onClick={ ()=>setvisitizedC(true)} onChange={(e) => setSample(e.target.value)} /></th>
                 </h6>
                </div>
                { visitizedB &&
                    <div className='mb-2'>
                    <h6><label htmlFor="email">If yes, Date Specimen collected</label><br></br>
                      <DatePicker selected={DSample} onChange={(date) => setDSample(date)} 
                      dateFormat='dd/MM/yyyy'                    
                      maxDate={new Date()}
                      isClearable
                      showMonthDropdown
                      showYearDropdown
                      showIcon
                       className='form-control justify-center rounded-lg w-70 text-3x1'
                     /></h6>
                    </div>
                    }
                    {
                  visitizedC && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If lab test do not done specify the reason</label>
                  <input type="text" placeholder="specify the reason" autoComplete="off"  name="specify the reason" value={DTSample} className='form-control rounded-0 w-70'
                    onChange={(e) => setDTSample(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
              </tr>
              <tr className='border border-secondary'> 
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">what type of test done</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Ttest} onChange={(e)=>(handleshowhide(e), setTtest(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="12">RDT</option>
                    <option value="12">Culture</option>
                    <option value="13"> Both (RDT & Culture)</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='12' && (<div className='mb-2'>
                  <h6><label htmlFor="email">If test type is RDT or Culture, test Result</label>
                    <select type="text" className='form-control rounded-2 w-75' value={RDTTtest} onChange={(e)=>(handleshowhide(e), setRDTTtest(e.target.value))}>
                    <option value="" selected disabled >-- Select--</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                      <option value="Not done">Not done</option>
                      <option value="Pending">Pending</option>
                    </select></h6>
                  </div>
                  
                  )} 
                  {
                  showhide==='13' && (
                    <div className='mb-2'>
                <h6><label htmlFor="email">If test type is Both (RDT & Culture), test result?</label>
                  <select type="text" className='form-control rounded-2 w-75' value={RTTtest} onChange={(e)=>(handleshowhide(e), setRTTtest(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Suspected">Suspected</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Epidemiologically linked/Probable">Epidemiologically linked/Probable</option>
                    <option value="Discarded (not Suspected)">Discarded (not Suspected)</option>
                  </select></h6>
                </div>
                  
                  )}   
                          
              </th> 
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient(case) category</label>
                  <select type="text" className='form-control rounded-2 w-70' value={Ccategory} onChange={(e)=> setCcategory(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Stool">Stool</option>
                    <option value="Blood">Blood</option>
                    <option value="Serum"> Serum</option>
                    <option value="CSF">CSF</option>
                    <option value="Throat swab">Throat swab</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div> 
                </th> 
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Living status of the patient (Housing status)</label>
                  <select type="text" className='form-control rounded-2 w-75' value={PHstatus} onChange={(e)=>(handleshowhide(e), setPHstatus(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Home">Home</option>
                    <option value="Street">Street</option>
                    <option value="Shelter"> Shelter</option>
                    <option value="IDP | Refugee">IDP | Refugee</option>
                    <option value="14">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='14' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If "other" living status, specify</label>
                  <input type="text" placeholder="living status" autoComplete="off" name="living status" value={TPHstatus} className='form-control rounded-2 w-75'
                    onChange={(e) => setTPHstatus(e.target.value)} /></h6>
                    </div>
                  )} 
                  </th> 
                  <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Does the patient has history of travel to cholera outbreak area</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='history' value='Yes'onClick={ ()=>setvisitizedD(true)} onChange={(e) => setTravel(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='history' value='No'onClick={ ()=>setvisitizedD(false)} onChange={(e) => setTravel(e.target.value)} /></th>
                 </h6>
                </div>
                { visitizedD &&
                        <div className='mb-2'>
                        <h6><label htmlFor="email">If "yes" where region</label>
                          <select type="text" className='form-control rounded-0 w-70' value={TTravel} onChange={(e)=>(handleshowhide(e), setTTravel(e.target.value))}>
                          <option value="" selected disabled >-- Select--</option>
                            <option defaultValue="Oromya">Oromya</option>
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
                            <option value="15">Other</option>
                          </select></h6>
                        </div>
                          }
                        {
                          showhide==='15' && (
                          <div className="col-md-10 form-group">
                            <h6><label htmlFor="email">Write Region</label>
                          <input type="text" placeholder=" Region" autoComplete="off"  name="Region" value={TTTravel} className='form-control rounded-0 w-70'
                            onChange={(e) => setTTTravel(e.target.value)} /></h6>
                            </div>
                          )}      
                        
              </th> 
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Do the patient has exposure to the following risk area</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Priskarea} onChange={(e)=>(handleshowhide(e), setPriskarea(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Slum Area">Slum Area</option>
                    <option value="Holly Water">Holly Water</option>
                    <option value="Refuge Camp"> Refuge Camp</option>
                    <option value="River Area">River Area</option>
                    <option value="Stagnant Water">Stagnant Water</option>
                    <option value="16">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='16' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If "Other" area please specify</label>
                  <input type="text" placeholder="area..." autoComplete="off" name="area" value={TPriskarea} className='form-control rounded-2 w-75'
                    onChange={(e) => setTPriskarea(e.target.value)} /></h6>
                    </div>
                  )} 

                  </th> 
                  <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Does the patient has Contact history with Suspected / Confirmed Cholera patient</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setVisibles(true)} onChange={(e) => setPChistory(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setVisibles(false)} onChange={(e) => setPChistory(e.target.value)} /></th>
                 </h6>
                </div>
                { visibles &&
                      <div className='mb-2'>
                      <h6><label htmlFor="email">If yes, contact address</label>
                        <select type="text" className='form-control rounded-2 w-75' value={TPChistory} onChange={(e)=>(handleshowhide(e), setTPChistory(e.target.value))}>
                        <option value="" selected disabled >-- Select--</option>
                          <option value="Family member">Family member</option>
                          <option value="Co-Worker">Co-Worker</option>
                          <option value="Friends">Friends</option>
                          <option value="17">Other</option>
                        </select></h6>
                      </div>
                    }
                    {
                  showhide==='17' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If other specify</label>
                  <input type="text" placeholder="contact address.." autoComplete="off" name="contact address" value={TTPChistory} className='form-control rounded-2 w-75'
                    onChange={(e) => setTTPChistory(e.target.value)} /></h6>
                    </div>
                  )} 
              </th> 
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Types of food exposure </label>
                  <select type="text" className='form-control rounded-2 w-70' value={Foodexposure} onChange={(e)=>(handleshowhide(e), setFoodexposure(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Vegetable products">Vegetable products</option>
                    <option value="Fruit Products">Fruit Products</option>
                    <option value="Meat & Fish Products"> Meat & Fish Products</option>
                    <option value="Diary Products">Diary Products</option>
                    <option value="Any Hotel | Café Foods">Any Hotel | Café Foods</option>
                    <option value="Home Made Foods">Home Made Foods</option>
                    <option value="Street Vendor Food (Fast Food)"> Street Vendor Food (Fast Food)</option>
                    <option value="Raw Foods">Raw Foods</option>
                    <option value="Left over Foods"> Left over Foods</option>
                    <option value="Ceremonial Foods">Ceremonial Foods</option>
                    <option value="Poultry Products">Poultry Products</option>
                    <option value="18">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='18' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If "other" exposure please specify</label>
                  <input type="text" placeholder="Name of food.." autoComplete="off" name="Name food" value={TFoodexposure} className='form-control rounded-2 w-75'
                    onChange={(e) => setTFoodexposure(e.target.value)} /></h6>
                    </div>
                  )} 
                  </th> 
              
                  <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Main Water source</label>
                  <select type="text" className='form-control rounded-2 w-75' value={WaterS} onChange={(e)=>(handleshowhide(e), setWaterS(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Pipe Water">Pipe Water</option>
                    <option value="River Water">River Water</option>
                    <option value="Bottled Water"> Bottled Water</option>
                    <option value="Rain Water">Rain Water</option>
                    <option value="Well Water">Well Water</option>
                    <option value="Reservoir | Roto Water">Reservoir | Roto Water</option>
                    <option value="19">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='19' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">  If other source please specify</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Facility Name" value={TWaterS} className='form-control rounded-2 w-75'
                    onChange={(e) => setTWaterS(e.target.value)} /></h6>
                    </div>
                  )} 
                  </th> 
                  
                  <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Mode of the patient's arrival</label>
                  <select type="text" className='form-control rounded-2 w-75' value={PModeA} required onChange={(e)=> setPModeA(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Walking and stable">Walking and stable</option>
                    <option value="Walking but supported by other">Walking but supported by other</option>
                    <option value="Ambulance/Carried (unstable)"> Ambulance/Carried (unstable)</option>
                    <option value="Other public/private transport">Other public/private transport</option>
                  </select></h6>
                </div>
                </th>
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Referral Source (status) of the patient on arrival</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Referral} required onChange={(e)=> setReferral(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Self-Referral (Home)">Self-Referral (Home)</option>
                    <option value="Referred from other Health facility">Referred from other Health facility</option>
                    <option value="Street Referral (From outside)"> Street Referral (From outside)</option>
                    
                  </select></h6>
                </div>
              
                  </th>
                  <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient's Care & treatment status (Modality)</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Treatment} required onChange={(e)=>(handleshowhide(e), setTreatment(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="ORP | CTU">ORP | CTU</option>
                    <option value="20">CTC</option>
                  </select></h6>
                </div>
                
                {
                  showhide==='20' && (
                <div className='mb-2'>
                <h6><label htmlFor="email"> If the patient is admitted to CTC, admission site (Name of HF)</label>
                  <select type="text" className='form-control rounded-2 w-75' value={ACTC} required onChange={(e)=>(handleshowhide(e), setACTC(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Alert CTC">Alert CTC</option>
                    <option value="Black Lion CTC">Black Lion CTC</option>
                    <option value="Chefe CTC">Chefe CTC</option>
                    <option value="Zewditu Memorial Hospital CTC">Zewditu Memorial Hospital CTC</option>
                    <option value="Minillik II CTC">Minillik II CTC</option>
                    <option value="Yekatit 12 CTC">Yekatit 12 CTC</option>
                    <option value="Ras Desta Damtew CTC"> Ras Desta Damtew CTC</option>
                    <option value="St.Peter CTC">St.Peter CTC</option>
                    <option value="Tirunesh Beiging CTC">Tirunesh Beiging CTC</option>
                    <option value="Addis Ketema CTC">Addis Ketema CTC</option>
                    <option value="NSL CTC"> NSL CTC</option>
                    <option value="Gulele CTC">Gulele CTC</option>
                    <option value="Akaki Kality CTC">Akaki Kality CTC</option>
                    <option value="21">Other</option>
                  </select></h6>
                </div>
                )} 
                {
                  showhide==='21' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If "Other" CTC specify</label>
                  <input type="text" placeholder="CTC" autoComplete="off" name="CTC" value={TACTC} className='form-control rounded-2 w-75'
                    onChange={(e) => setTACTC(e.target.value)} /></h6>
                    </div>
                  )} 
                  </th>
                  
                  <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Date of Admission</label><br></br>
                  <DatePicker selected={Adate} onChange={(date) => setAdate(date)} 
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
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Date of Discharge</label><br></br>
                  <DatePicker selected={Ddate} onChange={(date) => setDdate(date)} 
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
                <div>
                <h6><label htmlFor="email"> Patient outcome</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={Outcome} required onChange={(e) => setOutcome(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Improved">Improved</option>
                    <option value="Death">Death</option>
                    <option value="On treatment">On treatment</option>
                    <option value="22">Referred</option>
                    
                  </select></h6>
                </div>
                {
                  showhide==='22' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email"> If the patient is referred , where?</label>
                  <input type="text" placeholder="referred ..." autoComplete="off" name="referred " value={TOutcome} className='form-control rounded-2 w-75'
                    onChange={(e) => setTOutcome(e.target.value)} /></h6>
                    </div>
                  )} 
              </th>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Date the patient referred</label><br></br>
                  <DatePicker selected={Rdate} onChange={(date) => setRdate(date)} 
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
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Do the patient has any other Co-Morbidity</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={ ()=>setVisiblesA(true)} onChange={(e) => setCoMorbidity(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={ ()=>setVisiblesA(false)} onChange={(e) => setCoMorbidity(e.target.value)} /></th>
                 </h6>
                </div>
                { visiblesA &&
                        <div>
                        <h6><label htmlFor="email">If yes, specify any co-morbidities</label>
                          <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={TCoMorbidity} onChange={(e) =>(handleshowhide(e), setTCoMorbidity(e.target.value))}>
                          <option value="" selected disabled >-- Select--</option>
                            <option value="Hypertension">Hypertension</option>
                            <option value="Diabetic Mellites">Diabetic Mellites</option>
                            <option value="Coronary Heart Disease">Coronary Heart Disease</option>
                            <option value="Gastritis">Gastritis</option>
                            <option value="Asthma">Asthma</option>
                            <option value="Epilepsy">Epilepsy</option>
                            <option value="Tuberculosis">Tuberculosis</option>
                            <option value="HIV Patient">HIV Patient</option>
                            <option value="Tuberculosis">Chronic Liver Disease</option>
                            <option value="23">Other</option>
                          </select></h6>
                        </div>}
                        {
                          showhide==='23' && (
                          <div className="col-md-10 form-group">
                            <h6><label htmlFor="email">If Other, specify any Co-Morbidity</label>
                          <input type="text" placeholder=" Co-Morbidity ..." autoComplete="off" name=" Co-Morbidity " value={TTCoMorbidity} className='form-control rounded-2 w-75'
                            onChange={(e) => setTTCoMorbidity(e.target.value)} /></h6>
                            </div>
                          )} 
                    
              </th> 
              
              
              
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there any complications secondary to Cholera</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Complication' required value='Yes'onClick={ ()=>setvisitA(true)} onChange={(e) => setSTTCoMorbidity(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Comlication' required value='No'onClick={ ()=>setvisitA(false)} onChange={(e) => setSTTCoMorbidity(e.target.value)} /></th>
                 </h6>
                </div>
                { visitA &&
                    <div>
                    <h6><label htmlFor="email">List of complications</label>
                      <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={LComplication} onChange={(e) =>(handleshowhide(e), setLComplication(e.target.value))}>
                      <option value="" selected disabled >-- Select--</option>
                        <option value="Hypovolemic Shock">Hypovolemic Shock</option>
                        <option value="Septic Shock">Septic Shock</option>
                        <option value="Acute Kidney Injury (AKI)">Acute Kidney Injury (AKI)</option>
                        <option value="Aspiration Pneumonia">Aspiration Pneumonia</option>
                        <option value="Hypovolemic Shock">Hypovolemic Shock</option>
                        <option value="Hypoglycemia">Hypoglycemia</option>
                        <option value="Hypokalemia">Hypokalemia</option>
                        <option value="Renal Failure">Renal Failure</option>
                        <option value="24">Other</option>
                      </select></h6>
                    </div>
                    }
                    {
                          showhide==='24' && (
                          <div className="col-md-10 form-group">
                            <h6><label htmlFor="email"> If Other, specify any complications</label>
                          <input type="text" placeholder=" complications ..." autoComplete="off" name=" complications " value={Complication} className='form-control rounded-2 w-75'
                            onChange={(e) => setComplication(e.target.value)} /></h6>
                            </div>
                          )} 
              </th> 
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Nutritional Status</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Nutrition} onChange={(e)=> setNutrition(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Normal">Normal</option>
                    <option value="MAM">MAM</option>
                    <option value="SAM"> SAM</option>
                  </select></h6>
                </div>          
              </th> 
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">MUAC for under five children</label>
                  <input type="Number" placeholder="MUAC" autoComplete="off" name="MUAC" value={MUAC} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setMUAC(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Disinfection Status of the Household</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Disinfection} onChange={(e)=> setDisinfection(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Disinfected">Disinfected</option>
                    <option value="Not disinfected">Not disinfected</option>
                    <option value="Waiting plan"> Waiting plan</option>
                    
                  </select></h6>
                </div>          
              </th> 
              
                      
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Oral Cholera vaccination status</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Vaccination} required onChange={(e)=> setVaccination(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Zero dose">Zero dose</option>
                    <option value="One dose">One dose</option>
                    <option value="Two dose"> Two dose</option>
                    <option value="Not eligible (﹤1yr)">Not eligible (﹤1yr)</option>
                  </select></h6>
                </div>   
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Name of data collector</label>
                  <input type="text" placeholder="Name..." autoComplete="off" required name="Name" value={DCName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setDCName(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone Number of Data Collector</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={Phone}
                    onChange={setPhone}/>
                  </h6>
                </div>
              </th>
              <th>
              <div className='mb-5'>
              <h6><label htmlFor="email">Choose a file to be uploaded</label><br />
                  <input type='file' name='file' accept="application/pdf" onChange={(e) => setfile(e.target.files[0])} required multiple/><br></br>
                  
                  </h6></div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th colSpan="6">
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Add Exposure/risk factor related information</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Complication' required value='Yes'onClick={ ()=>setvisitB(true)} onChange={(e) => setSTTCoMorbidity(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Comlication' required value='No'onClick={ ()=>setvisitB(false)} onChange={(e) => setSTTCoMorbidity(e.target.value)} /></th>
                 </h6>
                </div>
                { visitB &&
                    <div className='w-100 '>
                    <span className='title'>Exposure/risk factor related information<br></br>
                    <tr className='border border-secondary col-md-10 p-5'>
                    <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient drink holy water during last five days before onset of the illness?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setvisitC(true)} onChange={(e) => setHolywater(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setvisitC(false)} onChange={(e) => setHolywater(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visitC && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If the response for the above question is yes, mention specific location of the holy water?</label>
                  <input type="text" placeholder=" specific location " autoComplete="off"  name=" specific location " value={THolywater} className='form-control rounded-0 w-50'
                    onChange={(e) => setTHolywater(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
                  
              
                  <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">What types of containers used to store water for Food preparation?</label>
                  <select type="text" className='form-control rounded-2 w-75' value={FContainers} onChange={(e)=>(handleshowhide(e), setFContainers(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Bucket">Bucket</option>
                    <option value="Pot">Pot</option>
                    <option value="Jerricans">Jerricans</option>
                    <option value="Barrel">Barrel</option>
                    <option value="Packed bottle">Packed bottle</option>
                    
                    <option value="25">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='25' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If container for food preparation water is other, specify.</label>
                  <input type="text" placeholder="setContainers" autoComplete="off" name="setContainers" value={TFContainers} className='form-control rounded-2 w-75'
                    onChange={(e) => setTFContainers(e.target.value)} /></h6>
                    </div>
                  )} 
                </th>
                  
                  <th>
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">List all types of foods consumed during the last Five days before onset of illness</label>
                  <input type="text" placeholder="last Five days.." autoComplete="off" name="last Five days" value={LastFiveDaysF} className='form-control rounded-2 w-75'
                    onChange={(e) => setLastFiveDaysF(e.target.value)} /></h6>
                    </div>
                  </th>
                  <th>
                  <div className='mb-2'>
                <h6><label htmlFor="email">Cooking status of the food consumed during the last five days before onset of the illness?</label>
                  <select type="text" className='form-control rounded-2 w-75' value={Cooking} onChange={(e)=> setCooking(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Pipe Water">Well Cooked</option>
                    <option value="River Water">Semi cooked</option>
                    <option value="Bottled Water">Not Cooked</option>
                  </select></h6>
                </div>
                  </th>
                  <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient consume leftover food during the last five days before onset of the illness?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setVisiblesB(true)} onChange={(e) => setLeftoverFood(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setVisiblesB(false)} onChange={(e) => setLeftoverFood(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visiblesB && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If yes, specify the source & location of leftover food consumed (at home, Restaurant, elsewhere....)</label>
                  <input type="text" placeholder=" specific location " autoComplete="off"  name=" specific location " value={TLeftoverFood} className='form-control rounded-0 w-50'
                    onChange={(e) => setTLeftoverFood(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
              </tr>
              <tr className='border border-secondary p-5'>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Was the patient consumed any food other than at home during the last five days before the onset of illness?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setVisiblesC(true)} onChange={(e) => setOThome(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setVisiblesC(false)} onChange={(e) => setOThome(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visiblesC && (
                    <div className='mb-2'>
                    <h6><label htmlFor="email">If yes for the above question, where was it consumed from?</label>
                      <select type="text" className='form-control rounded-2 w-75' value={TOThome} onChange={(e)=>(handleshowhide(e), setTOThome(e.target.value))}>
                      <option value="" selected disabled >-- Select--</option>
                        <option value="Street-vendor">Street-vendor</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Social gathering">Social gathering</option>
                        <option value="26">Other</option>
                      </select></h6>
                    </div>
                  )} 
                  {
                  showhide==='26' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If yes, specify the actual location of food source you have consumed from out side</label>
                  <input type="text" placeholder="location" autoComplete="off" name="location" value={ActualLocation} className='form-control rounded-2 w-75'
                    onChange={(e) => setActualLocation(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
              
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient consume raw food during the last five days before the onset of the illness?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='raw food' value='Yes'onClick={ ()=>setvisitez(true)} onChange={(e) => setRawFood(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='raw food' value='NO'onClick={ ()=>setvisitez(false)} onChange={(e) => setRawFood(e.target.value)} /></th>
                 </h6>
                </div>
                    {
                  visitez && (
                    <div  className='form-check-inline'>
                  <h6><label htmlFor="email">If yes, was the food sufficiently washed?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='washed' value='Yes'onClick={ ()=>setvisitezA(true)} onChange={(e) => setTRawFood(e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='washed' value='NO'onClick={ ()=>setvisitezA(false)} onChange={(e) => setTRawFood(e.target.value)} /></th>
                 </h6>
                </div>)}
                {visitezA && (
                            <div className='mb-2'>
                            <h6><label htmlFor="email">If yes to the above question, what was the source of water for washing?</label>
                              <select type="text" className='form-control rounded-2 w-75' value={TRawFoodwater} onChange={(e)=>(handleshowhide(e), setTRawFoodwater(e.target.value))}>
                              <option value="" selected disabled >-- Select--</option>
                                <option value="Tap/Treated water">Tap/Treated water</option>
                                <option value="Bottled water">Bottled water</option>
                                <option value="River/Spring/Well water"> River/Spring/Well water</option>
                                <option value="27">Other</option>
                              </select></h6>
                            </div>
                          )}
                          {
                  showhide==='27' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If other, specify source of water used to wash raw food?</label>
                  <input type="text" placeholder="source of water" autoComplete="off" name="source of water" value={Age} className='form-control rounded-2 w-75'
                    onChange={(e) => setTTRawFoodwater(e.target.value)} /></h6>
                    </div>
                  )} 
                     </th> 
                     <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Was the water consumed from outside(other than home) during the last five days before onset of the illness?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='outside' value='Yes'onClick={ ()=>setvisitezB(true)} onChange={(e) => setWaterConsumed (e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='outside' value='NO'onClick={ ()=>setvisitezB(false)} onChange={(e) => setWaterConsumed(e.target.value)} /></th>
                 </h6>
                </div>
                    {
                  visitezB && (
                    <div className='mb-2'>
                <h6><label htmlFor="email">If yes, What is the source of water you consumed?</label>
                  <select type="text" className='form-control rounded-2 w-75' value={TWaterConsumed} onChange={(e)=>(handleshowhide(e), setTWaterConsumed(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Restaurant(Bottled)">Restaurant(Bottled)</option>
                    <option value="Restaurant(unbottled)">Restaurant(unbottled)</option>
                    <option value="Bottled water from Shop">Bottled water from Shop</option>
                    <option value="Unprotected source such as (River, Spring or well)">Unprotected source such as (River, Spring or well)</option>
                    <option value="28">Other</option>
                  </select></h6>
                </div>)}
                {
                  showhide==='28' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If Yes, specify the actual location where you have consumed water outside.</label>
                  <input type="text" placeholder="source of water" autoComplete="off" name="source of water" value={TTWaterConsumed} className='form-control rounded-2 w-75'
                    onChange={(e) => setTTWaterConsumed(e.target.value)} /></h6>
                    </div>
                  )} 
                </th> 
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Do you treat (boil, add water guard, etc.) water before use?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='water' value='Yes'onClick={ ()=>setvisitezC(true)} onChange={(e) => setWaterTreat (e.target.value)} /></th>
                 <th className='p-1'><h6>NO</h6><input type="radio" name='water' value='NO'onClick={ ()=>setvisitezC(false)} onChange={(e) => setWaterTreat(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">What types of containers used to store drinking water?</label>
                  <select type="text" className='form-control rounded-2 w-75' value={DContainers} onChange={(e)=>(handleshowhide(e), setDContainers(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Bucket">Bucket</option>
                    <option value="Pot">Pot</option>
                    <option value="Jerricans">Jerricans</option>
                    <option value="Barrel">Barrel</option>
                    <option value="Packed bottle">Packed bottle</option>
                    
                    <option value="29">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='29' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If the container for drinking water is other, specify it</label>
                  <input type="text" placeholder="setContainers" autoComplete="off" name="setContainers" value={TDContainers} className='form-control rounded-2 w-75'
                    onChange={(e) => setTDContainers(e.target.value)} /></h6>
                    </div>
                  )} 
                </th>
                
                </tr>
                
                    </span> 
                    </div>
                    }
                    </th>
            </tr>
          </table>
          <button className='btn btn-info border w-15 rounded-3 bgcoll text-white' onClick={submitCholera}><h5>Submit</h5></button>
          
           </div>
           </div>    
            </form>
           </div>
      
  
    </>
  )
}

export default Cholera
