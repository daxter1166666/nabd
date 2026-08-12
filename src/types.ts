export interface User {
  id: string;
  name: string;
  email: string; // Stored securely, kept private
  avatar: string;
  bio?: string;
  joinedDate: string;
  isFounder?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  questionPrompt: string; // e.g. "ماذا تقول لمرضى السرطان؟"
  description: string;
  hashtag: string; // e.g. "#تبرع_لمرضى_السرطان"
  category: 'cancer' | 'elderly' | 'autism' | 'orphans' | 'prisoners' | 'hospitals' | 'general';
  coverImage: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  donationsCount: number;
  totalLikesCount: number;
  organizerName: string;
}

export interface AudioMessage {
  id: string;
  campaignId: string;
  campaignTitle: string;
  hashtag: string;
  donorId: string;
  donorName: string;
  donorAvatar: string;
  audioUrl?: string; // Blob URL or audio data
  audioBlob?: Blob;
  durationSeconds: number;
  likesCount: number;
  isLikedByCurrentUser?: boolean;
  createdAt: string;
  transcriptText?: string; // Optional text transcript or message summary
  category: string;
  audioSynthesizedKey?: string; // Fallback audio synth seed
}

export interface HashtagCategory {
  tag: string;
  label: string;
  count: number;
  iconName: string;
  color: string;
}

export interface AdBanner {
  id: string;
  title: string;
  sponsorName: string;
  imageUrl: string;
  targetUrl: string;
  position: 'top' | 'feed' | 'search' | 'profile' | 'bottom_sticky';
  isActive: boolean;
  clicksCount: number;
  viewsCount: number;
  badgeText?: string;
}

export type NavTab = 'feed' | 'search' | 'record' | 'profile' | 'admin';

