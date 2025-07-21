import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash, Users, DollarSign, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Mandap } from '../../types';
import { reviews } from '../../utils/mock-data';

interface MandapCardProps {
  mandap: Mandap;
  onDelete: (id: string) => void;
}

const MandapCard: React.FC<MandapCardProps> = ({ mandap, onDelete }) => {
  const mandapReviews = reviews.filter(r => r.mandapId === mandap.id);
  const averageRating = mandapReviews.length > 0
    ? mandapReviews.reduce((acc, curr) => acc + curr.rating, 0) / mandapReviews.length
    : 0;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={mandap.images[0]}
          alt={mandap.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{mandap.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{mandap.address}, {mandap.city}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm ml-1">Capacity: {mandap.capacity}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm ml-1">₹{mandap.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Star className={`h-4 w-4 ${averageRating > 0 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          <span className="ml-1 text-sm font-medium">
            {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}
          </span>
          <Link to={`/mandaps/${mandap.id}/reviews`} className="ml-2 text-sm text-primary-600 hover:text-primary-700">
            ({mandapReviews.length} reviews)
          </Link>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {mandap.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-800"
            >
              {amenity}
            </span>
          ))}
          {mandap.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
              +{mandap.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link to={`/mandaps/edit/${mandap.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              icon={<Edit className="h-4 w-4" />}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(mandap.id)}
            icon={<Trash className="h-4 w-4" />}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MandapCard;