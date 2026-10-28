import { TeamHero } from './TeamHero';
import { TeamCards } from './TeamCards';
import { TeamValues } from './TeamValues';
import { TeamCTA } from './TeamCTA';

export default function TeamPage() {
  return (
    <div className="bg-cream overflow-x-hidden">
      <TeamHero />
      <TeamCards />
      <TeamValues />
      <TeamCTA />
    </div>
  );
}
