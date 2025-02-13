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
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//import Dowenload from './Dowenload.jsx'
import Header from '../Header.jsx'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Polio      () {
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
              HF:["Lideta Health Center", "Legehar General Hospital", "Atlas Internal Medicine Speciality Clinic", "United Vission Internal Medicine Speciality  Clinic", "Dr. Abdurhaman Internal Medicine Speciality Clinic", "Addis Kokob Medium Clinic", "War Disability Center Medium  Clinic","Addis Machionery Manufacturing Medium Clinic", "Mychew Medium Clinic",  "Ethiopian Electric Utility Medium clinic", "Ethiopian Petrolium Supply Medium Clinic", "Mirtamanet Primarry Clinic", "Don Dental Number 4 Speciality Dental Clinic",  "Sayan Medium Dental Clinic" ],
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
    



  const [PPRegion, setPPRegion] = useState()
  const [TPPRegion, setTPPRegion]=useState("");
  const [PPSubCity, setPPSubCity] = useState("")
  const [PYear, setPYear] = useState(new Date())
  const [PCNumber, setPCNumber] = useState("")
  const [PReceivedD, setPReceivedD] = useState(new Date())
  const [PPWoreda, setPPWoreda] = useState("")
  const [PPTWoreda, setPPTWoreda] = useState("")
  const [PKebele,setPKebele] =useState("")
  const [PVillage, setPVillage] = useState("");
  const [PPName, setPPName]=useState("")
  const [PFather, setPFather] = useState("")
  const [PGrandF, setPGrandF] = useState("");
  const [PMother, setPMother]=useState("");
  const [PLatitude,setPLatitude]=useState("")
  const [PLongitude,setPLongitude]=useState("")
  const [Pbirth,setPbirth] = useState(new Date())
  const [PAge, setPAge] = useState("")
  const [PPSex,setPPSex]=useState("")
  const [PFacilityT,setPFacilityT]=useState("")
  const [TPFacilityT,setTPFacilityT]=useState("")
  const [HFName,setHFName]=useState("")
  const [HFTName,setHFTName]=useState("")
  const [HRegion,setHRegion]=useState("")
  const [HTRegion,setHTRegion]=useState("")
  const [HSubCity, setHSubCity] =useState("")
  const [THSubCity,setTHSubCity]=useState("")
  const [HWoreda, setHWoreda] = useState("")
  const [HFTworeda, setHFTworeda] = useState("")
  const [DPReporting,setDPReporting]=useState(new Date())
  const [PNName,setPNName]=useState("")
  const [PNotifier,setPNotifier]=useState("")
  const [TPNotifier,setTPNotifier]=useState("")
  const [PDistrictN,setPDistrictN]=useState(new Date())
  const [PInvestigated,setPInvestigated] =useState(new Date())
  const [PAdmission,setPAdmission]=useState(new Date())
  const [PRecordN,setPRecordN]=useState("")
  const [PFName,setPFName] = useState("")
  const [PParalysis,setPParalysis] = useState(new Date())
  const [PFever,setPFever]=useState("")
  const [Pprogressed,setPprogressed]= useState("")
  const [PFlaccid,setPFlaccid] = useState()
  const [PAsymmetrical,setPAsymmetrical]=useState('')
  const [PSite,setPSite]=useState('')
  const [PTentative,setPTentative]=useState("")
  const [PTAFP,setPTAFP] =useState("")
  const [POPV,setPOPV]=useState("")
  const [PNIDs,setPNIDs] =useState("")
  const [POPV0D,setPOPV0D] = useState(new Date())
  const [POPV1D,setPOPV1D] = useState(new Date())
  const [POPV2D,setPOPV2D]=useState(new Date())
  const [POPV3D,setPOPV3D]= useState(new Date())
  const [POPV4D,setPOPV4D] = useState(new Date())
  const [Plast,setPlast] = useState(new Date())
  const [PUnknown,setPUnknown] = useState("")
  const [TPOPV,setTPOPV] = useState("")
  const [POPVRI,setPOPVRI] = useState("")
  const [PTotalIPV, setPTotalIPV] = useState("")
  const [PDIPV,setPDIPV]= useState(new Date())
  const [PScollected1,setPScollected1]=useState(new Date())
  const [PScollected2,setPScollected2] = useState(new Date())
  const [PSnational,setPSnational]=useState(new Date())
  const [PSnationalR,setPSnationalR]=useState(new Date())
  const [PCondition,setPCondition] = useState("")
  const [DEPI,setDEPI]=useState(new Date())
  const [PPrimary,setPPrimary]=useState("")
  const [PNtoL,setPNtoL] = useState(new Date())
  const [PDdifferentiation, setPDdifferentiation] = useState(new Date())
  const[PDEPID,setPDEPID] = useState(new Date())
  const [PW, setPW] = useState("")
  const [PDiscordant, setPDiscordant] = useState("")
  const [PV,setPV]=useState("")
  const [PNPENT, setPNPENT] = useState()
  const [PNEV,setPNEV] = useState("")
  const [PFollowUp,setPFollowUp]=useState("")
  const [PResidual,setPResidual]=useState("")
  const [PFindings, setPFindings] = useState("")
  const [PDiagnosis,setPDiagnosis]=useState("")
  const [PImmunocompromised,setPImmunocompromised]=useState("")
   const[Pclassification,setPclassification] =useState()
  const [PSerotype,setPSerotype]=useState()
  const [PFCName,setPFCName]=useState()
  const [PTitle,setPTitle]=useState()
  const[PPhone,setPPhone]=useState()
  const [file , setfile] = useState("");
  
///////////////////////////////////////////////////////////
  const [visible, setVisible]=useState(false);
  const [visite,setevisit]=useState(false)
  const [visiblee, setVisiblee]=useState(false);
  const [visited,setvisited]=useState(false)
  const [visiting,setvisiting]=useState(false)
  const [visibles, setVisibles]=useState(false);
  const [visibleso, setVisibleso]=useState(false);
  const [visit,setvisit]=useState(false)
  const [visitA,setvisitA]=useState(false)
  const [visitB,setvisitB]=useState(false)
  const [visitC,setvisitC]=useState(false)
  const [visitD,setvisitD]=useState(false)
  const [visitE,setvisitE]=useState(false)
  
  const [currLocation, setCurrLocation] = useState({});
  const [CurrLocationJs, setCurrLocationJs] = useState({});
//show or hide selection box//
  const [showhide, setShowhide]=useState('');
  const [allImage, setAllImage] = useState(null);

 

  const [ EPIWeek, setEPIWeek] = useState("");
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
  
  //function handleFile(event){
    //if(!file){
        //console.log("no file selected");
       // return;
   // }
   // const fd = new FormData();
    //fd.append('file', file);
    //setFile(event.target.file[1])
    //sconsole.log(event.target.file[0])
//}
///function handleUpload(){
  //const formData = new FormData()
  //formData.append('file' , file)
  //fetch(
    //'url',
   // {
      //  method: "POST",
       // body: formData
   // }
  //).then((Response) => Response.json()).then((result) => {
   // console.log('success' , result)
 // })
  //.catch(error => {
  //  console.error("error", error)
 // })
//}  
//onSubmit={handleUpload}
//onChange={handleFile}
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
  formData.append("PPRegion", PPRegion);
  formData.append("TPPRegion", TPPRegion);
  formData.append("PPSubCity", PPSubCity);
  formData.append("PYear", PYear);
  formData.append("PCNumber", PCNumber);
  formData.append("PPWoreda", PPWoreda);
  formData.append("PPTWoreda", PPTWoreda);
  formData.append("PKebele", PKebele);
  formData.append("PVillage", PVillage);
  formData.append("PPName", PPName);
  formData.append("PFather", PFather);
  formData.append("PGrandF", PGrandF);
  formData.append("PMother", PMother);
  
  formData.append("PLatitude", PLatitude);
  formData.append("PLongitude", PLongitude);
  formData.append("Pbirth", Pbirth);
  formData.append("PAge", PAge);
  formData.append("PPSex", PPSex);
  formData.append("PFacilityT", PFacilityT);
  formData.append("TPFacilityT", TPFacilityT);
  formData.append("HFName", HFName);
  formData.append("HFTName", HFTName);
  formData.append("HRegion", HRegion);
  formData.append("HTRegion", HTRegion);
  formData.append("HSubCity", HSubCity);
  formData.append("THSubCity", THSubCity);
  formData.append("HWoreda", HWoreda);
  formData.append("HFTworeda", HFTworeda);
  formData.append("DPReporting", DPReporting);
  formData.append("PNName", PNName);
  formData.append("PNotifier", PNotifier);
  formData.append("TPNotifier", TPNotifier);
  formData.append("PDistrictN", PDistrictN);
  
  formData.append("PInvestigated", PInvestigated);
  formData.append("PRecordN", PRecordN);
  formData.append("PFName", PFName);
  formData.append("PParalysis", PParalysis);
  formData.append("PFever", PFever);
  formData.append("Pprogressed", Pprogressed);
  formData.append("PFlaccid", PFlaccid);
  formData.append("PAsymmetrical", PAsymmetrical);
  formData.append("PSite", PSite);
  formData.append("PTentative", PTentative);
  formData.append("PTAFP", PTAFP);
  formData.append("POPV", POPV);
  formData.append("PNIDs", PNIDs);
  formData.append("POPV0D", POPV0D);
  formData.append("POPV1D", POPV1D);
  formData.append("POPV2D", POPV2D);
  formData.append("POPV3D", POPV3D);
  formData.append("POPV4D", POPV4D);
  formData.append("Plast", Plast);
  formData.append("PUnknown", PUnknown);
  formData.append("TPOPV", TPOPV);
  formData.append("POPVRI", POPVRI);
  formData.append("PTotalIPV", PTotalIPV);
  formData.append("PDIPV", PDIPV);
  formData.append("PScollected1", PScollected1);
  formData.append("PScollected2", PScollected2);
  formData.append("PSnational", PSnational);
  formData.append("PSnationalR", PSnationalR);
  formData.append("PCondition", PCondition);
  formData.append("DEPI", DEPI);
  formData.append("PPrimary", PPrimary);
  formData.append("PNtoL", PNtoL);
  formData.append("PDdifferentiation", PDdifferentiation);
  formData.append("PDEPID", PDEPID);
  formData.append("PW", PW);
  formData.append("PDiscordant", PDiscordant)
  formData.append("PV", PV);
  formData.append("PNPENT", PNPENT);
  formData.append("PNEV", PNEV);
  formData.append("PFollowUp", PFollowUp);
  formData.append("PResidual", PResidual);
  formData.append("PFindings", PFindings);
  formData.append("PDiagnosis", PDiagnosis)
  formData.append("PImmunocompromised", PImmunocompromised);
  formData.append("Pclassification", Pclassification);
  formData.append("PSerotype", PSerotype);
  formData.append("PFCName", PFCName);
  formData.append("PTitle", PTitle)
  formData.append("PPhone", PPhone)
  formData.append("EPIWeek", EPIWeek);
  formData.append("file", file);
  console.log(title, file);

  const polio = await axios.post(
    "http://localhost:3000/PolioFile",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
   console.log(polio);
  if (polio.data.status == "ok") {
    alert("Uploaded Successfully!!!");
    getPdf();
  }
setPPRegion('')
setTPPRegion('')
setPPSubCity('')
setPYear('')
setPCNumber('')
setPReceivedD('')
setPPWoreda('')
setPPTWoreda('')
setPKebele('')
setPVillage('')
setPPName('')
setPFather('')
setPGrandF('')
setPMother('')
setPLatitude('')
setPLongitude('')
setPbirth('')
setPAge('')
setPPSex('')
setPFacilityT('')
setTPFacilityT('')
setHFName('')
setHFTName('')
setHRegion('')
setHTRegion('')
setHSubCity('')
setTHSubCity('')
setHWoreda('')
setHFTworeda('')
setDPReporting('')
setPNName('')
setPNotifier('')
setTPNotifier('')
setPDistrictN('')
setPInvestigated('')
setPAdmission('')
setPRecordN('')
setPFName('')
setPParalysis('')
setPFever('')
setPprogressed('')
setPFlaccid('')
setPAsymmetrical('')
setPSite('')
setPTentative('')
setPTAFP('')
setPOPV('')
setPNIDs('')
setPOPV0D('')
setPOPV1D('')
setPOPV2D('')
setPOPV3D('')
setPOPV4D('')
setPlast('')
setPUnknown('')
setTPOPV('')
setPOPVRI('')
setPTotalIPV('')
setPDIPV('')
setPScollected1('')
setPScollected2('')
setPSnational('')
setPSnationalR('')
setPCondition('')
setDEPI('')
setPPrimary('')
setPNtoL('')
setPDdifferentiation('')
setPDEPID('')
setPW('')
setPDiscordant('')
setPV('')
setPNPENT('')
setPNEV('')
setPFollowUp('')
setPResidual('')
setPFindings('')
setPDiagnosis('')
setPImmunocompromised('')
setPclassification('')
setPSerotype('')
setPFCName('')
setPTitle('')
setPPhone('')
setfile('')
setVisible('')
setevisit('')
setVisiblee('')
setvisited('')
setvisiting('')
setVisibles('')
setVisibleso('')
setvisit('')
setvisitA('')
setvisitB('')
setvisitC('')
setvisitD('')
setvisitE('')

};


const Upload= (event) => {
  event.preventDefault();
  const formData = new FormData()
  formData.append('Measle' , file)
  axios.post('http://localhost:3000/MeaslesFile',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Upload File successful')

  
}
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/Measles',{startDate,Latitude,Longitude,visible,Sex,Age,HNumber,PWoreda,pTWoreda,PSubCity,PRegion,WRegion,BDate,pname,visit,Eschool,SName,Hfacility,visite,PType,Weight,Hight,BMI,MUAC,PPhone,HRegion,HTRegion,HSubCity,HWoreda,HFTworeda,HFName,HFTName,NotifiedDate,OnsetDate,Orash,MNumber,Vdate,Aepidemics,visited,Treatment,TTreatment,visiblee,Dspeciemen,DspeciemenS,Tspecimen,TTspecimen,sample,TypeC,Labresults,SMeasles,Nmeasles,TNmeasles,visibleIso,Isolated,visibles,vitaminA,visiting,Complication,AdmitedHF,Tcomplications,Pfactors,WPfactors,DateSR,FCName,Phone,PNeonat,Outcome,email,EPIWeek})
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

console.log(values,"Health Facility List")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    
  }, []);

  //////////////////////////////////////////multiple selection Site of paralysis////////////////////////

  
 const  handleOnchangeSite  =  val  => {
  setPSite(val)
}
const  optionsSite  = [
  { label:  'Right Arm', value:  'Right Arm'  },
  { label:  'Right Leg', value:  'Right Leg'  },
  { label:  'Left Leg', value:  'Left Leg'  },
  { label:  'Left Arm', value:  'Left Arm'  },
  
]

 const  handleOnchangePW  =  val  => {
  setPW(val)
}
const  optionsPW  = [
  { label:  'W1', value:  'W1'  },
  { label:  'W2', value:  'W2'  },
  { label:  'W3', value:  'W3'  },
  
]

const  handleOnchangePV  =  val  => {
  setPV(val)
}
const  optionsPV  = [
  { label:  'V1', value:  'V1'  },
  { label:  'V2', value:  'V2'  },
  { label:  'V3', value:  'V3'  },
  
]


const  handleOnchangeRes  =  val  => {
  setPResidual(val)
}
const  optionsRes = [
  { label:  'Left Arm', value:  'Left Arm'  },
  { label:  'Left Leg', value:  'Left Leg'  },
  { label:  'Right Arm', value:  'Right Arm'  },
  { label:  'Right Leg', value:  'Right Leg'  },
]
  return (
    <>
    <div className=' bgcoll    main-containers  '>
    
      <form onSubmit={submitImage}>
      <div class='row'>
        <div className=' col bg-light rounded border border-danger vh-1 text-dark p-4'>
          <h4 className='border border-secondary bgcoll text-white rounded text-center'>Polio patient information</h4>
          <table className='Scrol-Table Scrol-Table table light padding table-responsive'>
        <tr className='border border-secondary'>
        <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Region</label>
                  <select type="text" className='form-control rounded-2 w-70' value={PPRegion} onChange={(e)=>(handleshowhide(e), setPPRegion(e.target.value))}>
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
                    <option value="1">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='1' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Residency Region</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Name of Region" value={TPPRegion} className='form-control rounded-2 w-70'
                    onChange={(e) => setTPPRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Sub City</label>
                  <select type="text" className='form-control rounded-2 w-70' value={PPSubCity} onChange={(e)=> setPPSubCity(e.target.value)}>
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
                <div className='mb-5'>
                <h6> <label htmlFor="email">Year onset (E.C)</label><br></br>
                <DatePicker selected={PYear} onChange={(date) => setPYear(date)} 
                 dateFormat='yyyy'
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
                <h6> <label htmlFor="email">Case Number</label><br></br>
                <input type="number" placeholder="ID" autoComplete="off" name="ID" value={PCNumber} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setPCNumber(e.target.value)} /></h6>
                </div>
         </th>
         </tr>
         <tr className='border border-secondary'>
              
         <th>
                <div className='mb-5'>
                <h6> <label htmlFor="email">Received Date</label><br></br>
                <DatePicker selected={PReceivedD} onChange={(date) => setPReceivedD(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Woreda</label>
                  <select type="text" className='form-control rounded-3 w-70' value={PPWoreda} onChange={(e)=>(handleshowhide(e),setPPWoreda(e.target.value))}  >
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
                    <option value="2">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='2' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Name of Woreda</label></h6>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Name of Woreda" value={PPTWoreda} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPPTWoreda(e.target.value)} />
                    </div>
                  )}           

              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Kebele | Ketena</label>
                  <input type="text" placeholder="Ketena" autoComplete="off" name="Ketena" value={PKebele} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPKebele(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Name of Village</label>
                  <input type="text" placeholder="Village" autoComplete="off" name="Village" value={PVillage} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPVillage(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Name of Patient</label>
                  <input type="text" placeholder="Village" autoComplete="off" name="Patient" value={PPName} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPPName(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Father's name</label>
                  <input type="text" placeholder="Father" autoComplete="off" name="Father" value={PFather} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPFather(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Grand Father</label>
                  <input type="text" placeholder="Grand" autoComplete="off" name="Grand" value={PGrandF} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPGrandF(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Mother's Full Name</label>
                  <input type="text" placeholder="Mother" autoComplete="off" name="Mother" value={PMother} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPMother(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              
              <th> 
                <div className='mb-2'>
                 <h6><label htmlFor="email">GPS | Location Coordinate</label>
                  <p onChange={(e) => setPLatitude(e.target.value)}>Latitude: {currLocation.PLatitude}</p>
                  <p onChange={(e) => setPLongitude(e.target.value)}>Longitude: {currLocation.PLongitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
                <div className='mb-5'>
                <h6> <label htmlFor="email">Date of birth</label><br></br>
                <DatePicker selected={Pbirth} onChange={(date) => setPbirth(date)} 
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
              <div className='mb-2'>
                <h6><label htmlFor="email">Age In years/ Months</label>
                  <input type="number" placeholder="Grand" autoComplete="off" name="Ketena" value={PAge} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPAge(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Sex</label><br></br>
                 <th className='p-3'><h6> Male</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setVisible(true)} onChange={(e) => setPPSex(e.target.value)} /></th>
                 <th className='p-3'><h6>Female</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setVisible(false)} onChange={(e) => setPPSex(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              
              </tr>
              </table>
        </div>
        <div className='col-md-6 bg-light rounded p-0 border border-danger text-dark p-4 '>
          <h4 className='border border-secondary  rounded bgcoll text-white text-center'>Polio Health Facility information</h4>
          <table className='border border-secondary Scrol-Table Scrol-Table table light padding table-responsive'>
            <tr>
            <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Reporting Health Facility Type</label>
                  <select type="text" className='form-control rounded-0 w-50' value={PFacilityT} onChange={(e)=>(handleshowhide(e), setPFacilityT(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Health post">Health post</option>
                    <option value="Health center">Public Health center</option>
                    <option value="Hospital">Public Hospital</option>
                    <option value="Afar Region">Privat clinic or hospital</option>
                    <option value="3">Other</option>
                  </select></h6>
              </div>
              {
                  showhide==='3' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">If other, Specify Facility</label></h6>
                  <input type="text" placeholder="Occupation.."  autoComplete="off" name="Occupation" value={TPFacilityT} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setTPFacilityT(e.target.value)} />
                    </div>
                  )} 
              </th>
              <th>
              
              <div>
            <label><h5>Reporting Health Facility Name | የጤና ተቋሙ ስም</h5></label>
            <select 
             id="HName"
             placeholder="select the title"
             value={HFName}
             required
            onChange={(e)=>setHFName(e.target.value)} className='form-control rounded-2 w-50'>
               <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HFName}</option>})
                }
                <option value="4">Other</option>
            </select>
            
            </div>
                {
                  showhide==='4' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Specify if name of health facility is not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTName} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHFTName(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              
              <th>
                
            <div>
            <label><h5>Region | ጤና ተቋሙ የሚገኝበት ክልል</h5></label>
            <select 
             id="Region"
             placeholder="select the Region"
             value={HRegion}
             required
            onChange={(e)=>setHRegion(e.target.value)} className='form-control rounded-2 w-70'>
               <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HRegion}</option>})
                }
                <option value="5">Other</option>
            </select>
            </div>
                {
                  showhide==='5' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Region</label>
                  <input type="text" placeholder=" Region.." autoComplete="off"  name="Facility Name" value={HTRegion} className='form-control rounded-0 w-70'
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
                        onChange={(e)=>(handleshowhide(e), setHSubCity(e.target.value))} className='form-control rounded-2 w-70'>
                           <option value="" selected disabled >-- Select--</option>
                            {
                                values.map((opts,i)=>{return <option key={i}>{opts.HSubCity}</option>})
                            }
                            <option value="6">Other</option>
                        </select>
                        </div>
                {
                  showhide==='6' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Sub-City</label>
                  <input type="text" placeholder=" Sub-City.." autoComplete="off"  name="Facility Name" value={THSubCity} className='form-control rounded-0 w-70'
                    onChange={(e) => setTHSubCity(e.target.value)} /></h6>
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
            onChange={(e)=>(handleshowhide(e), setHWoreda(e.target.value))} className='form-control rounded-2 w-50'>
               <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HWoreda}</option>})
                }
                <option value="7">Other</option>
            </select>
            </div>
                
                {
                  showhide==='7' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Woreda if not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTworeda} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setHFTworeda(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              
              <th>
                <div className='mb-2 p-4'>
                <h6> <label htmlFor="email">Date of Reporting</label><br></br>
                  <DatePicker selected={DPReporting} onChange={(date) => setDPReporting(date)} 
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
            </tr>
          </table>
        </div>
        <div className=' col w-5 bg-white rounded p-3 border border-danger h6 text-dark '>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Polio Reporting Format</h4>
          <table className='Scrol-Table Scrol-Table table light padding table-responsive'>
            <tr className='border border-secondary'>
            <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Notified by (Name)</label>
                  <input type="text" placeholder="Notified" autoComplete="off" name="ANC" value={PNName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setPNName(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Who is the notifier</label>
                  <select type="text" className='form-control rounded-2 w-75' value={PNotifier} onChange={(e)=>(handleshowhide(e), setPNotifier(e.target.value))}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Community Volunteer(CV)">ommunity Volunteer(CV)</option>
                    <option value="Health Extension Worker(HEW)">Health Extension Worker(HEW)</option>
                    <option value="Forceps"> Forceps</option>
                    <option value="Other Health Worker(OHW)">Other Health Worker(OHW)</option>
                    <option value="8">Other</option>
                    
                  </select></h6>
                </div>
                {
                  showhide==='8' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If other,Specify</label>
                  <input type="text" placeholder="notifier" autoComplete="off" name="APGAR" value={TPNotifier} className='form-control rounded-2 w-75'
                    onChange={(e) => setTPNotifier(e.target.value)} /></h6>
                    </div>
                  )}   
                </th>
                <th>
                <div className='mb-5'>
                <h6> <label htmlFor="email">Date District Notified</label><br></br>
                  <DatePicker selected={PDistrictN} onChange={(date) => setPDistrictN(date)} 
                  dateFormat='dd/MM/yyyy'
                  maxDateDate={new Date()}
                  isClearable
                  showYearDropdown
                  showMonthDropdown
                  showIcon
                  className='form-control justify-center rounded-lg w-100 text-3x1'
                 /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date Case Investigated</label><br></br>
                  <DatePicker selected={PInvestigated} onChange={(date) => setPInvestigated(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of Admission</label><br></br>
                  <DatePicker selected={PAdmission} onChange={(date) => setPAdmission(date)} 
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
                <div className='mb-2'>
                <h6> <label htmlFor="email">Medical Record Number</label>
                  <input type="number" placeholder="Notified" autoComplete="off" name="ANC" value={PRecordN} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setPRecordN(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Name/address of Facility</label>
                  <input type="text" placeholder="Notified" autoComplete="off" name="ANC" value={PFName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setPFName(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date Onset of Paralysis</label><br></br>
                  <DatePicker selected={PParalysis} onChange={(date) => setPParalysis(date)} 
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
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Fever at onset of paralysis?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Fever' value='Yes'onClick={ ()=>setevisit(true)} onChange={(e) => setPFever(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Fever' value='No'onClick={ ()=>setevisit(false)} onChange={(e) => setPFever(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Paralysis progressed ﹤=3 days?</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Paralysis' value='Yes'onClick={ ()=>setVisiblee(true)} onChange={(e) => setPprogressed(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Paralysis' value='No'onClick={ ()=>setVisiblee(false)} onChange={(e) => setPprogressed(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Flaccid & acute paralysis?</label><br></br>
                 <th className='p-3'><h6> Yes</h6> <input type="radio" name='Flaccid' value='Yes'onClick={ ()=>setvisited(true)} onChange={(e) => setPFlaccid(e.target.value)} /></th>
                 <th className='p-3'><h6>No</h6><input type="radio" name='Flaccid' value='No'onClick={ ()=>setvisited(false)} onChange={(e) => setPFlaccid(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Asymmetrical ?</label><br></br>
                 <th className='p-3'><h6> Yes</h6> <input type="radio" name='Asymmetrical' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setPAsymmetrical(e.target.value)} /></th>
                 <th className='p-3'><h6>No</h6><input type="radio" name='Asymmetrical' value='No'onClick={ ()=>setvisiting(false)} onChange={(e) => setPAsymmetrical(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
                <th>
                  <div className="app">
                   <div  className="preview-values">
                  <h6>Site of paralysis</h6>
                  {PSite}
                   </div>
                  <MultiSelect
                  value={PSite}
                  Searchable
                  onChange={(e)=>(handleOnchangeSite(e), setPSite(e.target.value))}
                  options={optionsSite}
                  className='form-control justify-center rounded-lg w-75 text-3x1'              
                   />             
                  </div>
                </th>
              
              <th>
              <div className='mb-2'>
              <h6><label htmlFor="email">Tentative Diagnosis</label>
                <textarea
                id="Tentative"
               value={PTentative}
               required
                onChange={(e) => setPTentative(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Place a comment to The Proposal..."
              ></textarea></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Name of officer completing the form</label>
                  <input type="text" placeholder="Enter Phone Number" autoComplete="off" name="Phone Number" value={PFCName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setPFCName(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Title</label>
                  <input type="text" placeholder="Mr's" autoComplete="off" name="Facility Name" value={PTitle} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPTitle(e.target.value)} /></h6>
                    </div>
              </th>
              <th>
              <h6><label htmlFor="email">Phone number of officer completing form:</label>
              <PhoneInput
                  placeholder="Enter phone number"
                  value={PPhone}
                  onChange={setPPhone}/></h6>
                
              </th> 
              <th>
                <div className='mb-5'>
                <h6><label htmlFor="email">EPI_Week</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1'  value={EPIWeek} onChange={(e)=>setEPIWeek(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="National">--EPI_Week--</option>
                    { EPI_Week .map(Ctr => (
                      <option value={Ctr.Week}>{Ctr.Week}</option>
                    ))}
                  </select></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div className='mb-5'>
              <h6><label htmlFor="email">Take_a_photo</label><br />
                  <input type='file' name='file' accept="application/pdf" onChange={(e) => setfile(e.target.files[0])} required multiple/><br></br>
                  
                  </h6></div>
              </th>
              <th  colspan="5">
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">After Investigation, was this true AFP?</label><br></br>
                 <th className='p-3'><h6> Yes</h6> <input type="radio" name='Investigation' value='Yes'onClick={ ()=>setVisibles(true)} onChange={(e) => setPTAFP(e.target.value)} /></th>
                 <th className='p-3'><h6>No</h6><input type="radio" name='Investigation' value='No'onClick={ ()=>setVisibles(false)} onChange={(e) => setPTAFP(e.target.value)} /></th>
                 </h6>
                </div>
                {visibles &&
                     <> <tr className='border border-secondary'>
                      <th>
                          <div className='form-check-inline'>
                            <h6><label htmlFor="email">Has the child taken any dose of OPV during Supplemental Immunization?</label><br></br>
                              <th className='p-3'><h6> Yes</h6> <input type="radio" name='OPV' value='Yes' onClick={() => setVisibleso(true)} onChange={(e) => setPOPV(e.target.value)} /></th>
                              <th className='p-3'><h6>No</h6><input type="radio" name='OPV' value='No' onClick={() => setVisibleso(false)} onChange={(e) => setPOPV(e.target.value)} /></th>
                              <th className='p-3'><h6>Unknown</h6><input type="radio" name='OPV' value='No' onClick={() => setvisit(true)} onChange={(e) => setPOPV(e.target.value)} /></th>
                            </h6>
                          </div>
                          {visibleso &&
                              <th>
                              <div className='mb-2'>
                              <h6> <label htmlFor="email">If yes, total number of OPV doses during routine and s/NIDs (Exclude OPV-0 dose)</label>
                                <input type="number" placeholder="Notified" autoComplete="off" name="ANC" value={PNIDs} className='form-control justify-center rounded-lg w-75 text-3x1'
                                  onChange={(e) => setPNIDs(e.target.value)} /></h6>
                              </div>
                            </th>
                              }
                        </th>
                        <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of OPV Zero</label><br></br>
                  <DatePicker selected={POPV0D} onChange={(date) => setPOPV0D(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of OPV 1st</label><br></br>
                  <DatePicker selected={POPV1D} onChange={(date) => setPOPV1D(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of OPV 2nd</label><br></br>
                  <DatePicker selected={POPV2D} onChange={(date) => setPOPV2D(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of OPV 3rd</label><br></br>
                  <DatePicker selected={POPV3D} onChange={(date) => setPOPV3D(date)} 
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
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of OPV 4th</label><br></br>
                  <DatePicker selected={POPV4D} onChange={(date) => setPOPV4D(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">If ﹥ 4, date of last OPV dose</label><br></br>
                  <DatePicker selected={Plast} onChange={(date) => setPlast(date)} 
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
              <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Unknown</label>
                  <input type="text" placeholder="99" autoComplete="off" name="Facility Name" value={PUnknown} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setPUnknown(e.target.value)} /></h6>
                    </div>
              </th>
              <th>
              <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Total OPV (bOPV/mOPV2) doses received (SIA)</label>
                  <input type="text" placeholder="Total OPV" autoComplete="off" name="Facility Name" value={TPOPV} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setTPOPV(e.target.value)} /></h6>
                    </div>
              </th>
              <th>
              <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Total OPV (bOPV/mOPV2) doses received (RI)</label>
                  <input type="text" placeholder="Total OPV" autoComplete="off" name="Facility Name" value={POPVRI} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setPOPVRI(e.target.value)} /></h6>
                    </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Total IPV doses received (RI and/or SIA)</label>
                  <input type="text" placeholder="Total OPV" autoComplete="off" name="Facility Name" value={PTotalIPV} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setPTotalIPV(e.target.value)} /></h6>
                    </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date of last IPV dose received through RI or SIA</label><br></br>
                  <DatePicker selected={PDIPV} onChange={(date) => setPDIPV(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date 1st stool collected</label><br></br>
                  <DatePicker selected={PScollected1} onChange={(date) => setPScollected1(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date 2nd stool collected</label><br></br>
                  <DatePicker selected={PScollected2} onChange={(date) => setPScollected2(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date stool sent from field to national level</label><br></br>
                  <DatePicker selected={PSnational} onChange={(date) => setPSnational(date)} 
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
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date stool specimen received by national lab</label><br></br>
                  <DatePicker selected={PSnationalR} onChange={(date) => setPSnationalR(date)} 
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
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Condition of stool</label><br></br>
                 <th className='p-3'><h6>Adequate</h6> <input type="radio" name='stool' value='Adequate'onClick={ ()=>setvisitA(true)} onChange={(e) => setPCondition(e.target.value)} /></th>
                 <th className='p-3'><h6>Not Adequate</h6><input type="radio" name='stool' value='Not Adequate'onClick={ ()=>setvisitA(false)} onChange={(e) => setPCondition(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date result received by national surveillance/EPI</label><br></br>
                  <DatePicker selected={DEPI} onChange={(date) => setDEPI(date)} 
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
              <div className='mb-2'>
                <h6><label htmlFor="email">Primary isolation result</label>
                <select type="text" className='form-control rounded-3 w-70' value={PPrimary} onChange={(e)=>setPPrimary(e.target.value)} >
                <option value="" selected disabled >-- Select--</option>
                    <option value="Suspected polio virus">Suspected polio virus</option>
                    <option value="Negative">Negative</option>
                    <option value="NPENT">NPENT</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Suspected poliovirus + NPENT">Suspected poliovirus + NPENT</option>
                  </select></h6>
                </div>
              </th>
             
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date isolate sent from National Lab to Regional Lab.</label><br></br>
                  <DatePicker selected={PNtoL} onChange={(date) => setPNtoL(date)} 
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
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date differentiation result sent by Regional Lab</label><br></br>
                  <DatePicker selected={PDdifferentiation} onChange={(date) => setPDdifferentiation(date)} 
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
                <div className='mb-2'>
                <h6><label htmlFor="email">Date differentiation result received by National EPI/surveillance</label><br></br>
                  <DatePicker selected={PDEPID} onChange={(date) => setPDEPID(date)} 
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
                <div className="app">
                <div  className="preview-values">
                <h6>W</h6>
                {PW}
                </div>
                <MultiSelect
                value={PW}
                Searchable
                onChange={(e)=>(handleOnchangePW(e), setPW(e.target.value))}
                options={optionsPW}                  
                />                 
                </div>
              </th>
              
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Discordant sabin</label>
                <select type="text" className='form-control rounded-3 w-70' value={PDiscordant} onChange={(e)=>setPDiscordant(e.target.value)} >
                <option value="" selected disabled >--Select Discordant status--</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Type 3">Type 3</option>
                   
                  </select></h6>
                </div>
              </th>
              <th>
                <div className="app">
                <div  className="preview-values">
                <h6>V</h6>
                {PV}
                </div>
                <MultiSelect
                value={PV}
                Searchable
                onChange={(e)=>(handleOnchangePV(e), setPV(e.target.value))}
                options={optionsPV}                  
                />                 
                </div>
              </th>
            
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">(R)NP-ENT</label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='NP' value='Yes'onClick={ ()=>setvisitB(true)} onChange={(e) => setPNPENT(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='NP' value='No'onClick={ ()=>setvisitB(false)} onChange={(e) => setPNPENT(e.target.value)} /> </th>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">NEV</label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='NEV' value='Yes'onClick={ ()=>setvisitC(true)} onChange={(e) => setPNEV(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='NEV' value='No'onClick={ ()=>setvisitC(false)} onChange={(e) => setPNEV(e.target.value)} /> </th>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Date follow-up Examination</label><br></br>
                  <DatePicker selected={PFollowUp} onChange={(date) => setPFollowUp(date)} 
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
                <div className="app">
                <div  className="preview-values">
                <h6>Residual Paralysis</h6>
                {PResidual}
                </div>
                <MultiSelect
                value={PResidual}
                Searchable
                onChange={(e)=>(handleOnchangeRes(e), setPResidual(e.target.value))}
                options={optionsRes}                  
                />                 
                </div>
              </th>
              
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Findings at Follow up</label>
                <select type="text" className='form-control rounded-3 w-70' value={PFindings} onChange={(e)=>setPFindings(e.target.value)} >
                <option value="" selected disabled>--Select Findings--</option>
                    <option value="Residual paralysis">Residual paralysis</option>
                    <option value="No residual paralysis">No residual paralysis</option>
                    <option value="Lost to follow-up">Lost to follow-up</option>
                    <option value="Death before follow-up">Death before follow-up</option>
                  </select></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div className='mb-2'>
              <h6><label htmlFor="email">Clinical Diagnosis of the Case on follow-up</label>
              <textarea
                id="PDiagnosis"
               value={PDiagnosis}
               required
                onChange={(e) => setPDiagnosis(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Place a comment to The Proposal..."
              ></textarea></h6>
               </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Immunocompromised status suspected</label></h6><br></br>
                  <th className='p-3'><h6>Yes</h6><input type="radio" name='Immunocompromised' value='Yes'onClick={ ()=>setvisitD(true)} onChange={(e) => setPImmunocompromised(e.target.value)} /> </th>
                  <th className='p-3'><h6>No</h6><input type="radio" name='Immunocompromised' value='No'onClick={ ()=>setvisitD(false)} onChange={(e) => setPImmunocompromised(e.target.value)} /> </th>
                  <th className='p-3'><h6>Unknown</h6><input type="radio" name='Immunocompromised' value='Unknown'onClick={ ()=>setvisitE(false)} onChange={(e) => setPImmunocompromised(e.target.value)} /> </th>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Final classification of the case</label>
                <select type="text" className='form-control rounded-3 w-70' value={Pclassification} onChange={(e)=>setPclassification(e.target.value)} >
                <option value="" selected disabled>--Select classification--</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Compatible">Compatible</option>
                    <option value="Discarded">Discarded</option>
                    <option value="Not an AFP">Not an AFP</option>
                    <option value="cVDPV">cVDPV</option>
                    <option value="aVDPV">aVDPV</option>
                    <option value="iVDPV">iVDPV</option>
                  </select></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Serotype</label>
                <select type="text" className='form-control rounded-3 w-70' value={PSerotype} onChange={(e)=>setPSerotype(e.target.value)} >
                <option value="" selected disabled>--Select Serotype--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select></h6>
                </div>
              </th>
              </tr>
               </>
                     }
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

export default Polio     
