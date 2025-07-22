import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import MandapCard from '../../components/mandap/MandapCard';
import MandapFormModal from '../../components/mandap/MandapFormModal';

const MandapsListPage = () => {
  const [mandaps, setMandaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingMandap, setEditingMandap] = useState(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockMandaps = [
      {
        id: 1,
        mandapName: 'Royal Wedding Hall',
        description: 'Elegant venue for grand celebrations',
        address: { city: 'Mumbai' },
        guestCapacity: 500,
        price: 50000,
        images: ['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg']
      },
      {
        id: 2,
        mandapName: 'Garden Paradise',
        description: 'Beautiful outdoor wedding venue',
        address: { city: 'Delhi' },
        guestCapacity: 300,
        price: 35000,
        images: ['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg']
      },
      {
        id: 3,
        mandapName: 'Heritage Palace',
        description: 'Traditional venue with modern amenities',
        address: { city: 'Jaipur' },
        guestCapacity: 150,
        price: 25000,
        images: ['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg']
      }
    ];
    setMandaps(mockMandaps);
  }, []);

  const handleDelete = (mandapId) => {
    setMandaps(prevMandaps => prevMandaps.filter(mandap => mandap.id !== mandapId));
  };

  const handleEdit = (mandap) => {
    setEditingMandap(mandap);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingMandap(null);
    setShowModal(true);
  };

  const handleSave = (formData) => {
    if (editingMandap) {
      // Update existing mandap
      setMandaps(prevMandaps => 
        prevMandaps.map(mandap => 
          mandap.id === editingMandap.id ? { ...mandap, ...formData } : mandap
        )
      );
    } else {
      // Add new mandap
      const newMandap = {
        id: Date.now(),
        ...formData
      };
      setMandaps(prevMandaps => [...prevMandaps, newMandap]);
    }
    setShowModal(false);
    setEditingMandap(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingMandap(null);
  };
  const filteredMandaps = mandaps.filter(mandap => {
    const matchesSearch = mandap.mandapName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mandap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mandap.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'high-capacity' && mandap.guestCapacity >= 400) return matchesSearch;
    if (filter === 'medium-capacity' && mandap.guestCapacity < 400 && mandap.guestCapacity >= 200) return matchesSearch;
    if (filter === 'low-capacity' && mandap.guestCapacity < 200) return matchesSearch;
    
    return false;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Mandaps</h1>
          <Button
            onClick={handleAddNew}
            icon={<Plus className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Add New Mandap
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Venues</option>
            <option value="high-capacity">High Capacity (400+)</option>
            <option value="medium-capacity">Medium Capacity (200-399)</option>
            <option value="low-capacity">Low Capacity (&lt;200)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandaps.map(mandap => (
          <MandapCard key={mandap.id} mandap={mandap} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>

      {filteredMandaps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
        </div>
      )}

      {showModal && (
        <MandapFormModal
          mandap={editingMandap}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default MandapsListPage;