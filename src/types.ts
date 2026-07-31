/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DoctorType = 'mashal' | 'faizan';

/** A photograph shown in the gallery on a doctor's own profile page. */
export interface DoctorPhoto {
  src: string;
  /** Accessible description of the photo. */
  alt: string;
  /** Short line rendered under the photo in the gallery and lightbox. */
  caption: string;
}

/** Continuing-education course, workshop or hands-on training a doctor took part in. */
export interface DoctorCourse {
  title: string;
  /** Awarding body, faculty or host institution. */
  provider: string;
  year?: string;
  location?: string;
  /** How the doctor took part - attendee by default, or a teaching role. */
  role?: string;
  description?: string;
}

export interface Doctor {
  id: DoctorType;
  /** URL-safe identifier used for the doctor's own page (#/doctors/<slug>). */
  slug: string;
  name: string;
  fullName: string;
  title: string;
  specialties: string[];
  bio: string;
  detailedBio: string;
  education: string[];
  languages: string[];
  image: string;
  /** Gallery shown on the doctor's profile page. `image` stays the lead portrait. */
  photos: DoctorPhoto[];
  courses: DoctorCourse[];
  /** Photos shown beside the courses list - training, workshops, convocation. */
  coursePhotos: DoctorPhoto[];
  whatsappNumber: string;
  phoneNumber: string;
  instagramUrl?: string;
  certs: string[];
  honors: string[];
}

export interface Service {
  id: string;
  title: string;
  doctor: DoctorType;
  shortDescription: string;
  longDescription: string;
  duration: string;
  priceEstimate: string;
  benefits: string[];
  steps: string[];
  iconName: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  doctor: DoctorType;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  fullImage?: string;
  isSplitComposite?: boolean;
  /** Extra vertical crop (fractions 0-1 of that half's height) to correct a before/after zoom mismatch in the source composite photo. */
  beforeCropY?: [number, number];
  afterCropY?: [number, number];
  /**
   * Width/height of the comparison viewport, matched to the case's own photos so
   * they fill it without cropping. Defaults to 4/3, which suits the close-up
   * intraoral shots; the full-face orthodontic cases are portrait.
   */
  aspectRatio?: number;
  details: string[];
}

/**
 * An unsolicited thank-you message a patient sent the doctor on social media.
 *
 * These are not star-rated directory reviews and they carry no patient
 * photography: the clinic holds them only as screenshots with the sender's
 * name and picture redacted. The card layout is built around that - no avatar,
 * no rating, no fabricated timestamp.
 */
export interface PatientReview {
  id: string;
  doctor: DoctorType;
  /** The patient's own words. Spelling normalised for legibility; wording untouched. */
  text: string;
  source: 'instagram' | 'facebook' | 'whatsapp';
  /** Only set where the sender identified themselves and is not a private patient. */
  attribution?: string;
  /** Treatment the message refers to, where the patient named it. */
  treatment?: string;
  /** Set when the quote is translated from Pashto/Urdu, so the card can say so. */
  translated?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatments' | 'booking' | 'pricing';
}

export interface Appointment {
  id: string;
  doctor: DoctorType;
  serviceId: string;
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}
