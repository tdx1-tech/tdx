/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DoctorType = 'mashal' | 'faizan';

export interface Doctor {
  id: DoctorType;
  name: string;
  fullName: string;
  title: string;
  specialties: string[];
  bio: string;
  detailedBio: string;
  education: string[];
  languages: string[];
  image: string;
  whatsappNumber: string;
  phoneNumber: string;
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
  details: string[];
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  text: string;
  avatarUrl: string;
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
