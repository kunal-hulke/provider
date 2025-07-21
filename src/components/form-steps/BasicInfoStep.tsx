{/* Previous imports remain the same */}

const BasicInfoStep: React.FC = () => {
  const { getStepData, updateFormData } = useFormData();
  const [form] = Form.useForm();
  const stepData = getStepData('basicInfo');
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>(stepData?.availableDates || []);

  // Add validation for pincode
  const validatePincode = async (_: any, value: string) => {
    if (!value) {
      return Promise.reject('Please enter pincode');
    }

    const selectedState = form.getFieldValue(['location', 'state']);
    const selectedCity = form.getFieldValue(['location', 'city']);

    if (!selectedState || !selectedCity) {
      return Promise.reject('Please select state and city first');
    }

    // Here you would integrate with a pincode validation service
    // For now, we'll do basic validation
    if (!/^[0-9]{6}$/.test(value)) {
      return Promise.reject('Invalid pincode format');
    }

    return Promise.resolve();
  };

  // Modify form submission to prevent unnecessary validations
  const onValuesChange = (changedValues: any, allValues: any) => {
    const touchedField = Object.keys(changedValues)[0];
    if (touchedField) {
      form.validateFields([touchedField])
        .then(() => {
          updateFormData({ basicInfo: allValues });
        })
        .catch(() => {
          // Validation failed for this field, don't update form data
        });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ ...stepData, availableDates: dates }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      className="animate-fadeIn"
    >
      {/* Rest of the form fields remain the same but add validatePincode to pincode field */}
      <Form.Item
        name={['location', 'pinCode']}
        rules={[{ validator: validatePincode }]}
        validateTrigger={['onBlur']}
      >
        <Input placeholder="Pin Code" maxLength={6} />
      </Form.Item>
      
      {/* Other form fields remain unchanged */}
    </Form>
  );
};