import React from 'react'
import Lottie from 'lottie-react'
import successAnimation from '../../assets/animations/success.json'

const SuccessPage = () => {
  return (
    <div>
      <h3 className="text-center" >Thank you for submitting your evaluation</h3>
      <div className='flex justify-center'>
        <Lottie 
          animationData={successAnimation}
          autoplay
          loop={false}
          style={{ width: 200, height: 200 }}
        /> 
      </div>
    </div>
  )
}

export default SuccessPage