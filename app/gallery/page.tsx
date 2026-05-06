import Gallery from '@/components/layout/gallery'
import Topnav from '@/components/header/topnav';
import Nav from '@/components/header/nav';
import Footer from '@/components/layout/footer';

export default function GalleryPage() {
    return (
        <div className="min-h-screen">
            <Topnav />
            <Nav />
            <Gallery />
            <Footer />
        </div>
    )
}

export const metadata = {
    title: 'Gallery - UCEK',
    description: 'Explore our college gallery featuring moments from campus life, events, and achievements at University College of Engineering Kariavattom.',
}