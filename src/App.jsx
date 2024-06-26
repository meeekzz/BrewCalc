import './styles/App.css';
import CustomerInfo from './components/CustomerInfo';
import AdditionalInfo from './components/AdditionalInfo';
import TankInfo from './components/TankInfo';
import Totals from './components/Totals';
import { useState } from 'react';


function App() {
  //Renders Next/Prev Component
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleReset = () => {
    setCurrentStep(currentStep - 3);
  };

  //CustomerInfo Functionality
  const [name, setName] = useState('');
  const [busName, setBusName] = useState('')
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  //State for Totals Calculations
  const [cellarTotal,   setCellarTotal] = useState(0);
  const [cltBtuHour, setCltBtuHour] = useState(0);
  const [wortTotal,   setWortTotal] = useState(0);
  const [walkInTotal,   setWalkInTotal] = useState(0);
  const [totalCool, setTotalCool] = useState(0);
  const [recommendedChiller, setRecommendedChiller] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const [totalTanks, setTotalTanks] = useState(0);

  //<body onload="survey.reset();">
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5">
      {currentStep === 0 && (
        <CustomerInfo 
          onNext={handleNext} 
          name={name} setName={setName}
          busName={busName} setBusName={setBusName}
          location={location} setLocation={setLocation}
          email={email} setEmail={setEmail}
          phone={phone} setPhone={setPhone}
        />
      )}
      {currentStep === 1 && (
        <TankInfo 
          onNext={handleNext} 
          onPrev={handlePrev}
          totalTanks={totalTanks}
          setTotalTanks={setTotalTanks}
          cellarTotal={cellarTotal}
          setCellarTotal={setCellarTotal}

        />
      )}
      {currentStep === 2 && (
        <AdditionalInfo 
          onNext={handleNext} 
          onPrev={handlePrev}
          name={name} 
          busName={busName}
          location={location} 
          email={email}
          phone={phone}
          cltBtuHour={cltBtuHour}
          setCltBtuHour={setCltBtuHour}
          wortTotal={wortTotal}
          setWortTotal={setWortTotal}
          walkInTotal={walkInTotal}
          setWalkInTotal={setWalkInTotal}
          cellarTotal={cellarTotal}
          setCellarTotal={setCellarTotal}
          totalCool={totalCool}
          setTotalCool={setTotalCool}
          recommendedChiller={recommendedChiller}
          setRecommendedChiller={setRecommendedChiller}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
        />
      )}
      {currentStep === 3 && (
        <Totals 
          onReset={handleReset}
          cellarTotal={cellarTotal}
          cltBtuHour={cltBtuHour}
          wortTotal={wortTotal}
          walkInTotal={walkInTotal}
          totalCool={totalCool}
          linkUrl={linkUrl}
          recommendedChiller={recommendedChiller}
        />
      )}
    </div>
  )}
export default App;
