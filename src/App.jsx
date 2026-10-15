// ─────────────────────────────────────────────────────────────────────────────
//  App — single scroll-based invitation.
//
//  Adds ambient gold particles across the whole page for a subtle shimmer
//  effect. The hero is a 3-section scroll sequence; the rest of the
//  invitation (ceremony details, photo gallery, venue, footer) flows
//  naturally below.
// ─────────────────────────────────────────────────────────────────────────────

import PalaceGate from './components/PalaceGate.jsx'
import CeremonyDetails from './components/CeremonyDetails.jsx'
import PhotoGallery from './components/PhotoGallery.jsx'
import Venue from './components/Venue.jsx'
import Footer from './components/Footer.jsx'
import FloatingParticles from './components/FloatingParticles.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-sandstone-900 text-ivory overflow-x-hidden">
      {/* Ambient gold sparkles drift upward across the whole site. */}
      <FloatingParticles />

      <PalaceGate />
      <main className="relative z-10">
        <CeremonyDetails />
        <PhotoGallery />
        <Venue />
        <Footer />
      </main>
    </div>
  )
}