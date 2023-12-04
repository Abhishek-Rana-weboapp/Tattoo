import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';
import ProgressBar from './ProgressBar';

function ToothGem() {
    const progressValue = 30;
    const navigate = useNavigate()
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { user, setUser } = useContext(UserContext);

    function handleImage(e) {
        const selectedImages = Array.from(e.target.files);
        setUser((prevUser) => ({
            ...prevUser,
            images: selectedImages,
          }));
        }

    function handleAuthorization(e) {
        setIsAuthorized(e.target.checked);
    }

    return (
        <div className='outer container' style={{
            border: '1px solid #d8d6d6'
        }}>
            <div className='container h-100' style={{
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                border: '3px solid black',
            }}>
                <h1>Tooth Gems</h1>
                <div className='outer-container' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                    marginTop: '55px'
                }}>
                    <input type='file' name='file' onChange={handleImage} multiple></input>
                    <button onClick={()=>navigate('/medical-form')}>Submit</button>
                    <div>
                        {user.images.map((image, index) => (
                            <div key={index}>
                                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} width={'100%'} />
                            </div>
                        ))}
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleAuthorization}
                        /> I authorize the technician to apply a tooth gem with dental adhesive to the selected teeth
                    </label>
                    {isAuthorized && (
                        <div>
                            <p>Authorization granted for tooth gem application.</p>
                        </div>
                    )}
                </div>
                <ProgressBar progress={progressValue} />
            </div>
        </div>
    );
}

export default ToothGem;
