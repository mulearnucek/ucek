'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems, getImgLink } from '@/lib/data'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'

interface GalleryItem {
  id: string
  date: string
  title: string
  description: string
  imageUrl: string
}

export default function HomeGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleryItems()
        
        const items = data.map((item, index) => ({
          id: item[0] || `item-${index}`,
          date: item[0] || '',
          title: item[1] || 'Untitled',
          description: item[2] || '',
          imageUrl: item[3] || ''
        }))
        
        setGalleryItems(items)
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryData()
  }, [])

  if (isLoading || galleryItems.length === 0) {
    return null;
  }

  const marqParams = {
    autoFill: galleryItems.length >= 3,
    pauseOnHover: true,
    speed: 80,
    play: galleryItems.length >= 3,
  };

  return (
    <div className="py-2 bg-white">
      <h2 className="text-xl md:text-2xl ml-4 md:ml-16 font-bold mb-4 flex items-center">
        <span className="w-2 h-5 bg-blue-500 mr-2"></span>
        Gallery
      </h2>

      <div className="relative overflow-hidden py-1 flex">
        <Marquee {...marqParams} className="w-full">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="w-[300px] min-w-[300px] h-[330px] mt-3 mb-10 mx-4 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-250 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 w-full" onClick={()=> router.push("/gallery")}>
                <Image
                  src={getImgLink(item.imageUrl)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index < 3}
                  loading={index > 2 ? "lazy" : "eager"}
                  quality={75}
                />
              </div>
              <div className="p-4">
                <h3 className="text-base sm:text-md font-bold text-gray-800 mb-2 line-clamp-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
