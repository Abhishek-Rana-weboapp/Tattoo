import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { json, useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import GeneralLayout from './Layout/FormLayout';
import { isCursorAtStart } from '@testing-library/user-event/dist/utils';
import MedicalFormLayout from './Layout/MedicalFormLayout';
import Modal from './modal/Modal';

function MedicalForm() {

  var progressValue = 50;
  const[progressValue_,setprogressValue_]=useState(1)
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const { user, selectedPattern } = useContext(UserContext)
  const { formData, setFormData } = useContext(UserContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup_, setShowPopup_] = useState(true);

  const [showEmergencyContactPopup, setShowEmergencyContactPopup] = useState(true);


  const options = ['Yes', 'No',];
  const [updateEmergencyContact, setUpdateEmergencyContact] = useState(false);
  const [data, setdata] = useState()
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);



  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    try {
      const response = await fetch(`${apiUrl}/artist/username_appointment_list?username=${username}`);
      const data = await response.json();

      if (data.data.length > 0) {

        //console.log("have medical history :",data.data[data.data.length-1])    
        setdata(data.medicalhistory)
        setShowPopup_(true);
      } 
    } catch (error) {
      console.error('Error fetching previous medical history:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdatedata = (value) => {
    if (value === 'No') {
      setFormData({
        'page1':data?.tattooedBefore,
        'page2': data?.pregnantOrNursing,
        'page3': data?.hemophiliac,
        'page4': data?.medicalCondition,
        'page5': data?.communicableDiseases,
        'page6': data?.alcohol,
        'page7': data?.allergies,
        'page8': data?.heartCondition
      })
      navigate("/emergency-contact")
    }
      if(value === "Yes"){
        setShowPopup_(!showPopup_)
      } 
  }



  useEffect(() => {
    if (user.selectedTattooType !== null || user.tattooLocation !== null || user.piercingLocation !== null || user.selectedPattern !== null) {
      setShowPopup(true);
    }
  }, [user.selectedTattooType, user.tattooLocation]);


  const handleInputChange = (page, option, value) => {
    setFormData({
      ...formData,
      [page]: { ...formData[page], [option]: value },
    });
  };

const handleRadioButtons = (e , page)=>{
  if(e.target.value === "yes"){
    setFormData({
      ...formData,
      [page]: { ...formData[page], yes: true , no : false }
    });
  }
  if(e.target.value === "no"){
    setFormData({
      ...formData,
      [page]: { ...formData[page], yes: false , no : true }
    });
    if(Object.keys(formData[page]).includes("explanation")){
      setFormData({
        ...formData,
        [page]: { ...formData[page], yes: false , no : true , explanation: "" }
      });
    }
    if(Object.keys(formData[page]).includes("pregnant" || "nursing")){
      setFormData({
        ...formData,
        [page]: { ...formData[page], yes: false , no : true , pregnant : false , nursing:false }
      });
    }
  }
}

const handleCheckBoxes = (e , page)=>{
  if(e.target.value === "pregnant"){
    setFormData({
      ...formData,
      [page]: { ...formData[page],pregnant: true , nursing : false }
    });
  }
  if(e.target.value === "nursing"){
    setFormData({
      ...formData,
      [page]: { ...formData[page],pregnant: false , nursing : true }
    });
  }
}

  const nextPage = () => {
    const currentPageData = formData[`page${currentPage}`];
    if (currentPageData.yes ) {
      if(currentPage === 1 ){
        setprogressValue_(progressValue_+1)
        setCurrentPage(currentPage + 1);
      }
      if(currentPage === 2){
        if(currentPageData.pregnant || currentPageData.nursing){
          setprogressValue_(progressValue_+1)
          setCurrentPage(currentPage + 1);
        }else{
          alert("Please Select an option")
        }
      }else if(currentPage !== 1 && currentPage !== 2 ){
        if(currentPageData.explanation){
          setprogressValue_(progressValue_+1)
          setCurrentPage(currentPage + 1);
          if(currentPage === 8){
            navigate('/emergency-contact')
          }
        }else{
          alert("Please enter the explanation")
        }
      }
    } if(currentPageData.no){
      setprogressValue_(progressValue_+1)
      setCurrentPage(currentPage + 1);
      if(currentPage === 8){
        navigate('/emergency-contact')
      }
    }else if(!currentPageData.no && !currentPageData.yes) {
      // Show an alert message if the user doesn't select a choice
      alert('Please choose an option before moving to the next question.');
    }

  };


  const prevPage = () => {
    setprogressValue_(progressValue_-1)
    setCurrentPage(currentPage - 1);
  };

  console.log(user)

  return (

    <MedicalFormLayout
      title="Medical history"
      progressValue={progressValue}
      progressValue_={progressValue_}
      progressValue_count_={8}
    >
   
      {/* {showEmergencyContactPopup && (
        <div className="popup text-2xl uppercase text-white"  
          style={{top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backdropFilter: "blur(6px)",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h2>Do You Need to Update Your Emergency Contact?</h2>
          <div className='flex justify-between'>
          <button onClick={() => navigate('/emergency-contact')}>Yes</button>
          <button onClick={() => navigate('/doctor-info')}>No</button>
          </div>
        </div>
      )} */}
      {/* {
     showEmergencyContactPopup &&
        <Modal>
      <h2>Do You Need to Update Your Emergency Contact?</h2>
          <div className='flex gap-5'>
          <button className='yellowButton rounded-lg py-2 px-5 text-xl font-semibold ' onClick={() => navigate('/emergency-contact')}>Yes</button>
          <button className='yellowButton rounded-lg py-2 px-5 text-xl font-semibold ' onClick={() => {
            setShowEmergencyContactPopup(!showEmergencyContactPopup)
            setShowPopup_(!showPopup_)
            }}>No</button>
          </div>
      </Modal>
      } */}
      {
        showPopup_ && <Modal>
          <h3>Do you want to update your medical history?</h3>

{/* // Dropdown menu */}
<div className='flex gap-1 items-center'>
<label>Select an option:</label>
<select
  className='rounded p-2 border-1 border-slate-400'
  onChange={(e) => handleUpdatedata(e.target.value)}
>
  <option value="">Select...</option>
  {options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ))}
</select>
  </div>

<button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={() => { setShowPopup_(false);  }}>Close Popup</button>

        </Modal>
      }
     
      {/* {showPopup_ && (
        <div  className='popup text-2xl uppercase text-white'  
        style={{ top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          backdropFilter: 'blur(6px)',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div styl className='text-2xl uppercase text-white'            
           style={{ 
            width: '50%',
            minHeight: '200px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
            padding: '20px 40px',
            borderRadius: '12px',
          }}>
            <h3>Do you want to update your medical history?</h3>

            {/* // Dropdown menu */}
           {/* <label>Select an option:</label>
            <select
              className='bg-black'
              onChange={(e) => handleUpdatedata(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={() => { setShowPopup_(false);  }}>Close Popup</button>
          </div>
        </div>
      )}  */}
      

      {currentPage === 1 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
          <h3  className='uppercase text-white'><span className='underline'>Q1</span> : Have you ever been tattooed before?</h3>
          <div className='flex gap-4'>
            <div className='flex gap-2 items-center'>
              
          <label  className='text-2xl uppercase text-white' >
            YES
            </label>
            <input
              type="radio"
              name="page1"
              value="yes"
              checked={formData.page1.yes}
              onChange={() => handleInputChange('page1', 'yes', true)}
              />
              </div>
              <div className='flex gap-2 items-center'>

          <label className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page1"
              value="no"
              checked={formData.page1.no}
              onChange={() => handleInputChange('page1', 'no', true)}
              />
              </div>
              </div>
              <ProgressBar progress={progressValue_} />
              <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={()=>navigate(-1)}>Prev</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
              </div>
        </div>
      )}


      {/* Page 2 */}

      {currentPage === 2 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
        <h3  className='uppercase text-white'><span className='underline'>Q2</span> : Are you Pregnant or Nursing?</h3>
        <div className='flex gap-4'> 

        <div className='flex gap-2 items-center'>

          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page2"
              value="yes"
              checked={formData.page2.yes}
              onChange={(e) => handleRadioButtons(e ,'page2')}
              />
              </div>
              <div className='flex gap-2 items-center'>

          <label  className='text-2xl uppercase text-white'>
            NO
          </label>
            <input
              type="radio"
              name="page2"
              value="no"
              checked={formData.page2.no}
              onChange={(e) => handleRadioButtons(e ,'page2')}
              />
              </div>
            </div>

  <label className='text-white'>IF YES , PLEASE SELECT WHICH ONE</label>
            <div className='flex gap-10'> 
       <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            Pregnant
            </label >
            <input
              type="checkbox"
              name="page2-pregnant"
              value={"pregnant"}
              checked={formData.page2.pregnant}
              disabled={formData.page2.no}
              onChange={(e) => handleCheckBoxes(e ,'page2')}
            />
          <label  className='text-2xl uppercase text-white'>
            Nursing
            </label >
            <input
              type="checkbox"
              name="page2-nursing"
              value={"nursing"}
              checked={formData.page2.nursing}
              disabled={formData.page2.no}
              onChange={(e) => handleCheckBoxes(e ,'page2')}
            />
            </div>
            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
        </div>
        </div>

      )}

      {/* Page 3 */}

      {currentPage === 3 && (
        <>
          <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
         <h3  className='uppercase text-white'><span className='underline'>Q3</span>: Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?</h3>
         <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page3"
              value="yes"
              checked={formData.page3.yes}
              onChange={(e) => handleRadioButtons(e,'page3')}
            />
            </div>
            <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page3"
              value="no"
              checked={formData.page3.no}
              onChange={(e) => handleRadioButtons(e ,'page3')}
            />
         </div>
         </div>
          
            <div className='flex gap-2 items-center'>
              <label  className='text-lg uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                name="page3-explanation"
                className=' w-52 h-10 p-2 rounded-lg'
                value={formData.page3.explanation}
                disabled={!formData.page3.yes ? true : false}
                onChange={(e) => handleInputChange('page3', 'explanation', e.target.value)}
              />

            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
          </div>
          </div>
        </>
      )}

      {/* Page 4 */}
      {currentPage === 4 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
        <h3  className='uppercase text-white'><span className='underline'>Q4</span>: Do you have any medical or skin conditions?</h3>
        <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page4"
              value="yes"
              checked={formData.page4.yes}
              onChange={(e) => handleRadioButtons(e , 'page4')}
            />
          </div>
          <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page4"
              value="no"
              checked={formData.page4.no}
              onChange={(e) => handleRadioButtons(e ,'page4')}
              />
              </div>
              </div>
          
            <div className='flex gap-2 items-center'>
              <label  className='text-2xl uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                name="page4-explanation"
                className=' w-52 h-10 p-2 rounded-lg'
                disabled={!formData.page4.yes ? true : false}
                value={formData.page4.explanation}
                onChange={(e) => handleInputChange('page4', 'explanation', e.target.value)}
              />

            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
          </div>
        </div>
      )}


      {/* Page 5 */}
      {currentPage === 5 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
        <h3  className='uppercase text-white'><span className='underline'>Q5</span>: Do you have any communicable diseases?</h3>
        <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page5"
              value="yes"
              checked={formData.page5.yes}
              onChange={(e) => handleRadioButtons(e ,'page5')}
            />
          </div>
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page5"
              value="no"
              checked={formData.page5.no}
              onChange={(e) => handleRadioButtons(e ,'page5')}
            />
          </div>
          </div>
          
            <div className='flex gap-2 items-center'>
              <label  className='text-2xl uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                name="page5-explanation"
                className=' w-52 h-10 p-2 rounded-lg'
                disabled={!formData.page5.yes ? true : false}
                value={formData.page5.explanation}
                onChange={(e) => handleInputChange('page5', 'explanation', e.target.value)}
              />

            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
          </div>
        </div>
      )}


      {/* Page 6 */}
      {currentPage === 6 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
        <h3  className='uppercase text-white flex gap-2'><span className='underline'>Q6:</span><span> Are you under the influence of alcohol or drugs, prescribed or otherwise?</span></h3>
        <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page6"
              value="yes"
              checked={formData.page6.yes}
              onChange={(e) => handleRadioButtons(e ,'page6')}
            />
          </div>
         <div className=' w-full flex gap-2 items-center'>

          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page6"
              value="no"
              checked={formData.page6.no}
              onChange={(e) => handleRadioButtons(e ,'page6')}
            />
          </div>
          </div>

            <div className='flex gap-2 items-center'>
              <label  className='text-2xl uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                className=' w-52 h-10 p-2 rounded-lg'
                name="page6-explanation"
                disabled={!formData.page6.yes ? true : false}
                value={formData.page6.explanation}
                onChange={(e) => handleInputChange('page6', 'explanation', e.target.value)}
              />

            </div>
            <ProgressBar progress={progressValue_} />
          <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
          </div>
        </div>
      )}


      {/* Page 7 */}
      {currentPage === 7 && (
       <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
       <h3  className='uppercase text-white flex gap-2'><span className='underline'>Q7:</span><span> Do you have any allergies?</span></h3>
       <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page7"
              value="yes"
              checked={formData.page7.yes}
              onChange={(e) => handleRadioButtons(e ,'page7')}
            />
          </div>
          <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page7"
              value="no"
              checked={formData.page7.no}
              onChange={(e) => handleRadioButtons(e ,'page7')}
              />
              </div>
              </div>
            <div className='flex gap-2 items-center'>
              <label  className='text-2xl uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                className=' w-52 h-10 p-2 rounded-lg'
                name="page7-explanation"
                disabled={!formData.page7.yes ? true : false}
                value={formData.page7.explanation}
                onChange={(e) => handleInputChange('page7', 'explanation', e.target.value)}
              />
            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={nextPage}>Next</button>
          </div>
        </div>

      )}

      {/* Page 8 */}
      {currentPage === 8 && (
        <div className='flex flex-col items-center gap-4 w-full h-full flex-1'>
        <h3  className='uppercase text-white flex gap-2'><span className='underline'>Q8:</span><span>  Do you have a heart condition, epilepsy, or diabetes?</span></h3>
        <div className='flex gap-10'> 
         <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            YES
            </label>
            <input
              type="radio"
              name="page8"
              value="yes"
              checked={formData.page8.yes}
              onChange={(e) => handleRadioButtons(e ,'page8')}
            />
            </div>
            <div className='flex gap-2 items-center'>
          <label  className='text-2xl uppercase text-white'>
            NO
            </label>
            <input
              type="radio"
              name="page8"
              value="no"
              checked={formData.page8.no}
              onChange={(e) => handleRadioButtons(e ,'page8')}
            />
            </div>
            </div>
            <div className='flex gap-2 items-center'>
              <label  className='text-2xl uppercase text-white'>If yes, please explain:</label>
              <input
                type="text"
                name="page8-explanation"
                className=' w-52 h-10 p-2 rounded-lg'
                disabled={!formData.page8.yes ? true : false}
                value={formData.page8.explanation}
                onChange={(e) => handleInputChange('page8', 'explanation', e.target.value)}
              />

            </div>
            <ProgressBar progress={progressValue_} />
            <div className=' w-full flex justify-between'>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2" onClick={prevPage}>Previous</button>
          <button className="yellowButton py-2 px-4 rounded-3xl font-bold  mb-2 mr-2"  onClick={nextPage}>Next</button>
           </div>
        </div>
      )}  
    </MedicalFormLayout>
     
  )
}
export default MedicalForm;
