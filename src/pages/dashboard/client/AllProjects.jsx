import ShowcaseCard from '@/components/DashboardComponents/ClientDashboardCompoents/ShowcaseCard'
import { useState } from 'react'

function AllProjects() {
  const [liked,setLiked] = useState(false)
  const data = [
    
    {
      id: 1,
      title: "Jhon",
      rating : 4,
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque alias rem temporibus. At error asperiores dolore praesentium saepe delectus laborum impedit id voluptatibus et minima, ea pariatur culpa voluptas?",
      headerImg: "path_to_image_1.jpg" ,
      time: "3 days ago",
      price: '$10'
    },
    {
      id: 2,
      title: "Doe",
      rating: 5,
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque alias rem temporibus. At error asperiores dolore praesentium saepe delectus laborum impedit id voluptatibus et minima, ea pariatur culpa voluptas?",
      headerImg: "path_to_image_2.jpg" ,
      time : '1.5 years ago',
      price: '$10'
    },
    {
      id: 3,
      title: "Alexa",
      rating : 2,
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque alias rem temporibus. At error asperiores dolore praesentium saepe delectus laborum impedit id voluptatibus et minima, ea pariatur culpa voluptas?",
      headerImg: "path_to_image_2.jpg" ,
      time:"1 month ago",
      price: '$ 50'
    },
    {
      id: 4,
      title: "sirri",
      rating: 5,
      description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eaque alias rem temporibus. At error asperiores dolore praesentium saepe delectus laborum impedit id voluptatibus et minima, ea pariatur culpa voluptas?",
      time:'14 days Ago',
      headerImg: "path_to_image_2.jpg",
      price: '$23'
    }

  ]
  return (
    /* You can use that card component multiple time anywhere, you can update those props as well as include as many children as you want. Its a customized card!*/
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8 place-items-center'>
    
      {data.map((item) => (
        <ShowcaseCard 
          key={item.id} 
          title={item.title} 
          rating={item.rating}
          headerImg={item.headerImg}
          liked={liked}
          setLiked={setLiked}
          time = {item.time}
          price = {item.price}
        >
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-700">Description: {item.description}</h1>
          </div>
        </ShowcaseCard>
      ))}
    </div>
    
  );
}


export default AllProjects;

