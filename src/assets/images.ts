import zhdanImg from './zhdan.jpg';
import elenaImg from './clients/elena.jpg';
import sergeyImg from './clients/sergey.jpg';
import olgaImg from './clients/olga.jpg';
import doctorValentinaImg from './clients/doctor-valentina.jpg';

export const APP_IMAGES = {
  zhdan: zhdanImg,
  elena: elenaImg,
  sergey: sergeyImg,
  olga: olgaImg,
  doctorValentina: doctorValentinaImg,
};

// Fallbacks in case local static assets are ever unavailable in external GitHub environments
export const FALLBACK_IMAGES = {
  zhdan: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
  elena: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  sergey: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  olga: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  doctorValentina: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
};

export default APP_IMAGES;
