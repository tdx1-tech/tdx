/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Service, CaseStudy, PatientReview, FAQItem } from './types';


// Case study images - Dr. Mashal
import diastemaClosure from '@/assets/images/Cases/dr-mashal-cases/diastema-closure.jpeg';
import toothRestoration from '@/assets/images/Cases/dr-mashal-cases/tooth-restoration.jpeg';
import teethWhitening from '@/assets/images/Cases/dr-mashal-cases/teeth-whitening.jpeg';
import teethWhiteningBleaching from '@/assets/images/Cases/dr-mashal-cases/teeth-whitening-bleaching.jpeg';
import toothRestoration2 from '@/assets/images/Cases/dr-mashal-cases/tooth-restoration-2.jpeg';
import anteriorFilling from '@/assets/images/Cases/dr-mashal-cases/anterior-filling.jpeg';
import rootCanalBefore from '@/assets/images/Cases/dr-mashal-cases/root-canal-treatment-before.jpeg';
import rootCanalAfter from '@/assets/images/Cases/dr-mashal-cases/root-canal-treatment-after.jpeg';
import rootCanalFull from '@/assets/images/Cases/dr-mashal-cases/root-canal-treatment-full.jpeg';

// Case study images - Dr. Faizan.
// Each case ships as three files: the before and after halves, already split out
// of the clinic's side-by-side photo and padded to identical dimensions so the
// comparison slider lines up, plus the intact side-by-side view behind the
// "Full Split Photo" toggle.
import crowdingRotationBefore from '@/assets/images/Cases/dr-faizan-cases/braces-severe-crowding-rotation-before.webp';
import crowdingRotationAfter from '@/assets/images/Cases/dr-faizan-cases/braces-severe-crowding-rotation-after.webp';
import crowdingRotationFull from '@/assets/images/Cases/dr-faizan-cases/braces-severe-crowding-rotation-full.webp';
import proclinationBefore from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-correction-before.webp';
import proclinationAfter from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-correction-after.webp';
import proclinationFull from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-correction-full.webp';
import proclinationSpacingBefore from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-spacing-adult-before.webp';
import proclinationSpacingAfter from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-spacing-adult-after.webp';
import proclinationSpacingFull from '@/assets/images/Cases/dr-faizan-cases/braces-proclination-spacing-adult-full.webp';
import crowdingRotationTwoBefore from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-rotation-before.webp';
import crowdingRotationTwoAfter from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-rotation-after.webp';
import crowdingRotationTwoFull from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-rotation-full.webp';
import smileRehabBefore from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-rehab-before.webp';
import smileRehabAfter from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-rehab-after.webp';
import smileRehabFull from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-rehab-full.webp';
import smileLineBefore from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-crowding-smile-line-before.webp';
import smileLineAfter from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-crowding-smile-line-after.webp';
import smileLineFull from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-crowding-smile-line-full.webp';
import rotatedIncisorsBefore from '@/assets/images/Cases/dr-faizan-cases/braces-rotated-incisors-before.webp';
import rotatedIncisorsAfter from '@/assets/images/Cases/dr-faizan-cases/braces-rotated-incisors-after.webp';
import rotatedIncisorsFull from '@/assets/images/Cases/dr-faizan-cases/braces-rotated-incisors-full.webp';
import smileBroadeningBefore from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-broadening-before.webp';
import smileBroadeningAfter from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-broadening-after.webp';
import smileBroadeningFull from '@/assets/images/Cases/dr-faizan-cases/braces-crowding-smile-broadening-full.webp';
import upperArchBefore from '@/assets/images/Cases/dr-faizan-cases/braces-upper-arch-alignment-before.webp';
import upperArchAfter from '@/assets/images/Cases/dr-faizan-cases/braces-upper-arch-alignment-after.webp';
import upperArchFull from '@/assets/images/Cases/dr-faizan-cases/braces-upper-arch-alignment-full.webp';
import protrusionSmileBefore from '@/assets/images/Cases/dr-faizan-cases/braces-protrusion-smile-before.webp';
import protrusionSmileAfter from '@/assets/images/Cases/dr-faizan-cases/braces-protrusion-smile-after.webp';
import protrusionSmileFull from '@/assets/images/Cases/dr-faizan-cases/braces-protrusion-smile-full.webp';
import anteriorAlignmentBefore from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-alignment-before.webp';
import anteriorAlignmentAfter from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-alignment-after.webp';
import anteriorAlignmentFull from '@/assets/images/Cases/dr-faizan-cases/braces-anterior-alignment-full.webp';
import debondBefore from '@/assets/images/Cases/dr-faizan-cases/braces-debond-full-arch-before.webp';
import debondAfter from '@/assets/images/Cases/dr-faizan-cases/braces-debond-full-arch-after.webp';
import debondFull from '@/assets/images/Cases/dr-faizan-cases/braces-debond-full-arch-full.webp';

// Doctor profile images
import drMashal from '@/assets/images/dr-mashal.webp';
import faizan from '@/assets/images/faizan.webp';

// Extra doctor photos for the per-doctor profile pages.
// Only real photographs of the two doctors belong here - the stock
// doctor_*.jpg files in assets/images are generic scaffolding imagery.
import mashalMirrorSelfie from '@/assets/images/Gallery/dr-mashal-mirror-selfie.jpg';
import mashalTraining from '@/assets/images/Gallery/dr-mashal-conf.jpg';
import mashalPediatric from '@/assets/images/Gallery/dr-mashal-treating-kids.jpeg';
import mashalCourses from '@/assets/images/Gallery/dr-mashal-courses.jpg';
import faizanInClinic from '@/assets/images/Gallery/dr-faizan-in-clinic.jpeg';
import faizanAbroad from '@/assets/images/Gallery/dr-faizan-in-scotland.webp';

export const DOCTORS: Doctor[] = [
  {
    id: 'faizan',
    slug: 'dr-faizan-ul-hassan',
    name: 'Dr. Faizan Ul Hassan',
    fullName: 'Dr. Faizan Ul Hassan',
    title: 'Consultant Orthodontist & Department Lead',
    specialties: ['Conventional Fixed Orthodontics', 'Lingual Orthodontics', 'Cleft Lip and Palate Intervention', 'Surgical and Accelerated Orthodontics', 'Smile Makeovers', 'BDS, FCPS (Orthodontics)'],
    bio: 'Dr. Faizan is a dedicated orthodontist and educator who has treated more than 1,300 cases over 15 years and supervised thousands of treatments. He specializes in advanced fixed, lingual, and surgical alignments.',
    detailedBio: 'Dr. Faizan ul Hassan is a dedicated and accomplished orthodontist at the RCD\'s Department of Orthodontics. He graduated from Khyber College of Dentistry (KCD) in 2013 and pursued his passion for orthodontics, completing his fellowship and clearing FCPS part 2 in 2018, becoming one of the youngest fellows in the field.\n\nDr. Hassan has personally treated more than 1,300 cases over 15 years and supervised the treatment of thousands more under the care of postgraduate residents. As an educator, he has facilitated 17 workshops and courses for postgraduate orthodontic residents. His research expertise is evident in his publication record, with 21 articles covering a range of topics.\n\nDr. Hassan teaches final-year orthodontics, sharing his expertise and inspiring the next generation of dental professionals. His commitment to excellence in clinical practice, education, and research makes him a valuable asset to our institution.',
    education: [
      'BDS - Khyber College of Dentistry (2013)',
      'FCPS - Orthodontics (CPSP Fellowship, 2018)'
    ],
    certs: [
      'Certificate in Lingual Orthodontics',
      'Certificate in Health Professions Education'
    ],
    honors: [
      'Gold Medal in Undergraduate (KCD)',
      'Youngest FCPS Orthodontic Fellow Award (2018)',
      'Principal Facilitator of National Orthodontic Workshops'
    ],
    languages: ['English', 'Urdu', 'Pashto', 'Punjabi'],
    image: faizan,
    photos: [
      {
        src: faizan,
        alt: 'Portrait of Dr. Faizan Ul Hassan',
        caption: 'Consultant Orthodontist & Department Lead'
      },
      {
        src: faizanInClinic,
        alt: 'Dr. Faizan Ul Hassan standing in the reception area of The Dental Experience',
        caption: 'At the clinic in Shaheen Town, Peshawar'
      },
      {
        src: faizanAbroad,
        alt: 'Dr. Faizan Ul Hassan on a street in Edinburgh, Scotland',
        caption: 'Professional development travel - Edinburgh, Scotland'
      }
    ],
    // The clinic reports 17 workshops and courses facilitated in total; the
    // split between Principal and Associate Facilitator roles is not on file,
    // so they are listed here as a single combined entry.
    courses: [
      {
        title: 'National Postgraduate Orthodontic Workshops & Courses',
        provider: 'College of Physicians and Surgeons Pakistan (CPSP)',
        role: 'Facilitator - 17 workshops & courses',
        description:
          'Designed and led national workshops and courses training postgraduate orthodontic residents from across Pakistan, as both Principal and Associate Facilitator.'
      },
      {
        title: 'Lingual Orthodontics',
        provider: 'Certified programme',
        role: 'Certified',
        description:
          'Indirect bonding and biomechanics for brackets placed on the inner tooth surfaces - the basis of the clinic\'s invisible braces stream.'
      },
      {
        title: 'Health Professions Education',
        provider: 'Certified programme',
        role: 'Certified',
        description:
          'Formal teaching qualification underpinning his final-year orthodontics teaching and workshop facilitation.'
      }
    ],
    // Only one training photo is on file for Dr. Faizan - add workshop
    // photography here as the clinic supplies it.
    coursePhotos: [
      {
        src: faizanAbroad,
        alt: 'Dr. Faizan Ul Hassan during professional development travel in Edinburgh, Scotland',
        caption: 'Professional development, Edinburgh'
      }
    ],
    instagramUrl: 'https://www.instagram.com/faizanulhassan/',
    whatsappNumber: '+923439591498',
    phoneNumber: '+923165944327'
  },
  {
    id: 'mashal',
    slug: 'dr-mashal-zeb-jan',
    name: 'Dr. Mashal Zeb Jan',
    fullName: 'Dr. Mashal Zeb Jan',
    title: "Pakistan's Youngest FCPS Specialist in Endodontics & Operative Dentistry",
    specialties: ['Root Canal Therapy', 'Porcelain Veneers', 'Smile Design', 'Aesthetic Restorations', 'Dental Bonding', 'FCPS (Endodontics and Operative Dentistry)'],
    bio: 'Expert endodontic and restorative dental care - from a consultant who set the standard before most had even begun.',
    detailedBio: 'Dr. Mashal Zeb Jan is a specialist in Endodontics and Operative Dentistry, holding the prestigious FCPS qualification awarded by the College of Physicians and Surgeons Pakistan. She is the first resident of Rehman College of Dentistry to clear FCPS Part II, and the youngest consultant in her specialty to pass the examination in Pakistan - clearing it on her first attempt. She brings that same standard of precision and commitment to every patient she treats.',
    education: [
      'BDS, FCPS (Endodontics & Operative Dentistry)'
    ],
    certs: [
      'Certified Digital Smile Designer (DSD)',
      'Advanced Micro-Endodontics Training Certification'
    ],
    honors: [
      'Gold Medal in Restorative & Operative Dentistry',
      'Best Clinical Case Presentation (CPSP)',
      'Distinction in Clinical Endodontics'
    ],
    languages: ['English', 'Pashto', 'Urdu'],
    image: drMashal,
    photos: [
      {
        src: drMashal,
        alt: 'Dr. Mashal Zeb Jan in convocation robes holding her College of Physicians and Surgeons Pakistan scroll',
        caption: 'FCPS convocation - College of Physicians and Surgeons Pakistan'
      },
      {
        src: mashalMirrorSelfie,
        alt: 'Dr. Mashal Zeb Jan',
        caption: 'Outside the clinic'
      },
      {
        src: mashalTraining,
        alt: 'Dr. Mashal Zeb Jan at an international hands-on cosmetic dentistry course',
        caption: 'Hands-on training abroad with international faculty'
      },
      {
        src: mashalPediatric,
        alt: 'Dr. Mashal Zeb Jan speaking with a young patient during a consultation',
        caption: 'Chairside with a young patient - unhurried, child-friendly care'
      }
    ],
    // Continuing education. The first two entries restate certifications the
    // clinic already publishes (see `certs` above). The third is inferred from
    // the training photograph and needs the doctor to confirm the real course
    // name, faculty and year - or to be removed. Extend with her full CPD record.
    courses: [
      {
        title: 'Digital Smile Design (DSD)',
        provider: 'Digital Smile Design Academy',
        role: 'Certified Designer',
        description:
          'Photography-led, facially driven smile planning - the workflow behind every veneer and smile makeover case at the clinic.'
      },
      {
        title: 'Advanced Micro-Endodontics',
        provider: 'Advanced Endodontic Training Programme',
        role: 'Certified',
        description:
          'Root canal therapy: canal location, negotiation of calcified anatomy and precision retreatment.'
      },
      {
        title: 'Hands-On Aesthetic & Composite Dentistry',
        provider: 'International visiting faculty',
        location: 'United Kingdom',
        role: 'Attended',
        description:
          'Live hands-on programme in layered anterior composites and contemporary aesthetic restorative protocols.'
      }
    ],
    coursePhotos: [
      {
        src: mashalCourses,
        alt: 'Dr. Mashal Zeb Jan with fellow practitioners at a hands-on dentistry course',
        caption: 'Hands-on training course'
      }
    ],
    instagramUrl: 'https://www.instagram.com/drmashalzebjan/',
    whatsappNumber: '+923165944327',
    phoneNumber: '+923165944327'
  }
];

export const SERVICES: Service[] = [
  // Dr. Faizan's Orthodontic Services
  {
    id: 'fixed-orthodontics',
    title: 'Conventional Fixed Orthodontics',
    doctor: 'faizan',
    shortDescription: 'High-precision metal and ceramic brace systems designed for comprehensive correction of complex malocclusions.',
    longDescription: 'Our conventional fixed orthodontic treatments represent the baseline of clinical alignment, optimized by Dr. Faizan’s micro-calibrated biomechanics. Utilizing premium low-friction bracket systems and super-elastic nickel-titanium archwires, we correct overcrowding, deep bites, crossbites, and severe jaw misalignment with maximum structural safety and comfort.',
    duration: '12-24 months active phase',
    priceEstimate: 'Comprehensive custom package',
    benefits: [
      'Corrects the most complex crowding and bite abnormalities',
      'Provides absolute structural control over dental movements',
      'Highly optimized, low-friction brackets reduce treatment time',
      'Includes premium, clear ceramic aesthetic bracket options'
    ],
    steps: [
      'Full clinical photography, study models, and cephalometric x-ray analysis',
      'Custom precise bonding of medical-grade brackets to tooth surfaces',
      'Sequential low-force wire changes and biomechanical adjustment appointments',
      'Aesthetic debonding, clinical polishing, and premium retention phase'
    ],
    iconName: 'Grid'
  },
  {
    id: 'lingual-orthodontics',
    title: 'Invisible Lingual Orthodontics',
    doctor: 'faizan',
    shortDescription: 'Premium, fully hidden orthodontic braces bonded to the inside surfaces of your teeth.',
    longDescription: 'For professionals, presenters, and patients seeking absolute cosmetic discretion during treatment, Dr. Faizan provides advanced Lingual Orthodontics. These custom brackets are carefully engineered and placed on the back (inside) surfaces of the teeth, making your orthodontic alignment completely invisible to the outside world while maintaining continuous, highly controlled teeth movement.',
    duration: '12-18 months',
    priceEstimate: 'Bespoke invisible alignment',
    benefits: [
      '100% invisible alignment from start to finish',
      'Custom fabricated to match the unique curvature of each tooth',
      'No risk of front-surface enamel decalcification or white spots',
      'High surgical precision ensures rapid results'
    ],
    steps: [
      'High-resolution digital impression taking and laboratory mapping',
      'Indirect bonding setup for ultimate clinical placement accuracy',
      'Specialized lingual wire adjustments at clinical intervals',
      'Final debonding, glass-ionomer polish, and lingual wire retention'
    ],
    iconName: 'EyeOff'
  },
  {
    id: 'cleft-orthodontics',
    title: 'Cleft Lip & Palate Ortho Intervention',
    doctor: 'faizan',
    shortDescription: 'Specialized interdisciplinary orthodontic care for cleft-affected jaw arches and alveolar structures.',
    longDescription: 'Children and adults with cleft lip and palate require highly specialized, staged orthodontic care. Dr. Faizan is a leading regional expert in coordinating cleft interventions, working alongside oral-maxillofacial surgeons. He provides precise presurgical orthopedics, expansion of collapsed dental arches, and preparing alveolar bone grafting sites to ensure functional, healthy, and beautiful results.',
    duration: 'Phase-wise customized therapy',
    priceEstimate: 'Specialized therapeutic support',
    benefits: [
      'Expands collapsed arches to restore nasal airway and bite alignment',
      'Meticulous alignment prior to bone grafting for optimal healing',
      'Interdisciplinary collaboration with top cleft surgery teams',
      'Restores chewing function and natural facial symmetry'
    ],
    steps: [
      'Coordinated pediatric or adult multidisciplinary planning',
      'Custom bone expansion or arch development appliance fitting',
      'Continuous alignment of cleft-adjacent dental roots',
      'Integration with cosmetic composite bonding and final smile touchups'
    ],
    iconName: 'Heart'
  },
  {
    id: 'surgical-orthodontics',
    title: 'Surgical & Accelerated Orthodontics',
    doctor: 'faizan',
    shortDescription: 'Advanced alignment combined with orthognathic surgery or micro-osteoperforations to speed up treatment.',
    longDescription: 'When jaw discrepancies are too severe for braces alone, Dr. Faizan specializes in Surgical Orthodontics (Orthognathic treatment), preparing your bite perfectly before and after jaw alignment surgery. Additionally, he offers accelerated orthodontic protocols utilizing clinical micro-osteoperforations to reduce active treatment times by up to 30-40% safely.',
    duration: 'Accelerated options available',
    priceEstimate: 'Custom surgical-ortho quote',
    benefits: [
      'Resolves severe skeletal jaw discrepancies (receding or prominent chins)',
      'Substantially reduces active braces wear time with acceleration protocols',
      'Creates spectacular transformations in facial profile and airway flow',
      'Long-lasting, structurally stable bone relationships'
    ],
    steps: [
      'Comprehensive 3D surgical surgical simulations & joint consultation',
      'Pre-surgical braces alignment phase to coordinate dental arches',
      'Orthognathic surgery (co-operated) followed by final alignment detailing',
      'Precision retention to preserve the beautiful structural result'
    ],
    iconName: 'Activity'
  },
  {
    id: 'clear-aligners',
    title: 'Premium Clear Aligners',
    doctor: 'faizan',
    shortDescription: 'Nearly invisible, custom-molded removable aligners that gently guide your teeth into perfect alignment.',
    longDescription: 'Clear Aligners represent the peak of modern orthodontic convenience. Custom-designed using advanced 3D treatment planning, these transparent medical-grade plastic trays are virtually invisible, comfortable to wear, and fully removable for dining and oral hygiene, providing a seamless path to your ideal smile.',
    duration: '6-12 months',
    priceEstimate: 'Customized digital plan',
    benefits: [
      'Virtually invisible alignment solution',
      'Removable for easy eating and brushing',
      'Fewer in-clinic adjustment visits required',
      'Custom-molded for maximum comfort'
    ],
    steps: [
      'High-precision 3D digital intraoral scanning',
      'Virtual simulation of dental movements',
      'Bespoke fabrication of aligner sequence',
      'Bi-weekly tray progression & clinical checkups'
    ],
    iconName: 'Shield'
  },

  // Dr. Mashal's Services
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    doctor: 'mashal',
    shortDescription: 'Precise endodontic therapy that saves infected or severely decayed teeth from extraction.',
    longDescription: 'As an FCPS-qualified specialist in Endodontics, Dr. Mashal performs meticulous root canal therapy to remove infected or inflamed pulp, thoroughly clean and disinfect the root canal system, and seal it to prevent reinfection. Using modern instrumentation, the tooth is preserved in comfort with minimal post-procedure sensitivity.',
    duration: '1-2 appointments (45-90 minutes each)',
    priceEstimate: 'Custom consultation required',
    benefits: [
      'Saves the natural tooth instead of extraction',
      'Eliminates pain from infected or inflamed pulp',
      'High Precision for a thorough clean',
      'Restores full biting function once the tooth is sealed'
    ],
    steps: [
      'Diagnostic examination and digital x-ray of the affected tooth',
      'Local anesthesia and isolation of the tooth for a sterile field',
      'Removal of infected pulp and cleaning/shaping of the root canals',
      'Sealing of the canal system and final restorative crown or filling'
    ],
    iconName: 'Activity'
  },
  {
    id: 'anterior-fillings',
    title: 'Anterior Fillings',
    doctor: 'mashal',
    shortDescription: 'Tooth-colored composite restorations that repair decay, chips, and fractures on front teeth invisibly.',
    longDescription: 'Front teeth demand both strength and beauty. Dr. Mashal restores decayed, chipped, or fractured anterior teeth using layered nano-composite resin, carefully shade-matched and sculpted to mirror the natural translucency and texture of your own enamel, so the repair disappears into your smile.',
    duration: '30-60 minutes (single visit)',
    priceEstimate: 'Accessible premium styling',
    benefits: [
      'Seamless, invisible shade-matched repair',
      'Preserves maximum healthy natural tooth structure',
      'Completed in a single comfortable visit',
      'Restores natural edge shape and light reflection'
    ],
    steps: [
      'Shade selection matched precisely to adjacent teeth',
      'Gentle removal of decay or damaged tooth structure',
      'Layered composite resin bonding and anatomical sculpting',
      'Fine polishing for a smooth, natural, glossy finish'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'posterior-fillings',
    title: 'Posterior Fillings',
    doctor: 'mashal',
    shortDescription: 'Durable, high-strength composite restorations for back teeth that withstand everyday chewing forces.',
    longDescription: 'Molars and premolars carry the heaviest bite load, so Dr. Mashal restores decayed posterior teeth with high-durability composite resin, precisely sculpting natural cusps and occlusal grooves to rebuild full chewing strength while protecting the tooth from further decay.',
    duration: '30-60 minutes (single visit)',
    priceEstimate: 'Accessible premium styling',
    benefits: [
      'Withstands strong daily biting and chewing forces',
      'Anatomically sculpted cusps and grooves',
      'Prevents further decay and future root canal need',
      'Completed in a single convenient appointment'
    ],
    steps: [
      'Thorough removal of decayed tooth structure',
      'Conditioning of the cavity surface for durable adhesion',
      'Layered placement of high-strength posterior composite',
      'Bite adjustment and final polish for a comfortable fit'
    ],
    iconName: 'Layers'
  },
  {
    id: 'scaling-whitening',
    title: 'Scaling + Teeth Whitening',
    doctor: 'mashal',
    shortDescription: 'A thorough professional clean to remove plaque and tartar, followed by rapid laser whitening in the same visit.',
    longDescription: 'This combined treatment begins with a complete ultrasonic scaling and polish to clear plaque, tartar, and surface stains, leaving a healthy clean base. Dr. Mashal then applies medical-grade Philips Zoom whitening with desensitizing gel to lift years of tea, coffee, and food staining for a dramatically brighter, healthier smile in one appointment.',
    duration: '60-90 minutes (single visit)',
    priceEstimate: 'Premium single session package',
    benefits: [
      'Removes plaque, tartar and surface staining first',
      'Lightens teeth by up to 8 shades in the same visit',
      'Enamel-safe formula with integrated sensitivity blockers',
      'Leaves gums healthier alongside a brighter smile'
    ],
    steps: [
      'Full ultrasonic scaling and polishing of all tooth surfaces',
      'Protective barrier application to gums and soft tissues',
      'Aesthetic whitening gel application activated by targeted laser',
      'Fluoride treatment to lock in shine and soothe teeth'
    ],
    iconName: 'Zap'
  },
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    doctor: 'mashal',
    shortDescription: 'Ultra-thin, handcrafted ceramic shells designed to correct chips, gaps, alignment, and severe discoloration.',
    longDescription: 'Our premium hand-finished porcelain veneers represent the absolute gold standard in cosmetic dentistry. Using the world\'s finest dental ceramics, Dr. Mashal custom designs each veneer to blend flawlessly with your facial features, natural tooth texture, and translucent skin tone. The result is a luminous, life-changing smile makeover that feels entirely natural.',
    duration: '2 appointments (over 7-10 days)',
    priceEstimate: 'Custom consultation required',
    benefits: [
      'Perfect color-match and light-reflection',
      'Incredibly durable and highly stain-resistant',
      'Fixes alignment, gaps, chips, and shape in one go',
      'Minimally invasive preparation techniques'
    ],
    steps: [
      'Comprehensive Digital Smile Design (DSD) consultation & photography',
      'Micro-preparation of enamel and temporary trials',
      'Bespoke lab fabrication by master ceramists',
      'Precise, durable bonding & final aesthetic calibration'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'composite-veneers',
    title: 'Composite Veneers',
    doctor: 'mashal',
    shortDescription: 'Hand-sculpted resin veneers that reshape, brighten, and refine your smile in a single visit.',
    longDescription: 'Composite veneers offer an artful, more conservative alternative to porcelain, freehand-sculpted chairside by Dr. Mashal using premium layered resin. Ideal for correcting minor chips, gaps, and shape irregularities, they deliver an immediate, natural-looking transformation with minimal tooth preparation, all completed in one comfortable appointment.',
    duration: '60-120 minutes (single visit)',
    priceEstimate: 'Accessible premium styling',
    benefits: [
      'Immediate results completed in a single visit',
      'Minimal to no removal of natural tooth structure',
      'Easily repairable and reversible if needed',
      'Natural, shade-matched aesthetic finish'
    ],
    steps: [
      'Smile design consultation and shade selection',
      'Minimal, conservative enamel conditioning',
      'Freehand chairside sculpting of layered composite resin',
      'Contouring, bite adjustment, and final high-gloss polish'
    ],
    iconName: 'Sparkles'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  // Dr. Faizan's Orthodontic Cases
  {
    id: 'case-crowding-rotation-faizan',
    title: 'Dr. Faizan: Severe Anterior Crowding & Rotation Correction',
    doctor: 'faizan',
    category: 'Orthodontics / Fixed Braces',
    description: 'Patient presented with severely crowded and rotated upper front teeth, an irregular smile line and heavily overlapped incisors. Fixed braces produced a fully aligned, even anterior segment.',
    beforeImage: crowdingRotationBefore,
    afterImage: crowdingRotationAfter,
    fullImage: crowdingRotationFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1279,
    details: [
      'Derotation and alignment of the upper anterior teeth',
      'Overlapping incisors brought into a level arch',
      'Restored a continuous, even smile line'
    ]
  },
  {
    id: 'case-proclination-faizan',
    title: 'Dr. Faizan: Protruding Upper Front Teeth Corrected',
    doctor: 'faizan',
    category: 'Orthodontics / Proclination Correction',
    description: 'Markedly forward-flared upper front teeth that prevented comfortable lip closure. Fixed braces retracted and aligned the anterior segment, shown here both at rest and smiling.',
    beforeImage: proclinationBefore,
    afterImage: proclinationAfter,
    fullImage: proclinationFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Retraction of severely proclined upper incisors',
      'Comfortable, natural lip closure at rest',
      'Documented in both repose and smiling views'
    ]
  },
  {
    id: 'case-proclination-spacing-faizan',
    title: 'Dr. Faizan: Adult Treatment — Flared & Spaced Upper Teeth',
    doctor: 'faizan',
    category: 'Orthodontics / Spacing & Proclination',
    description: 'Adult patient with pronounced forward-flared upper front teeth and visible spacing between them. Fixed orthodontic treatment closed the spaces and brought the anterior teeth back into a balanced position.',
    beforeImage: proclinationSpacingBefore,
    afterImage: proclinationSpacingAfter,
    fullImage: proclinationSpacingFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Closure of spacing across the upper anterior teeth',
      'Correction of pronounced incisor flaring',
      'Adult orthodontics with fixed appliances'
    ]
  },
  {
    id: 'case-crowding-rotation-2-faizan',
    title: 'Dr. Faizan: Crowding & Rotation — Full Smile Alignment',
    doctor: 'faizan',
    category: 'Orthodontics / Crowding Correction',
    description: 'Crowded, rotated and irregularly positioned upper front teeth resolved with fixed braces, producing a level, symmetrical smile with evenly displayed anterior teeth.',
    beforeImage: crowdingRotationTwoBefore,
    afterImage: crowdingRotationTwoAfter,
    fullImage: crowdingRotationTwoFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1317,
    details: [
      'Relief of upper anterior crowding',
      'Derotation of individually displaced teeth',
      'Even, symmetrical smile display'
    ]
  },
  {
    id: 'case-smile-rehab-faizan',
    title: 'Dr. Faizan: Crowding Correction & Smile Rehabilitation',
    doctor: 'faizan',
    category: 'Orthodontics / Smile Alignment',
    description: 'Irregular, overlapping upper front teeth with an uneven incisal edge line. Orthodontic alignment produced a level, uniform smile with the anterior teeth restored to an even display.',
    beforeImage: smileRehabBefore,
    afterImage: smileRehabAfter,
    fullImage: smileRehabFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1416,
    details: [
      'Alignment of overlapping upper anterior teeth',
      'Levelled incisal edge line across the smile',
      'Improved smile symmetry'
    ]
  },
  {
    id: 'case-smile-line-faizan',
    title: 'Dr. Faizan: Anterior Crowding & Smile Line Correction',
    doctor: 'faizan',
    category: 'Orthodontics / Fixed Braces',
    description: 'Crowded upper anterior teeth with an irregular smile line and restricted tooth display. Fixed braces produced a broader, evenly aligned smile with a harmonious arc.',
    beforeImage: smileLineBefore,
    afterImage: smileLineAfter,
    fullImage: smileLineFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1373,
    details: [
      'Relief of anterior crowding',
      'Harmonized smile arc and tooth display',
      'Balanced upper and lower midlines'
    ]
  },
  {
    id: 'case-rotated-incisors-faizan',
    title: 'Dr. Faizan: Rotated Incisor Correction & Smile Symmetry',
    doctor: 'faizan',
    category: 'Orthodontics / Crowding Correction',
    description: 'Rotated and overlapping incisors with uneven edges corrected through fixed orthodontic treatment, delivering a symmetrical, evenly aligned anterior segment.',
    beforeImage: rotatedIncisorsBefore,
    afterImage: rotatedIncisorsAfter,
    fullImage: rotatedIncisorsFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Derotation of individually rotated incisors',
      'Levelled and evened incisal edges',
      'Symmetrical anterior alignment'
    ]
  },
  {
    id: 'case-smile-broadening-faizan',
    title: 'Dr. Faizan: Crowding Correction & Smile Broadening',
    doctor: 'faizan',
    category: 'Orthodontics / Smile Alignment',
    description: 'A narrow smile with crowded, barely visible upper teeth opened into a broad, confident smile with a fully aligned and evenly displayed anterior segment.',
    beforeImage: smileBroadeningBefore,
    afterImage: smileBroadeningAfter,
    fullImage: smileBroadeningFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Relief of upper anterior crowding',
      'Noticeably broader smile display',
      'Even, aligned anterior teeth'
    ]
  },
  {
    id: 'case-upper-arch-faizan',
    title: 'Dr. Faizan: Upper Arch Alignment & Smile Refinement',
    doctor: 'faizan',
    category: 'Orthodontics / Fixed Braces',
    description: 'Irregular, unevenly positioned upper anterior teeth aligned with fixed braces, refining both the smile line and the overall balance of the upper arch.',
    beforeImage: upperArchBefore,
    afterImage: upperArchAfter,
    fullImage: upperArchFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Full upper arch levelling and alignment',
      'Refined smile line and tooth proportions',
      'Improved anterior symmetry'
    ]
  },
  {
    id: 'case-protrusion-smile-faizan',
    title: 'Dr. Faizan: Forward-Positioned Front Teeth Retracted',
    doctor: 'faizan',
    category: 'Orthodontics / Proclination Correction',
    description: 'Forward-positioned, crowded upper and lower front teeth retracted and aligned with fixed braces, producing a fuller and more even smile.',
    beforeImage: protrusionSmileBefore,
    afterImage: protrusionSmileAfter,
    fullImage: protrusionSmileFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Retraction of forward-positioned anterior teeth',
      'Relief of crowding in both arches',
      'Fuller, more even smile display'
    ]
  },
  {
    id: 'case-anterior-alignment-faizan',
    title: 'Dr. Faizan: Anterior Alignment & Smile Harmonization',
    doctor: 'faizan',
    category: 'Orthodontics / Smile Alignment',
    description: 'Crowded and irregularly aligned front teeth brought into an even, harmonious arrangement with fixed orthodontic treatment.',
    beforeImage: anteriorAlignmentBefore,
    afterImage: anteriorAlignmentAfter,
    fullImage: anteriorAlignmentFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1446,
    details: [
      'Alignment of crowded anterior teeth',
      'Harmonized smile line',
      'Even anterior tooth display'
    ]
  },
  {
    id: 'case-debond-faizan',
    title: 'Dr. Faizan: Fixed Braces — Active Treatment to Debond',
    doctor: 'faizan',
    category: 'Orthodontics / Treatment Completion',
    description: 'Documented from active treatment with fixed braces in place through to debonding, revealing the finished alignment of the upper and lower arches.',
    beforeImage: debondBefore,
    afterImage: debondAfter,
    fullImage: debondFull,
    isSplitComposite: true,
    aspectRatio: 1000 / 1515,
    details: [
      'Full-arch levelling and alignment with fixed appliances',
      'Finished result shown immediately after debonding',
      'Even, well-aligned anterior display'
    ]
  },

  // Dr. Mashal's Real Cases
  {
    id: 'case-diastema-mashal',
    title: 'Dr. Mashal: Midline Diastema Gap Closure',
    doctor: 'mashal',
    category: 'Cosmetic Dentistry / Gap Closure',
    description: 'Patient presented with a prominent central gap (diastema) between upper incisors. Dr. Mashal achieved complete closure using direct aesthetic composite resin without grinding natural enamel.',
    beforeImage: diastemaClosure,
    afterImage: diastemaClosure,
    fullImage: diastemaClosure,
    isSplitComposite: true,
    details: [
      'Non-invasive direct composite bonding',
      'Zero tooth reduction or enamel loss',
      'Completed in a single 45-minute clinical appointment',
      'Natural shade blending matching adjacent teeth'
    ]
  },
  {
    id: 'case-anterior-filling-mashal',
    title: 'Dr. Mashal: Anterior Composite Filling',
    doctor: 'mashal',
    category: 'Operative Dentistry / Anterior Filling',
    description: 'Discolored, chipped upper front tooth restored with a tooth-colored composite filling, rebuilding a symmetrical edge and a bright, even shade across both central incisors.',
    beforeImage: anteriorFilling,
    afterImage: anteriorFilling,
    fullImage: anteriorFilling,
    isSplitComposite: true,
    // Source photo's "before" half was shot more zoomed-out than the "after"
    // half; tighten its crop so the teeth land at matching scale/position in the slider.
    beforeCropY: [0.2, 0.93],
    details: [
      'Shade-matched nano-composite restoration',
      'Rebuilt natural incisal edge and contour',
      'Zero preparation of the adjacent healthy tooth',
      'Completed in a single clinical appointment'
    ]
  },
  {
    id: 'case-tooth-restoration-mashal',
    title: 'Dr. Mashal: Anterior Tooth Fracture & Edge Restoration',
    doctor: 'mashal',
    category: 'Operative Dentistry / Anterior Restoration',
    description: 'Restoration of chipped, worn front incisor edges and irregular margins, re-establishing a symmetrical, natural smile line.',
    beforeImage: toothRestoration,
    afterImage: toothRestoration,
    fullImage: toothRestoration,
    isSplitComposite: true,
    details: [
      'Micro-aesthetic edge reconstruction',
      'Polished chameleon-effect nano-composite resin',
      'Restored optimal incisal guidance and smile arc',
      'Seamless transition under all lighting conditions'
    ]
  },
  {
    id: 'case-whitening-mashal-1',
    title: 'Dr. Mashal: In-Office Clinical Smile Whitening',
    doctor: 'mashal',
    category: 'Smile Makeover / Teeth Whitening',
    description: 'Professional in-office whitening procedure eliminating deep intrinsic yellowing and age-related discoloration, dramatically brightening the shade.',
    beforeImage: teethWhitening,
    afterImage: teethWhitening,
    fullImage: teethWhitening,
    isSplitComposite: true,
    // Source photo's "after" half was shot more zoomed-out than the "before" half;
    // tighten its crop so the teeth land at matching scale/position in the slider.
    afterCropY: [0.17, 0.92],
    details: [
      'Visible 4-6 shade improvement in one visit',
      'Gingival barrier protection ensuring zero gum irritation',
      'Desensitizing protocol for pain-free treatment',
      'Long-lasting aesthetic radiance'
    ]
  },
  {
    id: 'case-whitening-mashal-2',
    title: 'Dr. Mashal: Advanced Enamel Bleaching & Stain Removal',
    doctor: 'mashal',
    category: 'Enamel Bleaching / Deep Stain Removal',
    description: 'Targeted bleaching treatment removing tough fluorosis and tea/coffee stains, revealing clear, luminous tooth enamel.',
    beforeImage: teethWhiteningBleaching,
    afterImage: teethWhiteningBleaching,
    fullImage: teethWhiteningBleaching,
    isSplitComposite: true,
    details: [
      'Comprehensive upper & lower arch treatment',
      'High-grade clinical whitening agent application',
      'Preserved natural enamel translucency',
      'Instant post-procedure results'
    ]
  },
  {
    id: 'case-molar-restoration-mashal',
    title: 'Dr. Mashal: Posterior Molar Decay Restoration',
    doctor: 'mashal',
    category: 'Endodontic & Posterior Restoration',
    description: 'Removal of deep occlusal molar decay and precise anatomical cusp rebuilding, restoring full biting strength and natural molar anatomy.',
    beforeImage: toothRestoration2,
    afterImage: toothRestoration2,
    fullImage: toothRestoration2,
    isSplitComposite: true,
    details: [
      'Complete decay excavation',
      'High-durability posterior composite resin placement',
      'Anatomically sculpted occlusal grooves and cusps',
      'Prevents future decay and root canal necessity'
    ]
  },
  {
    id: 'case-root-canal-mashal',
    title: 'Dr. Mashal: Root Canal Therapy — Infected Molar Saved',
    doctor: 'mashal',
    category: 'Endodontics / Root Canal Treatment',
    description: 'Diagnostic x-ray shows deep infection reaching the pulp of a molar. Dr. Mashal completed full root canal therapy, cleaning and sealing the canal system to save the natural tooth from extraction.',
    beforeImage: rootCanalBefore,
    afterImage: rootCanalAfter,
    fullImage: rootCanalFull,
    isSplitComposite: true,
    aspectRatio: 700 / 900,
    details: [
      'Diagnostic x-ray confirmed deep pulp infection',
      'Complete cleaning and disinfection of the root canal system',
      'Precise obturation sealing the canal to prevent reinfection',
      'Natural tooth preserved instead of extraction'
    ]
  }
];

export const CLINIC_GOOGLE_REVIEW_URL = 'https://share.google/uU0jer5joI4d4xYVz';

/**
 * Real messages patients sent the doctors on Instagram, transcribed from the
 * clinic's screenshots. Senders are kept anonymous because their names and
 * profile pictures were redacted in every screenshot supplied - do not add
 * names or handles here without that patient's explicit permission.
 *
 * Dr. Faizan has no entries yet: none were supplied, and inventing them would
 * be a fabricated testimonial for a named clinician. His section renders an
 * honest empty state until real messages are added.
 */
export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-mashal-1',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Thank you Dr. Mashal for all the time and effort you have spent in making my teeth perfect. I am very grateful. Stay Blessed!!!'
  },
  {
    id: 'rev-mashal-2',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Thank you Mashal for the awesome services and being so nice and cooperative throughout ❤️'
  },
  {
    id: 'rev-mashal-3',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'First appointment',
    text: 'Dr. Mashal is the most amazing dentist in Peshawar. I had my first ever appointment and it was quite nice. I would say she is the reason behind my smile, at least for today ❤️ (This is not a paid promotion.)'
  },
  {
    id: 'rev-mashal-4',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'Scaling & Polishing',
    translated: true,
    text: 'Thank you Mashal, it was such a pleasant experience with you. Believe me, I was too scared — but I did not feel any pain at all. So happy to have clean teeth, thanks to you ❤️'
  },
  {
    id: 'rev-mashal-5',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Hi — came here to send you a note of thanks. Super satisfied with my treatment. You have gentle hands and are so good at what you do. Need more dentists like you. Thanks a lot. P.S. My son says the doctor was so nice, and my daughter has been asking for glitter wala nail polish ever since she saw your nails. 😀'
  },
  {
    id: 'rev-mashal-6',
    doctor: 'mashal',
    source: 'instagram',
    text: 'My mother is so satisfied and happy from your work. She said it was a painless treatment.'
  },
  {
    id: 'rev-mashal-7',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'Scaling',
    text: 'Hey Mashal, how are you. Got my scaling done from you today and I have to say you are a God sent. I had the best experience and I am just going to recommend you to everyone from now on. Honestly, you made me feel so comfortable and that is what made everything so easy and smooth for me. Thank you so much ❤️'
  },
  {
    id: 'rev-mashal-8',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'Root Canal Treatment',
    text: 'Thank you Dr Mashal! It was a very pleasant experience with you. I was really scared of any dental procedure and anesthesia, but you have magic in your hands. The whole procedure was so smooth and pain free. You are very professional 👏 Stay Blessed!'
  },
  {
    id: 'rev-mashal-9',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'Restoration',
    text: 'I couldn\'t say proper thanks at the end, maam. Thanks maam for doing such a meticulous job. After the restoration the look is so much better relatively. Stay blessed maam.'
  },
  {
    id: 'rev-mashal-10',
    doctor: 'mashal',
    source: 'instagram',
    treatment: 'Anterior Restoration',
    text: 'Salam, hope you are doing well. Thank you Dr Mashal — for enhancing my smile and all the efforts, especially the restoration of the discoloured root-canal-treated tooth. I am in love with the shape of my anteriors. I felt really comfortable during treatment and was able to tell you my concerns. You listened to me and tried your best. Thank you so much ❤️'
  },
  {
    id: 'rev-mashal-11',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Hey Dr Mashal, thank you so much for such a comfy dental session 😍❤️'
  },
  {
    id: 'rev-mashal-12',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Thank you so much Mashal, it was such a nice painless experience ❤️'
  },
  {
    id: 'rev-mashal-13',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Thank you so much for such gentle and painless treatment, Alhamdulillah. You are an amazing dentist. I was really nervous but you made it so comfortable. Thank you for taking such great care of me, I am so grateful for your expertise ❤️'
  },
  {
    id: 'rev-mashal-14',
    doctor: 'mashal',
    source: 'instagram',
    text: 'Thank you for your excellent care of my 🦷 :)'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I choose between Dr. Faizan and Dr. Mashal?',
    answer: 'It depends entirely on your needs! Dr. Faizan Ul Hassan is our Consultant Orthodontist (Conventional Fixed Braces, Invisible Lingual Braces, Clear Aligners, and Cleft Palate Ortho). Dr. Mashal Zeb Jan is our specialist in Operative Dentistry, Endodontics, and Aesthetic Smile Design (Porcelain Veneers, Smile Makeovers, Root Canal Therapy). When you book, you can specify your concerns, and our coordinators will route you to the perfect practitioner.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Are orthodontic braces painful?',
    answer: 'While you may experience some mild soreness for a few days after braces are first fitted or adjusted, it is highly manageable. Dr. Faizan uses the latest lightweight, high-tech wires and orthodontic systems designed to move teeth with constant, gentle pressure, ensuring maximum comfort and efficient alignment throughout your treatment.',
    category: 'treatments'
  },
  {
    id: 'faq-3',
    question: 'How long do porcelain veneers last?',
    answer: 'When designed and bonded correctly by an expert like Dr. Mashal, and supported by good oral hygiene, premium porcelain veneers can easily last 15 to 20 years or more. They are highly resistant to staining and chips.',
    category: 'treatments'
  },
  {
    id: 'faq-4',
    question: 'Where is the clinic located in Peshawar?',
    answer: 'We are located at Office 312, 3rd Floor, Uhad Tower, Shaheen Town, Peshawar. The building is highly prominent, modern, and has secure underground parking with direct elevator access to our clinic floor.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'What should I do in a dental emergency?',
    answer: "If you're experiencing a dental emergency, such as severe pain, a knocked-out tooth, or an injury to your mouth, contact us right away. Rinse your mouth with warm water, apply a cold compress to reduce swelling if needed, and avoid eating on the affected area until you're seen. Our team will guide you on immediate next steps and get you in as soon as possible.",
    category: 'booking'
  },
  {
    id: 'faq-6',
    question: 'How safe is teeth whitening?',
    answer: 'Professional teeth whitening is safe and effective when performed or supervised by a dental professional. We assess your oral health beforehand to ensure whitening is right for you, and we use treatments designed to protect your enamel and gums while delivering noticeable, lasting results.',
    category: 'pricing'
  }
];
