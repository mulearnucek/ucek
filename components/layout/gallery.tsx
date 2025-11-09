'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems, getImgLink } from '@/lib/data'
import Image from 'next/image'

interface GalleryItem {
  id: string
  date: string
  title: string
  description: string
  imageUrl: string
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleryItems()
        console.log('Raw gallery data:', data)
        
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

  const handleImageClick = (item: GalleryItem, index: number) => {
    setSelectedImage(item)
    setCurrentIndex(index)
    setImageLoading(true)
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryItems[newIndex])
    setImageLoading(true)
  }

  const handleNext = () => {
    const newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedImage(galleryItems[newIndex])
    setImageLoading(true)
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4">Loading gallery...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-16 pt-4 bg-gray-50">
      <div className="container mx-auto px-4">

        {galleryItems.length === 0 ? (
          <p className="text-center text-gray-500">No gallery items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square"
                onClick={() => handleImageClick(item, index)}
              >
                <Image
                  src={getImgLink(item.imageUrl)}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modern Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            {/* Preload next and previous images */}
            {galleryItems[currentIndex - 1] && (
              <Image
                src={getImgLink(galleryItems[currentIndex - 1].imageUrl)}
                alt="preload"
                width={1}
                height={1}
                className="hidden"
                priority
              />
            )}
            {galleryItems[currentIndex + 1] && (
              <Image
                src={getImgLink(galleryItems[currentIndex + 1].imageUrl)}
                alt="preload"
                width={1}
                height={1}
                className="hidden"
                priority
              />
            )}
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              onClick={handlePrevious}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              onClick={handleNext}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main image */}
            <div className="max-w-5xl max-h-[80vh] mx-auto px-16 relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <Image
                src={getImgLink(selectedImage.imageUrl)}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                priority
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>

            {/* Image counter and thumbnails */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="text-white text-sm mb-4 text-center">
                {currentIndex + 1} / {galleryItems.length}
              </div>
              
              {/* Thumbnail strip */}
              <div className="flex space-x-2 max-w-md overflow-x-auto scrollbar-hide">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-white' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                    onClick={() => {
                      setCurrentIndex(index)
                      setSelectedImage(item)
                      setImageLoading(true)
                    }}
                  >
                    <Image
                      src={getImgLink(item.imageUrl)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Click overlay to close */}
            <div 
              className="absolute inset-0 -z-10"
              onClick={() => setSelectedImage(null)}
            />
          </div>
        )}
      </div>
    </section>
  )
}