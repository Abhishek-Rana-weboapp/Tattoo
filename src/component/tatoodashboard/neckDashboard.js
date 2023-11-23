import React from 'react'
import { useNavigate } from "react-router-dom";


function NeckDashboard() {
    const navigate = useNavigate();
  
    return (
      <div className='outer container' style={{
        border: '1px solid #d8d6d6'
      
      }}>
      <div className='container h-100' style={{
        backgroundColor: '#f5f5f5',
      
        alignItems: 'center',
        minHeight: '100vh',
        width:'100%',
        border: '3px solid black',
  
  
      }}>
        <h1> Neck</h1>
        <div className='outer-container' style={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            gap:'30px',
            marginTop:'55px'
        }}>
  
        
        <div className='inner-item'>
          <h5>Front</h5>
          
        </div>
        <div className='inner-item'>
  
          <h5>Back</h5>
        
        </div>
        <div className='inner-item'>
            <h5>Left</h5>
        </div>
        <div className='inner-item'>
            <h5>Right</h5>
        </div>       
         <div className='inner-item'>
            <h5>Full</h5>
        </div>
        </div>
      
    

      </div>

      </div>
      
  
  
    );
  }
export default NeckDashboard