{/* Previous imports remain the same */}

const FacilitiesStep: React.FC = () => {
  const { getStepData, updateFormData } = useFormData();
  const [form] = Form.useForm();
  const stepData = getStepData('facilities');

  // Add validation for room counts
  const validateRoomCounts = async (_: any, value: any) => {
    const acRooms = form.getFieldValue(['rooms', 'acRooms']) || 0;
    const nonAcRooms = form.getFieldValue(['rooms', 'nonAcRooms']) || 0;
    const total = acRooms + nonAcRooms;

    if (value !== total) {
      return Promise.reject('AC and Non-AC rooms should add up to total rooms');
    }

    return Promise.resolve();
  };

  // Modify form submission to prevent unnecessary validations
  const onValuesChange = (changedValues: any, allValues: any) => {
    const touchedField = Object.keys(changedValues)[0];
    if (touchedField) {
      form.validateFields([touchedField])
        .then(() => {
          updateFormData({ facilities: allValues });
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
      initialValues={stepData}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      className="animate-fadeIn"
    >
      {/* Add validation to total rooms field */}
      <Form.Item
        name={['rooms', 'totalRooms']}
        rules={[{ validator: validateRoomCounts }]}
        validateTrigger={['onChange']}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      
      {/* Other form fields remain unchanged */}
    </Form>
  );
};