import React from "react";
// import Lottie from 'lottie-react'; // Uncomment when Lottie animation is available
// import welcomeAnimation from './welcome.json'; // Placeholder

const WelcomeStep = () => (
  <>
    <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
    <h1 style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 700, fontSize: 32, marginBottom: 12 }}>
      Welcome to Mapsy!
    </h1>
    <p style={{ fontSize: 18, marginBottom: 24 }}>
      Discover spontaneous adventures tailored just for you.<br />
      <span style={{ color: '#A259FF', fontWeight: 500 }}>Let’s get to know you!</span>
    </p>
    {/* <Lottie animationData={welcomeAnimation} style={{ width: 180, margin: '0 auto 24px' }} /> */}
  </>
);

export default WelcomeStep; 