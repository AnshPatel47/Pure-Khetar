import { FarmPhotoMarquee } from './FarmPhotoMarquee';
import { FarmHero } from './FarmHero';
import { NetHouseIntro } from './NetHouseIntro';
import { FarmPracticesGrid } from './FarmPracticesGrid';
import { DairyVideoSection } from './DairyVideoSection';
import { WaterConservationSection } from './WaterConservationSection';
import { LabCertificationsSection } from './LabCertificationsSection';
import { FarmCTA } from './FarmCTA';

export default function OurFarmPage() {
  return (
    <div className="bg-cream overflow-x-hidden">
      <FarmHero />
      <FarmPhotoMarquee />
      <NetHouseIntro />
      <FarmPracticesGrid />
      <DairyVideoSection />
      <WaterConservationSection />
      <LabCertificationsSection />
      <FarmCTA />
    </div>
  );
}
