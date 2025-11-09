import Gallery from '@/components/layout/gallery'
import Topnav from '@/components/header/topnav';
import Nav from '@/components/header/nav';

export default function GalleryPage() {
    return (
        <div className="min-h-screen">
            <Topnav />
            <Nav />
            <Gallery />
        </div>
    )
}

export const metadata = {
    title: 'Gallery - UCEK',
    description: 'Explore our college gallery featuring moments from campus life, events, and achievements at University College of Engineering Kariavattom.',
}