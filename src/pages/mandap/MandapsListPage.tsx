import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import MandapCard from '../../components/mandap/MandapCard';
import { mandaps as initialMandaps } from '../../utils/mock-data';

const MandapsListPage: React.FC = () => {
  const [mandaps, setMandaps] = useState(initialMandaps);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this mandap?')) {
      setMandaps(mandaps.filter(mandap => mandap.id !== id));
    }
  };
  
  const filteredMandaps = mandaps.filter(mandap => {
    const matchesSearch = mandap.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mandap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mandap.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'high-capacity' && mandap.capacity >= 400) return matchesSearch;
    if (filter === 'medium-capacity' && mandap.capacity < 400 && mandap.capacity >= 200) return matchesSearch;
    if (filter === 'low-capacity' && mandap.capacity < 200) return matchesSearch;
    
    return false;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Your Mandaps</h1>
        <Link to="/mandaps/new">
          <Button icon={<Plus className="h-4 w-4" />}>
            Add New Mandap
          </Button>
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search by name, description or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Mandaps' },
                { value: 'high-capacity', label: 'High Capacity (400+)' },
                { value: 'medium-capacity', label: 'Medium Capacity (200-399)' },
                { value: 'low-capacity', label: 'Low Capacity (<200)' },
              ]}
              value={filter}
              onChange={setFilter}
              fullWidth
              icon={<Filter className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
      
      {filteredMandaps.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No mandaps found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term' : 'Start by adding your first mandap'}
          </p>
          <div className="mt-6">
            <Link to="/mandaps/new">
              <Button icon={<Plus className="h-4 w-4" />}>
                Add New Mandap
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMandaps.map((mandap) => (
            <MandapCard key={mandap.id} mandap={mandap} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MandapsListPage;