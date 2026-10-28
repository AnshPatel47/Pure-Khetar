/** Real photos and videos from the farm. Add new media here and it shows up on the site. */

export interface FarmVideo {
  id: string;
  src: string;
  poster?: string;
  title: string;
  caption: string;
}

export interface FarmPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export const FARM_VIDEOS: FarmVideo[] = [
  {
    id: 'field-walk',
    src: '/videos/deti.mp4',
    poster: '/videos/deti-poster.jpg',
    title: 'Walking the Ringan rows',
    caption: 'A walk through our eggplant field in Kamana.',
  },
  {
    id: 'dairy',
    src: '/videos/natural-derry-farm.mp4',
    poster: '/videos/natural-derry-farm-poster.jpg',
    title: 'Farm life',
    caption: 'Our buffaloes resting in the shade at the farm.',
  },
  {
    id: 'water-supply',
    src: '/videos/FarmWaterSupply.mp4',
    title: 'Borewell water supply',
    caption: 'Our borewell system supplying water across the farm.',
  },
  {
    id: 'pure-khetar',
    src: '/videos/PureKhetar.mp4',
    title: 'Pure Khetar — the farm',
    caption: 'An overview of our Kamana family farm.',
  },
  {
    id: 'water-pumping',
    src: '/videos/WaterPumping.mp4',
    title: 'Water pumping',
    caption: 'Traditional water management on our fields.',
  },
  {
    id: 'water-supplying',
    src: '/videos/WaterSupplying.mp4',
    title: 'Channel irrigation',
    caption: 'Supplying water through our network of channels.',
  },
  {
    id: 'well-watering',
    src: '/videos/WellWatering.mp4',
    title: 'Well watering',
    caption: 'Drawing water from our traditional farm well.',
  },
  {
    id: 'irrigation-process',
    src: '/videos/irrigationProcess.mp4',
    title: 'Drip irrigation',
    caption: 'Our precision drip system conserves 60% more water.',
  },
  {
    id: 'live-farming',
    src: '/videos/liveFarming.mp4',
    title: 'Live farming',
    caption: 'A day in the life at Kamana farm.',
  },
  {
    id: 'papaya-plant',
    src: '/videos/papaya_plant.mp4',
    title: 'Papaya trees',
    caption: 'Our natural papaya trees growing tall in the Gujarat sun.',
  },
  {
    id: 'tabelo',
    src: '/videos/tabelo.mp4',
    title: 'The tabelo (barn)',
    caption: 'Our Gir cows at the tabelo — the source of our A2 Vedic manure.',
  },
  {
    id: 'veges-farm',
    src: '/videos/vegesFarm.mp4',
    title: 'Vegetable fields',
    caption: 'Rows of fresh natural vegetables ready for harvest.',
  },
];

export const FARM_PHOTOS: FarmPhoto[] = [
  {
    id: 'net-house',
    src: '/images/farm/nethouse-farming.jpeg',
    alt: 'Shade-net house over freshly prepared vegetable beds',
    title: 'Shade-net beds',
    caption: 'Prepared beds under shade net, ready for sowing.',
  },
  {
    id: 'watering',
    src: '/images/farm/classic-watering.jpeg',
    alt: 'Water running through a channel beside a young vegetable field',
    title: 'Channel irrigation',
    caption: 'The traditional way of watering our fields.',
  },
  {
    id: 'baby-ringan',
    src: '/images/farm/baby-eggplant.jpeg',
    alt: 'Young eggplant plant growing in a ploughed field',
    title: 'Young Ringan plant',
    caption: 'A young Ringan plant settling into the soil.',
  },
  {
    id: 'borewell',
    src: '/images/farm/Borewell.jpeg',
    alt: 'Farm borewell water source at Kamana farm',
    title: 'Borewell water source',
    caption: 'Our borewell — the heart of our irrigation system.',
  },
  {
    id: 'farming',
    src: '/images/farm/Farming.jpeg',
    alt: 'Active farming on the fields at Kamana',
    title: 'Open field farming',
    caption: 'Gujarat red soil nurtured by Vedic practices.',
  },
  {
    id: 'wp1',
    src: '/images/farm/WP1.jpeg',
    alt: 'Farm water supply system at Kamana',
    title: 'Water supply system',
    caption: 'Our efficient water distribution network.',
  },
  {
    id: 'wp2',
    src: '/images/farm/WP2.jpeg',
    alt: 'Water channel flowing through the farm',
    title: 'Water channels',
    caption: 'Channels carved by decades of careful farming.',
  },
  {
    id: 'water-supply',
    src: '/images/farm/Water_Suuply.jpeg',
    alt: 'Water being supplied to the vegetable beds',
    title: 'Field watering',
    caption: 'Morning irrigation — the day begins at sunrise.',
  },
  {
    id: 'borewell-pump',
    src: '/images/farm/boreWithPumpimg.jpeg',
    alt: 'Borewell with pump unit at the farm',
    title: 'Pump station',
    caption: 'Reliable water access throughout the growing season.',
  },
  {
    id: 'f2',
    src: '/images/farm/f2.jpeg',
    alt: 'Farm field overview at Kamana',
    title: 'Farm overview',
    caption: 'Kamana farm stretching across Gujarat\'s red soil.',
  },
  {
    id: 'f3',
    src: '/images/farm/f3.jpeg',
    alt: 'Another view of the natural farm at Kamana',
    title: 'Natural rows',
    caption: 'Every row planted with care and purpose.',
  },
  {
    id: 'farm-pic',
    src: '/images/farm/farmPic.jpeg',
    alt: 'Family farm picture at Kamana, Visnagar',
    title: 'Kamana village farm',
    caption: 'Our roots — three generations of farming tradition.',
  },
  {
    id: 'plant',
    src: '/images/farm/plant.jpeg',
    alt: 'A healthy young plant growing at Kamana farm',
    title: 'Young plant',
    caption: 'Every plant grown with Vedic care from seed to harvest.',
  },
  {
    id: 'baby-eggplant-alt',
    src: '/images/farm/babyEggplant.jpeg.jpeg',
    alt: 'Young eggplant plants in a row',
    title: 'Eggplant rows',
    caption: 'Young eggplants before the morning harvest.',
  },
  {
    id: 'big-watering',
    src: '/images/farm/watering.jpeg',
    alt: 'Large-scale irrigation at Kamana farm fields',
    title: 'Field-scale irrigation',
    caption: 'Sufficient water for every plant — every single day.',
  },
];
