import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';
import './Form.css'; 
import SuccessPage from './SuccessPage';

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [codingExperience, setCodingExperience] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [certifyingStatement, setCertifyingStatement] = useState('');
  const options = countryList().getData();
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < 8) {
      setStep(step + 1);
    } else {
      console.log(`Submission: ${firstName} ${lastName}, ${email}, ${country}, ${phone}, ${selectedLanguages}, ${codingExperience}, ${currentSalary}, ${certifyingStatement}`);
      setIsSubmitted(true); 
    }
  };

  const languageOptions = [
    'Solidity', 'Rust', 'Node.js', 'Typescript', 'Javascript', 
    'C', 'C++', 'C#', 'SQL', 'Python', 'Assembly Language', 
    'Haskell', 'R', '.NET', 'Other'
  ];

  const handleArrowClick = (direction) => {
    if (direction === 'up' && step > 1) {
      setStep(step - 1);
    } else if (direction === 'down' && step < 9) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        handleArrowClick('up');
      } else if (event.key === 'ArrowDown') {
        handleArrowClick('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]);

  const toggleLanguage = (language) => {
    setSelectedLanguages(prevLanguages => {
      if (prevLanguages.includes(language)) {
        return prevLanguages.filter(lang => lang !== language);
      } else {
        return [...prevLanguages, language];
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-base text-purple-400">First name</div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 px-3 py-2 w-full bg-purple-25 text-purple-400 border-b-2 border-purple-200 focus:outline-none"
              placeholder="First name"
              required
            />
            <div className="mt-5 text-base text-purple-400">Last name</div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 px-3 py-2 w-full bg-purple-25 text-purple-400 border-b-2 border-purple-200 focus:outline-none"
              placeholder="Last name"
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="text-base text-purple-400">This is how we'll contact you.</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-3 py-2 w-full bg-purple-25 text-purple-400 border-b-2 border-purple-200 focus:outline-none"
              placeholder="name@example.com"
              required
            />
          </>
        );
        case 3:
          return (
            <>
              <Select
                options={options}
                value={options.find(c => c.value === country)}
                onChange={(selectedOption) => setCountry(selectedOption.value)}
                className={`mt-2 ${country ? 'selected-blink' : ''}`} 
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: '#E6E6FA',
                    borderColor: state.isSelected ? '#805AD5' : '#E5E7EB', 
                    '&:hover': {
                      borderColor: state.isSelected ? '#805AD5' : '#D1D5DB', 
                    }
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#E6E6FA' : 'white', 
                    color: state.isSelected ? 'white' : '#111827', 
                  })
                }}
              />
            </>
          );
        case 4:
            return (
              <>
                <PhoneInput
                  country={'us'}
                  value={phone}
                  onChange={phone => setPhone(phone)}
                  inputProps={{
                    className: 'mt-2 w-full px-8 py-2 bg-purple-25 text-purple-400 border-b-2 border-purple-200 focus:outline-none'
                  }}
                  dropdownClass="mt-1 rounded-md bg-pink-100 border border-pink-200 shadow-lg"
                  containerClass="relative"
                  buttonClass="absolute left-0 top-0 mt- mr-2 bg-purple-500 text-white px-4 py-2 rounded-md focus:outline-none cursor-pointer"
                  selectClass="block appearance-none w-full bg-purple-50 border border-purple-70 text-purple-400 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-purple focus:border-purple-400 hover:border-purple-100 hover:bg-purple"
                  dropdownStyle={{
                    borderRadius: '0.25rem',
                    borderColor: '#CF9FFF',
                    backgroundColor: '#E6E6FA',
                    color: '#d53f8c',
                    marginTop: '2px',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                    zIndex: 10,
                    overflow: 'auto',
                  
                  }}
                  />
              </>
            );
      case 5:
        return (
          <>
            <div className="text-base text-neutral-400">
              Select all the languages you know.
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {languageOptions.map((language, index) => (
                <label
                  key={index}
                  className={`block relative text-purple-400 bg-purple-50 border border-purple-400 p-2 rounded-md cursor-pointer ${selectedLanguages.includes(language) ? 'bg-pink-200 blink-animation' : ''}`}
                  onClick={() => {
                    toggleLanguage(language);
                  }}
                >
                  <span
                    className={`absolute top-3 left-2 w-5 h-5 flex items-center justify-center text-white border border-purple-400 rounded-md ${selectedLanguages.includes(language) ? 'bg-purple-500 blink-animation' : 'bg-purple-200'}`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pl-6">{language}</span>
                  {selectedLanguages.includes(language) && (
                    <FontAwesomeIcon icon={faCheck} className="text-purple-500 ml-1" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  )}
                </label>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
         
            <div className="mt-2 flex flex-col gap-2">
              {[
                "No experience (I have never programmed before.)",
                "Beginner (I have played with some introductory coding lessons and tutorials.)",
                "Intermediate (I have completed some coding classes or tutorials.)",
                "Advanced (I can build applications.)",
                "Professional (I am an experienced software engineer.)"
              ].map((option, index) => (
                <label
                  key={index}
                  className={`block relative text-purple-400 bg-purple-50 border border-purple-400 p-2 rounded-md cursor-pointer ${codingExperience === option ? 'bg-pink-200 blink-animation' : ''}`}
                  onClick={() => setCodingExperience(option)}
                >
                  <span
                    className={`absolute top-3 left-2 w-5 h-5 flex items-center justify-center text-white border border-purple-400 rounded-md ${codingExperience === option ? 'bg-purple-500 blink-animation' : 'bg-purple-200'}`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pl-8">{option}</span>
                  {codingExperience === option && (
                    <FontAwesomeIcon icon={faCheck} className="text-purple-500 ml-1" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  )}
                </label>
              ))}
            </div>
          </>
        );
        case 7:
            return (
              <div className="flex flex-row h-full">
                <div className="w-1/2 pr-4 flex flex-col">
                
                  <div className="text-sm text-gray-600 mb-4">
                    Disclaimer: The information provided regarding salary will be kept confidential and will not be used as a determining factor for acceptance into the bootcamp. It will be used exclusively for career advancement guidance.
                  </div>
                  <div className="flex-grow overflow-y-auto pr-2" style={{ maxHeight: "calc(100vh - 200px)" }}>
                    <div className="flex flex-col gap-2">
                      {[
                        '<$30,000',
                        '$30,000 - $50,000',
                        '$50,000 - $80,000',
                        '$80,000 - $120,000',
                        '$120,000 - $250,000',
                        '$250,000 or more'
                      ].map((option, index) => (
                        <label
                          key={index}
                          className={`block relative text-purple-400 bg-purple-50 border border-purple-200 p-2 rounded-md cursor-pointer ${
                            currentSalary === option ? 'bg-pink-200 blink-animation' : ''
                          }`}
                          onClick={() => setCurrentSalary(option)}
                        >
                          <span
                            className={`absolute top-3 left-2 w-5 h-5 flex items-center justify-center text-white border border-purple-400 rounded-md ${
                              currentSalary === option ? 'bg-purple-500 blink-animation' : 'bg-purple-200'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="pl-8">{option}</span>
                          {currentSalary === option && (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-purple-500 ml-1"
                              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                 
                </div>
                <div className="w-1/2 pl-4 flex flex-col justify-center items-center">
                  <div className="text-5xl font-bold text-blue-900">+$26,500</div>
                  <div className="text-2xl text-green-500 mt-2">Average salary increase</div>
                  <div className="text-sm text-gray-600 mt-2 text-center">
                    Metana students who provided pre- and post-course salaries.
                  </div>
                </div>
              </div>
            );
          
      case 8:
        return (
          <>
            <div className="text-base text-gray-600 mb-6">
              I hereby acknowledge that this application form was completed by me
              (the individual seeking to enroll in Metana) and I did not receive help
              from any external sources. The responses submitted are entirely my own
              and based on my own reasoning. Also, I opt in to receive communication
              messages from Metana about my application.
            </div>
            <div className="flex flex-col gap-2">
              {['I accept', "I don't accept"].map((option, index) => (
                <label
                  key={index}
                  className={`block relative text-purple-400 bg-purple-50 border border-purple-400 p-2 rounded-md cursor-pointer ${
                    certifyingStatement === option ? 'bg-pink-200 blink-animation' : ''
                  }`}
                  onClick={() => setCertifyingStatement(option)}
                >
                  <span
                    className={`absolute top-3 left-2 w-5 h-5 flex items-center justify-center text-white border border-purple-400 rounded-md ${
                      certifyingStatement === option ? 'bg-purple-500 blink-animation' : 'bg-purple-200'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pl-8">{option}</span>
                  {certifyingStatement === option && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-purple-500 ml-1"
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  )}
                </label>
              ))}
            </div>
          </>
        );

        case 9:
          return (
            <>
              <div className="mb-4 text-base text-purple-400">LinkedIn URL (optional)</div>
              <div className="mb-2 text-sm text-gray-600">
                Here's a sniper link to make your life easy - <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">linkedin.com</a> (It'll open in a new tab) 🚀
              </div>
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="w-full px-3 py-2 text-purple-400 bg-purple-50 border-b-2 border-purple-200 focus:outline-none"
                placeholder="Type your answer here..."
              />
              <div className="flex gap-2 mt-14 w-32 max-w-full max-md:mt-10">
                <button
                  type="submit"
                  className="flex-1 justify-center px-1.5 py-1 text-base text-violet-50 whitespace-nowrap bg-violet-300 rounded border border-purple-300"
                >
                  Submit
                </button>
                <div className="my-auto text-xs text-neutral-400">press Ctrl + Enter ↵</div>
              </div>
            </>
          );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          {isSubmitted ? (
            <SuccessPage /> 
          ) : (
           
            <>
              <div className="mb-6 text-2xl text-black-800">
                <span className="text-purple-400 mr-2">{step} →</span>
                {step === 1 ? "Before we start, what is your name?" :
                step === 2 ? "What's your email address?" :
                step === 3 ? "Which country are you from? 🏠 🏠 🏠" :
                step === 4 ? "What is your phone number?" :
                step === 5 ? "What languages and frameworks are you familiar with?" :
                step === 6 ? "How would you describe your current level of coding experience?" :
                step === 7 ? "What is your current annual compensation? (Optional)" :
                step === 8 ? "Certifying Statement*" :
                "LinkedIn URL (optional)"
                }
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                {renderStep()}
                {step < 9 && (
                  <div className="flex gap-2 mt-14 w-32 max-w-full max-md:mt-10">
                    <button
                      type="submit"
                      className="flex-1 justify-center px-1.5 py-1 text-base text-violet-50 whitespace-nowrap bg-violet-300 rounded border border-purple-300"
                    >
                      OK
                    </button>
                    <div className="my-auto text-xs text-neutral-400">press Enter</div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      <Footer handleArrowClick={handleArrowClick} />
    </div>
  );
}

export default Form;