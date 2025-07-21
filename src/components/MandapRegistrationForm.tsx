const MandapRegistrationForm: React.FC = () => {
  // Previous code remains the same

  return (
    <FormDataProvider>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <Steps current={currentStep} className="site-navigation-steps">
            {steps.map((item, index) => (
              <Step 
                key={item.title} 
                title={item.title}
                className={`step-item ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
          {/* Add connecting lines */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
        </div>

        {/* Rest of the component remains the same */}
      </div>
    </FormDataProvider>
  );
};