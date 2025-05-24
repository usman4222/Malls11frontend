import { Card, CardContent } from "../..//SiteComponents/ui/card"
import { Link } from 'react-router-dom'
import { Star} from "lucide-react"

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600">({rating} Reviews)</span>
    </div>
  );
};

// you can customized this according to your need! there is no need of replication
const ShowcaseCard = ({ title, time, price, completedBy, rating, headerImg, avatar, children }) => {
 
  return (
    <Card className="relative shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
      
      {headerImg && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img src={headerImg} alt={title} className="object-cover w-full h-full" loading="lazy" />
        </div>
      )}
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <Link to="">
            <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </Link>
          {price && <p><span className="text-muted-foreground">Starting at: </span>{price}</p>}
        </div>

        {(completedBy || price) && (
          <div className="flex justify-between items-center text-sm text-gray-500">
            {avatar ? (
              <img src={avatar} alt="User Avatar" className="h-8 w-8 rounded-full object-cover"  />
            ) : (
              completedBy && <span>👤 {completedBy}</span>
            )}
            
          </div>
        )}

        {time && <div className="text-xs text-gray-400">{time}</div>}

        <div>
        {rating && <StarRating rating={rating} />}
        </div>

        {children}
      </CardContent>
    </Card>
  )
}

export default ShowcaseCard
