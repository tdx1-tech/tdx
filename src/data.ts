/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Service, CaseStudy, GoogleReview, FAQItem } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: 'mashal',
    name: 'Dr. Mashal Zeb Jan',
    fullName: 'Dr. Mashal Zeb Jan',
    title: "Pakistan's Youngest FCPS Specialist in Operative Dentistry & Endodontics",
    specialties: ['Microscopic Root Canal Therapy', 'Porcelain Veneers', 'Smile Design', 'Aesthetic Restorations', 'Dental Bonding', 'FCPS (Operative Dentistry and Endodontics)'],
    bio: 'Expert root canal and restorative dental care - from a consultant who set the standard before most had even begun.',
    detailedBio: 'Dr. Mashal Zeb Jan is a specialist in Operative Dentistry and Endodontics, holding the prestigious FCPS qualification awarded by the College of Physicians and Surgeons Pakistan. She is the first resident of Rehman College of Dentistry to clear FCPS Part II, and the youngest consultant in her specialty to pass the examination in Pakistan - clearing it on her first attempt. She brings that same standard of precision and commitment to every patient she treats.',
    education: [
      'BDS, FCPS (Operative Dentistry & Endodontics)'
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
    image: '/src/assets/images/Dr Mashal.webp',
    whatsappNumber: '+923165944327',
    phoneNumber: '+923165944327'
  },
  {
    id: 'faizan',
    name: 'Dr. Faizan Ul Hassan',
    fullName: 'Dr. Faizan Ul Hassan',
    title: 'Consultant Orthodontist & Department Lead',
    specialties: ['Conventional Fixed Orthodontics', 'Lingual Orthodontics', 'Cleft Lip and Palate Intervention', 'Surgical and Accelerated Orthodontics', 'Smile Makeovers', 'BDS, FCPS (Orthodontics)'],
    bio: 'Dr. Faizan is a dedicated orthodontist and educator who has personally treated over 550 patients with fixed braces and supervised thousands of treatments. He specializes in advanced fixed, lingual, and surgical alignments.',
    detailedBio: 'Dr. Faizan ul Hassan is a dedicated and accomplished orthodontist at the RCD\'s Department of Orthodontics. He graduated from Khyber College of Dentistry (KCD) in 2013 and pursued his passion for orthodontics, completing his fellowship and clearing FCPS part 2 in 2018, becoming one of the youngest fellows in the field.\n\nDr. Hassan has personally treated over 550 patients with fixed braces and supervised the treatment of thousands under the care of postgraduate residents. As an educator, he has conducted four national workshops for postgraduate orthodontic residents as the Principal Facilitator and two as an Associate Facilitator. His research expertise is evident in his publication record, with 11 articles covering a range of topics.\n\nDr. Hassan teaches final-year orthodontics, sharing his expertise and inspiring the next generation of dental professionals. His commitment to excellence in clinical practice, education, and research makes him a valuable asset to our institution.',
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
    image: '/src/assets/images/Faizan.webp',
    whatsappNumber: '+923439591498',
    phoneNumber: '+923165944327'
  }
];

export const SERVICES: Service[] = [
  // Dr. Mashal's Services
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
    id: 'smile-makeover',
    title: 'Signature Smile Makeover',
    doctor: 'mashal',
    shortDescription: 'A complete, customized aesthetic transformation combining multiple treatments for a harmonious, radiant look.',
    longDescription: 'The Dental Experience\'s Signature Smile Makeover is a comprehensive aesthetic rehabilitation. Dr. Mashal combines digital photography, facial-mapping, and a holistic design process to evaluate your gums, lips, and teeth. Whether combining veneers, aesthetic crowns, or subtle contouring, we sculpt a balanced, beautiful, and self-assured appearance.',
    duration: '2-4 weeks',
    priceEstimate: 'Bespoke pricing based on design',
    benefits: [
      'Engineered to harmonize with your unique facial geometry',
      'Boosts professional and personal self-confidence',
      'Resolves structural and cosmetic issues simultaneously',
      'Includes 3D visual preview before treatment begins'
    ],
    steps: [
      '3D digital mapping and photogrammetry of your facial movements',
      'Visual mockup creation (try your smile before we touch a tooth)',
      'Coordinated conservative treatment phase',
      'Luminous finish and premium protective nightguard fabrication'
    ],
    iconName: 'Smile'
  },
  {
    id: 'laser-whitening',
    title: 'Laser Teeth Whitening',
    doctor: 'mashal',
    shortDescription: 'Advanced, rapid zoom laser whitening for dramatic brightness in a single comfortable visit.',
    longDescription: 'Dull, stained, or aged teeth are revived in under an hour. Using safe, medical-grade Philips Zoom activation systems and Dr. Mashal\'s carefully formulated desensitizing gels, we lift years of tea, coffee, and food stains. This clinic-only procedure is safe for your enamel and delivers immediate, glowing results.',
    duration: '45-60 minutes',
    priceEstimate: 'Premium single session package',
    benefits: [
      'Lightens teeth by up to 8 shades in one short visit',
      'Enamel-safe formula with integrated sensitivity blockers',
      'Long-lasting brilliance with optional home touch-up kits',
      'Fully supervised by cosmetic dental specialists'
    ],
    steps: [
      'Thorough clinical cleaning and polishing of teeth',
      'Protective barrier application to gums and soft tissues',
      'Aesthetic whitening gel application activated by targeted laser',
      'Fluoride treatment to lock in shine and soothe teeth'
    ],
    iconName: 'Zap'
  },
  {
    id: 'composite-bonding',
    title: 'Cosmetic Composite Bonding',
    doctor: 'mashal',
    shortDescription: 'Surgical-free, immediate restoration of minor chips, spacing, and wear in a single appointment.',
    longDescription: 'For patients looking for swift, spectacular improvements without permanent dental alterations, cosmetic bonding is ideal. Dr. Mashal uses a composite resin layered with artistic precision, mimicking natural dental layers to fill gaps and rebuild broken edges perfectly on the same day.',
    duration: '1-2 hours (single visit)',
    priceEstimate: 'Accessible premium styling',
    benefits: [
      'Requires zero tooth filing or enamel removal',
      'Completed entirely in a single convenient visit',
      'Extremely natural-looking with multi-layered shade matching',
      'Highly cost-effective cosmetic upgrade'
    ],
    steps: [
      'Color mapping with high-definition custom shade guides',
      'Conditioning of the tooth surface for durable adhesion',
      'Artisanal layering and sculpting of premium dental resin',
      'Polishing to a high-gloss, glass-like finish'
    ],
    iconName: 'Layers'
  },

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
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  // Dr. Mashal's Real Cases
  {
    id: 'case-diastema-mashal',
    title: 'Dr. Mashal: Midline Diastema Gap Closure',
    doctor: 'mashal',
    category: 'Cosmetic Dentistry / Gap Closure',
    description: 'Patient presented with a prominent central gap (diastema) between upper incisors. Dr. Mashal achieved complete closure using direct aesthetic composite resin without grinding natural enamel.',
    beforeImage: '/src/assets/images/Cases/Dr Mashal Cases/Diastema closure.jpeg',
    afterImage: '/src/assets/images/Cases/Dr Mashal Cases/Diastema closure.jpeg',
    fullImage: '/src/assets/images/Cases/Dr Mashal Cases/Diastema closure.jpeg',
    isSplitComposite: true,
    details: [
      'Non-invasive direct composite bonding',
      'Zero tooth reduction or enamel loss',
      'Completed in a single 45-minute clinical appointment',
      'Natural shade blending matching adjacent teeth'
    ]
  },
  {
    id: 'case-tooth-restoration-mashal',
    title: 'Dr. Mashal: Anterior Tooth Fracture & Edge Restoration',
    doctor: 'mashal',
    category: 'Operative Dentistry / Anterior Restoration',
    description: 'Restoration of chipped, worn front incisor edges and irregular margins, re-establishing a symmetrical, natural smile line.',
    beforeImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth Restoration.jpeg',
    afterImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth Restoration.jpeg',
    fullImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth Restoration.jpeg',
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
    beforeImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth Whitening.jpeg',
    afterImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth Whitening.jpeg',
    fullImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth Whitening.jpeg',
    isSplitComposite: true,
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
    beforeImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth whitening ( Bleaching ).jpeg',
    afterImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth whitening ( Bleaching ).jpeg',
    fullImage: '/src/assets/images/Cases/Dr Mashal Cases/Teeth whitening ( Bleaching ).jpeg',
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
    beforeImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth restoration (2).jpeg',
    afterImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth restoration (2).jpeg',
    fullImage: '/src/assets/images/Cases/Dr Mashal Cases/Tooth restoration (2).jpeg',
    isSplitComposite: true,
    details: [
      'Complete decay excavation',
      'High-durability posterior composite resin placement',
      'Anatomically sculpted occlusal grooves and cusps',
      'Prevents future decay and root canal necessity'
    ]
  },

  // Dr. Faizan's Orthodontic Cases
  // Dr. Faizan's Real Cases
  {
    id: 'case-braces-faizan',
    title: 'Dr. Faizan: Metal Braces Alignment & Smile Correction',
    doctor: 'faizan',
    category: 'Orthodontics / Fixed Braces',
    description: 'Patient presented with overlapping, uneven front teeth and a compromised smile line. Dr. Faizan achieved a complete, natural smile transformation through precision braces treatment.',
    beforeImage: '/src/assets/images/Cases/Dr Faizan Cases/braces before.png',
    afterImage: '/src/assets/images/Cases/Dr Faizan Cases/Braces after.png',
    isSplitComposite: false,
    details: [
      'Full arch alignment and spacing correction',
      'Improved smile symmetry and bite balance'
    ]
  },
  {
    id: 'case-gap-faizan',
    title: 'Dr. Faizan: Midline Gap Closure & Incisor Alignment',
    doctor: 'faizan',
    category: 'Orthodontics / Gap Closure',
    description: 'Prominent midline gap between central incisors and mild crowding resolved with targeted orthodontic treatment for a confident, gap-free smile.',
    beforeImage: '/src/assets/images/Cases/Dr Faizan Cases/Before 2.png',
    afterImage: '/src/assets/images/Cases/Dr Faizan Cases/after 2.png',
    isSplitComposite: false,
    details: [
      'Closed midline diastema without extractions',
      'Harmonized smile arc with improved gum contour'
    ]
  },
  {
    id: 'case-crown-lengthening-faizan',
    title: 'Dr. Faizan: Esthetic Crown Lengthening — Gummy Smile Correction',
    doctor: 'faizan',
    category: 'Periodontal / Esthetic Crown Lengthening',
    description: 'Patient with excessive gingival display (gummy smile) underwent esthetic crown lengthening to expose a greater proportion of the tooth crowns, producing a balanced, proportionate smile.',
    beforeImage: '/src/assets/images/Cases/Dr Faizan Cases/Esthetic Crown Lengthening BEFORE.png',
    afterImage: '/src/assets/images/Cases/Dr Faizan Cases/Esthetic Crown Lengthening AFTER.png',
    isSplitComposite: false,
    details: [
      'Reduced gingival display for a balanced smile',
      'Exposed full crown length for proportionate teeth'
    ]
  }
];

export const CLINIC_GOOGLE_REVIEW_URL = 'https://maps.google.com/?q=The+Dental+Experience+Peshawar';

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Asad Khan',
    rating: 5,
    timeAgo: '1 week ago',
    text: 'Dr. Mashal Zeb Jan is literally an artist. I got 8 porcelain veneers done, and they completely transformed my confidence. The process was explained step-by-step. The clinic inside looks like a 7-star hotel, very comfortable and premium. Highly recommended!',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-2',
    author: 'Sania Shah',
    rating: 5,
    timeAgo: '3 weeks ago',
    text: 'I was extremely self-conscious about my crooked teeth, but Dr. Faizan Ul Hassan was wonderful. He treated me with aesthetic ceramic braces, and the progress was incredibly fast. He has the best orthodontic skills in Peshawar. Thank you so much!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-3',
    author: 'Dr. Bilal Yousafzai',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'As a medical professional myself, I am very critical of sterile environments and technology. The Dental Experience is exceptional. They have state-of-the-art tools, extreme hygiene standards, and both doctors are top of their fields. Excellent service in Peshawar.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-4',
    author: 'Palwasha Afridi',
    rating: 5,
    timeAgo: '2 months ago',
    text: 'Had an amazing smile design session with Dr. Mashal. The 3D preview she showed me was exactly what I got! The team is incredibly warm, professional, and the clinic in Shaheen Town is very easy to find with great parking.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I choose between Dr. Mashal and Dr. Faizan?',
    answer: 'It depends entirely on your needs! Dr. Mashal Zeb Jan is our specialist in Operative Dentistry, Endodontics, and Aesthetic Smile Design (Porcelain Veneers, Smile Makeovers, Microscopic Root Canals). Dr. Faizan Ul Hassan is our Consultant Orthodontist (Conventional Fixed Braces, Invisible Lingual Braces, Clear Aligners, and Cleft Palate Ortho). When you book, you can specify your concerns, and our coordinators will route you to the perfect practitioner.',
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
