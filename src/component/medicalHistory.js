import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { json, useNavigate } from 'react-router-dom';
function MedicalForm() {

  const navigate = useNavigate();
  const { user, selectedPattern } = useContext(UserContext)
  const { formData, setFormData } = useContext(UserContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup_, setShowPopup_] = useState(false);

  const [showEmergencyContactPopup, setShowEmergencyContactPopup] = useState(false);


  const options = ['yes', 'No',];
  const [updateEmergencyContact, setUpdateEmergencyContact] = useState(false);
  const [data, setdata] = useState()
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);

  const fetchData = async () => {
    const username = sessionStorage.getItem('username');
    try {
      const response = await fetch(`http://localhost:3000/artist/username_appointment_list?username=${username}`);
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
    console.log("value===",value)
    //console.log("medical data===",data.tattooedBefore)
    

    if (value === 'No') {
      setFormData({
        'page1':data.tattooedBefore,
        'page2': data.pregnantOrNursing,
        'page3': data.hemophiliac,
        'page4': data.medicalCondition,
        'page5': data.communicableDiseases,
        'page6': data.alcohol,
        'page7': data.allergies,
        'page8': data.heartCondition

      })
      console.log("update data====",formData)
      navigate('/emergency-contact')

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
  const nextPage = () => {
    const currentPageData = formData[`page${currentPage}`];

    if (currentPageData.yes || currentPageData.no) {
      setCurrentPage(currentPage + 1);
    } else {
      // Show an alert message if the user doesn't select a choice
      alert('Please choose an option before moving to the next question.');
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='outer container' style={{
      border: '1px solid #d8d6d6'

    }}>
      {showEmergencyContactPopup && (
        <div className="popup" style={{

          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backdropFilter: "blur(6px)",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"

        }

        }>
          <h2>Do You Need to Update Your Emergency Contact?</h2>
          <button onClick={() => navigate('/emergency-contact')}>Yes</button>
          <button onClick={() => navigate('/doctor-info')}>No</button>
        </div>
      )}
      {showPopup && (
        <div className="popup" style={{

          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backdropFilter: "blur(6px)",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"

        }

        }>
          <div style={{
            backgroundColor: "white",
            width: "50%",
            minHeight: "200px",
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
            padding: "20px 40px",
            borderRadius: "12px"
          }}>
            <h2>Your Popup Content</h2>
            <p>You selected {user.selectedTattooType} {selectedPattern}{user.piercingLocation} {user.selectedPattern} at {user.tattooLocation} {user.bodyPart} side.</p>
            <button onClick={() => setShowPopup(false)}>Close Popup</button>
          </div>
        </div>
      )}
      {showPopup_ && (
        <div className='popup' style={{
          position: 'fixed',
          top: '50%',
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
          <div style={{
            backgroundColor: 'white',
            width: '50%',
            minHeight: '200px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
            padding: '20px 40px',
            borderRadius: '12px',
          }}>
            <h2>Your Popup Content</h2>
            <p>Do you want to update your medical history?</p>

            {/* Dropdown menu */}
            <label>Select an option:</label>
            <select
              
              onChange={(e) => handleUpdatedata(e.target.value)}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={() => { setShowPopup_(false);  }}>Close Popup</button>
          </div>
        </div>
      )}

      <h1>Tattoo Consent Form- Page {currentPage}</h1>

      {currentPage === 1 && (
        <div >
          <h3>Page 1: Have you ever been tattooed before?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page1"
              value="yes"
              checked={formData.page1.yes}
              onChange={() => handleInputChange('page1', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page1"
              value="no"
              checked={formData.page1.no}
              onChange={() => handleInputChange('page1', 'no', true)}
            />
          </label>
          <button onClick={nextPage}>Next</button>
        </div>
      )}


      {/* Page 2 */}

      {currentPage === 2 && (
        <div>
          <h3>Page 2: Are you Pregnant or Nursing?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page2"
              value="yes"
              checked={formData.page2.yes}
              onChange={() => handleInputChange('page2', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page2"
              value="no"
              checked={formData.page2.no}
              onChange={() => handleInputChange('page2', 'no', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            Pregnant
            <input
              type="checkbox"
              name="page2-pregnant"
              checked={formData.page2.pregnant}
              onChange={() => handleInputChange('page2', 'pregnant', !formData.page2.pregnant)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            Nursing
            <input
              type="checkbox"
              name="page2-nursing"
              checked={formData.page2.nursing}
              onChange={() => handleInputChange('page2', 'nursing', !formData.page2.nursing)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>

      )}

      {/* Page 3 */}

      {currentPage === 3 && (
        <>
          <h3>Page 3: Are you a hemophiliac or on any medications that may cause bleeding or hinder blood clotting?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page3"
              value="yes"
              checked={formData.page3.yes}
              onChange={() => handleInputChange('page3', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page3"
              value="no"
              checked={formData.page3.no}
              onChange={() => handleInputChange('page3', 'no', true)}
            />

          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
          {formData.page3.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page3-explanation"
                value={formData.page3.explanation}
                onChange={(e) => handleInputChange('page3', 'explanation', e.target.value)}
              />

            </div>

          )}
        </>
      )}

      {/* Page 4 */}
      {currentPage === 4 && (
        <div>
          <h3>Page 4: Do you have any medical or skin conditions?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page4"
              value="yes"
              checked={formData.page4.yes}
              onChange={() => handleInputChange('page4', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page4"
              value="no"
              checked={formData.page4.no}
              onChange={() => handleInputChange('page4', 'no', true)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
          {formData.page4.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page4-explanation"
                value={formData.page4.explanation}
                onChange={(e) => handleInputChange('page4', 'explanation', e.target.value)}
              />

            </div>
          )}
        </div>
      )}


      {/* Page 5 */}
      {currentPage === 5 && (
        <div>
          <h3>Page 5: Do you have any communicable diseases?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page5"
              value="yes"
              checked={formData.page5.yes}
              onChange={() => handleInputChange('page5', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page5"
              value="no"
              checked={formData.page5.no}
              onChange={() => handleInputChange('page5', 'no', true)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
          {formData.page5.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page5-explanation"
                value={formData.page5.explanation}
                onChange={(e) => handleInputChange('page5', 'explanation', e.target.value)}
              />

            </div>
          )}
        </div>
      )}


      {/* Page 6 */}
      {currentPage === 6 && (
        <div>
          <h3>Page 6: Are you under the influence of alcohol or drugs, prescribed or otherwise?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page6"
              value="yes"
              checked={formData.page6.yes}
              onChange={() => handleInputChange('page6', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page6"
              value="no"
              checked={formData.page6.no}
              onChange={() => handleInputChange('page6', 'no', true)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
          {formData.page6.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page6-explanation"
                value={formData.page6.explanation}
                onChange={(e) => handleInputChange('page6', 'explanation', e.target.value)}
              />

            </div>
          )}
        </div>
      )}


      {/* Page 7 */}
      {currentPage === 7 && (
        <div>
          <h3>Page 7: Do you have any allergies?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page7"
              value="yes"
              checked={formData.page7.yes}
              onChange={() => handleInputChange('page7', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page7"
              value="no"
              checked={formData.page7.no}
              onChange={() => handleInputChange('page7', 'no', true)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
          {formData.page7.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page7-explanation"
                value={formData.page7.explanation}
                onChange={(e) => handleInputChange('page7', 'explanation', e.target.value)}
              />

            </div>
          )}
        </div>

      )}

      {/* Page 8 */}
      {currentPage === 8 && (
        <div>
          <h3>Page 8: Do you have a heart condition, epilepsy, or diabetes?</h3>
          <label style={{ marginRight: '10px' }}>
            YES
            <input
              type="radio"
              name="page8"
              value="yes"
              checked={formData.page8.yes}
              onChange={() => handleInputChange('page8', 'yes', true)}
            />
          </label>
          <label style={{ marginRight: '10px' }}>
            NO
            <input
              type="radio"
              name="page8"
              value="no"
              checked={formData.page8.no}
              onChange={() => handleInputChange('page8', 'no', true)}
            />
          </label>
          <button onClick={prevPage}>Previous</button>
          <button onClick={() => setShowEmergencyContactPopup(true)}>Next</button>

          {formData.page8.yes && (
            <div>
              <label style={{ marginRight: '10px' }}>If yes, please explain:</label>
              <input
                type="text"
                name="page8-explanation"
                value={formData.page8.explanation}
                onChange={(e) => handleInputChange('page8', 'explanation', e.target.value)}
              />

            </div>
          )}
        </div>
      )}

    </div>
  )
}
export default MedicalForm;
