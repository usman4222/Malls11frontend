import { useState, useEffect } from 'react'

import { Heart } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/SiteComponents/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/SiteComponents/ui/avatar"
import { Button } from "../../../components/SiteComponents/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/SiteComponents/ui/card"
import { Badge } from "../../../components/SiteComponents/ui/badge"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SaveButton({ itemId, itemType, initialSaved = true, onSaveToggle }) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    try {
      setIsLoading(true)

      await new Promise(resolve => setTimeout(resolve, 500))
      
      setIsSaved(!isSaved)
      onSaveToggle(itemId, itemType, !isSaved)
      toast({
        description: isSaved ? 'Removed from favorites' : 'Added to favorites',
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-background/50 hover:backdrop-blur-sm transition-all absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
      disabled={isLoading}
      onClick={handleSave}
    >
      <Heart
        className={`h-5 w-5 transition-all ${isSaved ? 'fill-current text-red-500' : ''}`}
      />
      <span className="sr-only">
        {isSaved ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </Button>
  )
}


function ServiceCard({ item, onSaveToggle }) {
  return (
    <Card className="group  overflow-hidden">
      <div className="relative aspect-video">
        <img
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <SaveButton
          itemId={item.id}
          itemType="service"
          onSaveToggle={onSaveToggle}
        />
      </div>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {item.category}
        </Badge>
        <Link href={`/services/${item.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary">
            {item.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <span className="font-medium">{item.rating}</span>
          <span className="mx-1">({item.reviews} Reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.provider.avatar} alt={item.provider.name} />
            <AvatarFallback>{item.provider.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{item.provider.name}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Starting at: </span>
          <span className="font-semibold">${item.startingPrice.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function EmptyState({ type }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Heart className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No saved {type}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        When you find {type} you like, click the heart icon to save them here for later.
      </p>
    </div>
  )
}


function SavedItemsGrid({ items, type, onSaveToggle }) {
  if (items.length === 0) {
    return <EmptyState type={type} />
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ServiceCard key={item.id} item={item} onSaveToggle={onSaveToggle} />
      ))}
    </div>
  )
}


export default function FavouriteProjects() {
  const [savedItems, setSavedItems] = useState({
    service: [],
    project: [],
    job: [],
    employer: [],
    freelancer: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {

        await new Promise(resolve => setTimeout(resolve, 1000))
        setSavedItems({
          service: [
            {
              id: "1",
              title: "I will do SEO article writing, blog post",
              category: "Digital Marketing",
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-12%20at%206.27.59%E2%80%AFPM-KZB8t6wLFjppM6bpqb4iFTCtv9I7vT.png",
              provider: {
                name: "Muhammad Hamid",
                avatar: "/placeholder.svg?height=32&width=32"
              },
              rating: 0.0,
              reviews: 0,
              startingPrice: 10.00
            },

          ],
          project: [],
          job: [],
          employer: [],
          freelancer: []
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedItems()
  }, [])

  const handleSaveToggle = (id, type, isSaved) => {
    setSavedItems(prev => ({
      ...prev,
      [type]: isSaved
        ? prev[type]
        : prev[type].filter(item => item.id !== id)
    }))
  }

  return (
    <div className="container bg-[#F0EFEC] h-full py-6  md:px-6">
      <h1 className="text-3xl font-bold mb-6">Favorites</h1>
      
      <Tabs defaultValue="service" className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent">
          {(Object.keys(savedItems)).map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </TabsTrigger>
          ))}
        </TabsList>
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg" />
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          (Object.keys(savedItems) ).map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <SavedItemsGrid
                items={savedItems[type]}
                type={type}
                onSaveToggle={handleSaveToggle}
              />
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  )
}

