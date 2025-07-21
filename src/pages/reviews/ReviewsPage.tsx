import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Image as ImageIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { reviews, mandaps } from '../../utils/mock-data';
import { format } from 'date-fns';

const ReviewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mandap = mandaps.find(m => m.id === id);
  const mandapReviews = reviews.filter(r => r.mandapId === id);
  
  const averageRating = mandapReviews.length > 0
    ? mandapReviews.reduce((acc, curr) => acc + curr.rating, 0) / mandapReviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reviews for {mandap?.name}</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500">({mandapReviews.length} reviews)</span>
        </div>
      </div>

      {mandapReviews.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No reviews yet for this mandap.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mandapReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), 'dd MMM yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="mt-4 text-gray-700">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      <span>Photos from the review</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Review photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;