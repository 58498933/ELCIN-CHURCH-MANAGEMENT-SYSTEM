import React,{useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Login from "./Components/Tabs/login";
import Register from "./pages/register"
import Member from "./pages/member";
import { useStateContext } from './context/ContextProvider';
import Sidebar from "./Components/Sidebar";
// import StaffSideBar from "./Components/StaffSideBar";
import MemberSidebar from "./Components/membersidebar";
import Navbar from './Components/Navbar';
import Baptism from './pages/baptism'
import Certificate from './Components/certificates/Certificate'

import Confirmation from "./pages/confirmation"
import NewDeath from "./pages/new_death"
import Marriage from "./pages/marriage"
import Members from "./pages/members"
import Events from "./pages/events"
import NewEvent from "./pages/newEvent"
import Profile from "./pages/profile"
import OtherProfileEdit from "./pages/other_profile_edit"
import EditProfileInfo from "./pages/edit_profile_info";
import ConfirmationCertificate from './Components/certificates/ConfirmationCertificate';
import MarriageCertificate from './Components/certificates/MarriageCertificate';
import DeathCertificate from './Components/certificates/DeathCertificate';
import NewRecord from './pages/NewRecord';
import NewMarriage from './Components/NewMarriage';
import NewConfirmation from './Components/NewConfirmation';
import NewBaptism from './Components/NewBaptism';
import NewTransaction from './pages/new_transaction';
import Transactions from './pages/transactions';
import Dashboard from './pages/dashboard';
import NewExpenses from './pages/new_expenses';
import NewOfferings from './pages/new_offerings';
import Payments from './pages/payments';

function App() {

  

  const { memberUser,user,userAdmin,userMember,setCurrentMode, currentMode, activeMenu,setAdmin,setMember } = useStateContext();

  const RequireAuth = ({children}) =>{
    return (userAdmin || userMember) ? children : <Navigate to="/"/>
  }

  useEffect( () => {
    const admin = localStorage.getItem('admin');
    const member = localStorage.getItem('member');

    if( (admin !== null || admin !== undefined) && (member !== null || member !== undefined) ){
      setAdmin(JSON.parse(admin))
      setMember(JSON.parse(member))
      console.log(`WE UPDATED THE admin::: ${userMember} and member::: ${userAdmin}`);
    
    }
    // if(member !== null || member !== undefined){
    //   setAdmin(JSON.parse(admin))
    //   setMember(JSON.parse(member))
    // }

  },[])



  return (
    <div className=' bg-slate-800'>
    <BrowserRouter>
    <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>

    </div>
    { (userAdmin && !userMember)  ?
                   (activeMenu ? (<div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white "><Sidebar /></div>) : (<div className="w-0 dark:bg-secondary-dark-bg"><Sidebar /></div>)) : <></> }

    { (!userAdmin && userMember)  ? (activeMenu ? (<div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white "><MemberSidebar/></div>) : (<div className="w-0 dark:bg-secondary-dark-bg"><MemberSidebar/></div>)) : <></> }


    <div className={activeMenu ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full': 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}>

    {(userAdmin || userMember) ? <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
     <Navbar />
    </div> : 
    <></>}
    <div>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/new_death' element={<RequireAuth><NewDeath/></RequireAuth>}></Route>
      <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}></Route>
      <Route path='/home' element={<RequireAuth><Member/></RequireAuth>}></Route>
      <Route path='/members' element={<RequireAuth><Members/></RequireAuth>}></Route>
      <Route path='/baptism' element={<RequireAuth><Baptism/></RequireAuth>}></Route>
      <Route path='/confirmation' element={<RequireAuth><Confirmation/></RequireAuth>}></Route>
      <Route path='/marriage' element={<RequireAuth><Marriage/></RequireAuth>}></Route>
      <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}></Route>
      <Route path='/edit_profile' element={<EditProfileInfo/>}></Route>
      <Route path='/edit_other' element={<OtherProfileEdit/>}></Route>
      <Route path='/certificate' element={<RequireAuth><Certificate/></RequireAuth>}></Route>
      <Route path='/confirmation_paper' element={<RequireAuth><ConfirmationCertificate/></RequireAuth>}></Route>
      <Route path='/marriage_paper' element={<RequireAuth><MarriageCertificate/></RequireAuth>}></Route>
      <Route path='/death_paper' element={<RequireAuth><DeathCertificate/></RequireAuth>}></Route>
      <Route path='/new_record' element={<RequireAuth><NewRecord/></RequireAuth>}></Route>
      <Route path='/new_baptism' element={<RequireAuth><NewBaptism/></RequireAuth>}></Route>
      <Route path='/new_confirmation' element={<RequireAuth><NewConfirmation/></RequireAuth>}></Route>
      <Route path='/new_marriage' element={<NewMarriage/>}></Route>
      <Route path='/events' element={<RequireAuth><Events/></RequireAuth>}></Route>
      <Route path='/new_event' element={<RequireAuth><NewEvent/></RequireAuth>}></Route>
      <Route path='/new_transaction' element={<RequireAuth><NewTransaction/></RequireAuth>}></Route>
      <Route path='/new_offering' element={<RequireAuth><NewOfferings/></RequireAuth>}></Route>
      <Route path='/new_expense' element={<RequireAuth><NewExpenses/></RequireAuth>}></Route>
      <Route path='/transactions' element={<RequireAuth><Transactions/></RequireAuth>}></Route>
      <Route path='/payments' element={<RequireAuth><Payments/></RequireAuth>}></Route>
    </Routes>
    
    </div>
    </div>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
