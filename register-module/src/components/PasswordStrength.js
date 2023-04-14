import React from 'react';
const PasswordStrengthMeter = ({ password }) => {
  let num=0;
  function checkPasswordStrength(password){
    let strength = 0;
    
    if (password.length >= 8) {
      strength++;
    } 
    if (/[a-z]/.test(password)) {
      strength++;
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    }
    if (/\d/.test(password)) {
      strength++;
    }
    if (/[\W_]/.test(password)) {
      strength++;
    }

    
    if (strength <= 2) {
      num=25;
      return 'Weak';
    } else if (strength === 3) {
      num=50;
      return 'Decent';
    } else if (strength === 4) {
      num=75;
      return 'Good';
    } else {
      num=100;
      return 'Strong';
    }
    
  }
 
  const funcProgressColor = () => {
    switch(num/25) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }
  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '4px'
  })
  let passwordStrength = checkPasswordStrength(password);
  return (
    <div  style={{ marginBottom: -8}}> 
      <div className="progress mt-1 mb-1" style={{ height: '4px'}}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor(), margin: 0}}>{passwordStrength}</p>
    </div>
  )
}

export default PasswordStrengthMeter