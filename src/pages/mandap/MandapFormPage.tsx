import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building, ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { mandaps } from '../../utils/mock-data';
import { Mandap } from '../../types';

const emptyMandap: Mandap = {
  id: '',
  name: '',
  description: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  capacity: 0,
  price: 0,
  images: [],
  amenities: [],
  providerId: '1',
  createdAt: '',
  updatedAt: '',
};

const MandapFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<Mandap>(emptyMandap);
  const [amenity, setAmenity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isEditing) {
      const mandap = mandaps.find(m => m.id === id);
      if (mandap) {
        setFormData(mandap);
      } else {
        navigate('/mandaps');
      }
    }
  }, [id, isEditing, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['capacity', 'price'].includes(name) ? Number(value) : value,
    }));
  };
  
  const handleAddAmenity = () => {
    if (amenity.trim() && !formData.amenities.includes(amenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()],
      }));
      setAmenity('');
    }
  };
  
  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };
  
  const handleAddImage = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }));
      setImageUrl('');
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
      navigate('/mandaps');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            {isEditing ? 'Edit Mandap Details' : 'Mandap Details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter mandap name"
              />
              
              <Input
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity || ''}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter capacity"
                min="1"
              />
              
              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="Enter mandap description"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder="Enter street address"
                />
              </div>
              
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter city"
              />
              
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter state"
              />
              
              <Input
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter pincode"
              />
              
              <Input
                label="Price (per day)"
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Enter price"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amenities
              </label>
              <div className="flex items-center mb-2">
                <Input
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  placeholder="Add amenity (e.g., Parking, AC, etc.)"
                  className="mr-2"
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={handleAddAmenity}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="flex items-center mb-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="mr-2"
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={handleAddImage}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden h-40">
                    <img
                      src={url}
                      alt={`Mandap ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-700 hover:text-error-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/mandaps')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                icon={<Save className="h-4 w-4" />}
              >
                {isEditing ? 'Update Mandap' : 'Create Mandap'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MandapFormPage;