import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let interval;
    if (timer > 0 && isVerifying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerifying(false);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [timer, isVerifying]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (otpValue) => {
    setIsVerifying(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp: otpValue });
      console.log(response.data);
      // Handle successful verification
    } catch (err) {
      setError('Invalid OTP');
      setOtp(['', '', '', '']);
      inputRefs[0].current.focus();
      document.querySelector('.otp-container').classList.add('shake');
      setTimeout(() => {
        document.querySelector('.otp-container').classList.remove('shake');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verification Code</h2>
        <p className="mb-4 text-center">Please enter the verification code sent to your mobile</p>
        <div className="otp-container flex justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              className="w-12 h-12 text-2xl text-center border border-gray-300 rounded mx-1 focus:outline-none focus:border-blue-500"
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ${
            otp.some(digit => digit === '') || isVerifying ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => handleSubmit(otp.join(''))}
          disabled={otp.some(digit => digit === '') || isVerifying}
        >
          {isVerifying ? `Verifying (${timer}s)` : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default OtpInput;