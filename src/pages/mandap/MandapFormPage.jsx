import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building, ArrowLeft, Save, Plus, X, Upload, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { mandaps } from '../../utils/mock-data';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Basic Info', completed: false },
  { id: 2, name: 'Venue Details', completed: false },
  { id: 3, name: 'Services', completed: false },
  { id: 4, name: 'Facilities', completed: false },
  { id: 5, name: 'Booking & Payments', completed: false },
];

const venueTypes = [
  'Banquet Hall', 'Community Hall', 'Lawn', 'Resort', 'Farmhouse', 
  'Hotel', 'Rooftop', 'Convention Centre'
];

const amenitiesOptions = [
  'WiFi', 'Parking', 'Air Conditioning', 'Catering Service', 'Decoration Service',
  'Sound System', 'Lighting System', 'Projector', 'Stage', 'Dance Floor',
  'Generator', 'Security Service', 'Elevator'
];

const outdoorFacilitiesOptions = [
  'Garden', 'Pool', 'Beach Access', 'Smoking Zones', 'Outdoor Lighting',
  'Parking Area', 'Kids Play Area', 'Outdoor Bar', 'Barbeque Area', 'Terrace'
];

const paymentOptions = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];

export default function MandapFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    ownerName: '',
    mandapName: '',
    availableDates: [],
    venueType: [],
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    penaltyChargesPerHour: '',
    cancellationPolicy: '',
    
    // Venue Details
    venueImages: [],
    guestCapacity: '',
    venuePricing: '',
    securityDeposit: '',
    securityDepositType: '',
    
    // Services
    caterers: [],
    photographers: [],
    
    // Facilities
    amenities: [],
    outdoorFacilities: [],
    rooms: {
      acRooms: '',
      nonAcRooms: '',
      totalRooms: '',
      acRoomPrice: '',
      nonAcRoomPrice: '',
      roomAmenities: [],
    },
    
    // Booking & Payments
    advancePayment: '',
    paymentMethods: [],
    bookingConfirmationTimeline: '',
    guestEntryPolicy: '',
    isExternalCateringAllowed: false,
  });

  useEffect(() => {
    if (isEditing) {
      const mandap = mandaps.find(m => m.id === id);
      if (mandap) {
        setFormData({
          ownerName: 'Raj Patel', // Mock owner name
          mandapName: mandap.mandapName,
          availableDates: mandap.availableDates || [],
          venueType: mandap.venueType || [],
          address: mandap.address || { street: '', city: '', state: '', pincode: '' },
          penaltyChargesPerHour: mandap.penaltyChargesPerHour?.toString() || '',
          cancellationPolicy: mandap.cancellationPolicy || '',
          venueImages: mandap.venueImages || [],
          guestCapacity: mandap.guestCapacity?.toString() || '',
          venuePricing: mandap.venuePricing?.toString() || '',
          securityDeposit: mandap.securityDeposit?.toString() || '',
          securityDepositType: mandap.securityDepositType || '',
          caterers: [],
          photographers: [],
          amenities: mandap.amenities || [],
          outdoorFacilities: mandap.outdoorFacilities || [],
          rooms: {
            acRooms: '',
            nonAcRooms: '',
            totalRooms: '',
            acRoomPrice: '',
            nonAcRoomPrice: '',
            roomAmenities: [],
          },
          advancePayment: '',
          paymentMethods: mandap.paymentOptions || [],
          bookingConfirmationTimeline: '',
          guestEntryPolicy: '',
          isExternalCateringAllowed: mandap.isExternalCateringAllowed || false,
        });
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleImageAdd = (url) => {
    if (url && !formData.venueImages.includes(url)) {
      setFormData(prev => ({
        ...prev,
        venueImages: [...prev.venueImages, url],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      venueImages: prev.venueImages.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(isEditing ? 'Mandap updated successfully!' : 'Mandap registered successfully!');
      navigate('/mandaps');
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep === step.id 
              ? 'bg-orange-500 border-orange-500 text-white' 
              : currentStep > step.id
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 text-gray-500'
          }`}>
            {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Venue Owner/Manager Name"
          value={formData.ownerName}
          onChange={(e) => handleInputChange('ownerName', e.target.value)}
          placeholder="Enter owner/manager name"
          required
          fullWidth
        />
        <Input
          label="Mandap Name"
          value={formData.mandapName}
          onChange={(e) => handleInputChange('mandapName', e.target.value)}
          placeholder="Enter mandap name"
          required
          fullWidth
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Dates <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Select date"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Venue Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {venueTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.venueType.includes(type)}
                onChange={() => handleArrayToggle('venueType', type)}
                className="mr-2"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="State"
          options={[
            { value: '', label: 'Select state' },
            { value: 'Maharashtra', label: 'Maharashtra' },
            { value: 'Delhi', label: 'Delhi' },
            { value: 'Karnataka', label: 'Karnataka' },
          ]}
          value={formData.address.state}
          onChange={(value) => handleInputChange('address.state', value)}
          fullWidth
        />
        <Select
          label="City"
          options={[
            { value: '', label: 'Select city' },
            { value: 'Mumbai', label: 'Mumbai' },
            { value: 'Delhi', label: 'Delhi' },
            { value: 'Bangalore', label: 'Bangalore' },
          ]}
          value={formData.address.city}
          onChange={(value) => handleInputChange('address.city', value)}
          fullWidth
        />
        <Input
          label="Pin Code"
          value={formData.address.pincode}
          onChange={(e) => handleInputChange('address.pincode', e.target.value)}
          placeholder="Enter pin code"
          fullWidth
        />
      </div>

      <Textarea
        label="Full Address"
        value={formData.address.street}
        onChange={(e) => handleInputChange('address.street', e.target.value)}
        placeholder="Enter complete venue address"
        required
        fullWidth
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Penalty Charges per Hour (₹)"
          type="number"
          value={formData.penaltyChargesPerHour}
          onChange={(e) => handleInputChange('penaltyChargesPerHour', e.target.value)}
          placeholder="₹"
          required
          fullWidth
        />
        <Select
          label="Cancellation Policy"
          options={[
            { value: '', label: 'Select cancellation policy' },
            { value: 'No Refund', label: 'No Refund' },
            { value: 'Partial Refund', label: 'Partial Refund' },
            { value: 'Full Refund', label: 'Full Refund' },
          ]}
          value={formData.cancellationPolicy}
          onChange={(value) => handleInputChange('cancellationPolicy', value)}
          required
          fullWidth
        />
      </div>
    </div>
  );

  const renderVenueDetails = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Venue Images
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Upload venue images</p>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>
        {formData.venueImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.venueImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Venue ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Guest Capacity (max)"
          type="number"
          value={formData.guestCapacity}
          onChange={(e) => handleInputChange('guestCapacity', e.target.value)}
          required
          fullWidth
        />
        <Input
          label="Venue Pricing (₹)"
          type="number"
          value={formData.venuePricing}
          onChange={(e) => handleInputChange('venuePricing', e.target.value)}
          placeholder="₹ 0"
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Security Deposit (₹)"
          type="number"
          value={formData.securityDeposit}
          onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
          placeholder="₹ 0"
          required
          fullWidth
        />
        <Select
          label="Security Deposit Type"
          options={[
            { value: '', label: 'Select deposit type' },
            { value: 'Refundable', label: 'Refundable' },
            { value: 'Non-Refundable', label: 'Non-Refundable' },
          ]}
          value={formData.securityDepositType}
          onChange={(value) => handleInputChange('securityDepositType', value)}
          required
          fullWidth
        />
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {/* Catering Services */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Catering Services</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Enable</span>
          </label>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Caterer #1</h4>
            <button className="text-red-500 text-sm">Remove</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Caterer Name"
              placeholder="Please enter caterer name"
              required
              fullWidth
            />
            <Input
              label="Food Type"
              placeholder="Please select food type"
              required
              fullWidth
            />
          </div>
          <div className="mt-4">
            <button className="text-orange-500 text-sm">+ Add Menu Category</button>
          </div>
          <div className="flex items-center space-x-6 mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Customization Allowed</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>External Catering Allowed</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Tasting Session Available</span>
            </label>
          </div>
        </div>
        
        <button className="mt-4 text-orange-500">+ Add Caterer</button>
      </div>

      {/* Photography Services */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Photography Services</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Enable</span>
          </label>
        </div>
        
        <div className="bg-blue-50 p-4 rounded border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Photographer #1</h4>
            <button className="text-red-500 text-sm">Remove</button>
          </div>
          <Input
            label="Photographer Name"
            required
            fullWidth
          />
          <div className="mt-4 border-2 border-dashed border-orange-300 p-4 rounded text-center">
            <button className="text-orange-500">Add Photography Type</button>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sample Work</label>
            <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">Upload</p>
            </div>
          </div>
        </div>
        
        <button className="mt-4 text-orange-500">+ Add Photographer</button>
      </div>
    </div>
  );

  const renderFacilities = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rooms & Accommodation */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Rooms & Accommodation</h3>
          <div className="space-y-4">
            <Input
              label="AC Rooms"
              type="number"
              value={formData.rooms.acRooms}
              onChange={(e) => handleInputChange('rooms.acRooms', e.target.value)}
              required
              fullWidth
            />
            <Input
              label="Non-AC Rooms"
              type="number"
              value={formData.rooms.nonAcRooms}
              onChange={(e) => handleInputChange('rooms.nonAcRooms', e.target.value)}
              required
              fullWidth
            />
            <Input
              label="Total Rooms Available"
              type="number"
              value={formData.rooms.totalRooms}
              onChange={(e) => handleInputChange('rooms.totalRooms', e.target.value)}
              required
              fullWidth
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="AC Room Price (₹)"
                type="number"
                value={formData.rooms.acRoomPrice}
                onChange={(e) => handleInputChange('rooms.acRoomPrice', e.target.value)}
                placeholder="₹ 0"
                required
                fullWidth
              />
              <Input
                label="Non-AC Room Price (₹)"
                type="number"
                value={formData.rooms.nonAcRoomPrice}
                onChange={(e) => handleInputChange('rooms.nonAcRoomPrice', e.target.value)}
                placeholder="₹ 0"
                required
                fullWidth
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Amenities</label>
              <Select
                options={[
                  { value: '', label: 'Select amenities' },
                  { value: 'WiFi', label: 'WiFi' },
                  { value: 'TV', label: 'TV' },
                  { value: 'AC', label: 'Air Conditioning' },
                ]}
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Outdoor Facilities */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Outdoor Facilities</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Outdoor Facilities</label>
              <Select
                options={[
                  { value: '', label: 'Select outdoor facilities' },
                  ...outdoorFacilitiesOptions.map(facility => ({ value: facility, label: facility }))
                ]}
                fullWidth
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alcohol Policy <span className="text-red-500">*</span>
              </label>
              <Select
                options={[
                  { value: '', label: 'Select alcohol policy' },
                  { value: 'Allowed', label: 'Allowed' },
                  { value: 'Not Allowed', label: 'Not Allowed' },
                  { value: 'With Permission', label: 'With Permission' },
                ]}
                fullWidth
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Parking Capacity</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Two Wheeler Capacity"
                  type="number"
                  fullWidth
                />
                <Input
                  label="Four Wheeler Capacity"
                  type="number"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indoor Facilities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Indoor Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power Backup <span className="text-red-500">*</span>
            </label>
            <Select
              options={[
                { value: '', label: 'Select power backup' },
                { value: 'Full Backup', label: 'Full Backup' },
                { value: 'Partial Backup', label: 'Partial Backup' },
                { value: 'No Backup', label: 'No Backup' },
              ]}
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WiFi Availability <span className="text-red-500">*</span>
            </label>
            <Select
              options={[
                { value: '', label: 'Select WiFi availability' },
                { value: 'Free WiFi', label: 'Free WiFi' },
                { value: 'Paid WiFi', label: 'Paid WiFi' },
                { value: 'No WiFi', label: 'No WiFi' },
              ]}
              fullWidth
            />
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Elevator Available</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderBookingPayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Details */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <div className="space-y-4">
            <Input
              label="Advance Payment Required (%)"
              type="number"
              value={formData.advancePayment}
              onChange={(e) => handleInputChange('advancePayment', e.target.value)}
              required
              fullWidth
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Methods Accepted <span className="text-red-500">*</span>
              </label>
              <Select
                options={[
                  { value: '', label: 'Select payment methods' },
                  ...paymentOptions.map(method => ({ value: method, label: method }))
                ]}
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Booking Process */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Booking Process</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Confirmation Timeline <span className="text-red-500">*</span>
              </label>
              <Select
                options={[
                  { value: '', label: 'Select confirmation timeline' },
                  { value: 'Immediate', label: 'Immediate' },
                  { value: '24 Hours', label: '24 Hours' },
                  { value: '48 Hours', label: '48 Hours' },
                  { value: '72 Hours', label: '72 Hours' },
                ]}
                fullWidth
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guest Entry Policy <span className="text-red-500">*</span>
              </label>
              <Select
                options={[
                  { value: '', label: 'Select guest entry policy' },
                  { value: 'Open Entry', label: 'Open Entry' },
                  { value: 'Restricted Entry', label: 'Restricted Entry' },
                  { value: 'ID Required', label: 'ID Required' },
                ]}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderVenueDetails();
      case 3:
        return renderServices();
      case 4:
        return renderFacilities();
      case 5:
        return renderBookingPayments();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate('/mandaps')}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">
          {isEditing ? 'Edit Mandap' : 'Add New Mandap'}
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderStepIndicator()}
          
          <div className="min-h-[500px]">
            {renderCurrentStep()}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Previous
            </Button>
            
            {currentStep === 5 ? (
              <Button
                onClick={handleSubmit}
                loading={loading}
                icon={<Save className="h-4 w-4" />}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Submit Registration
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}