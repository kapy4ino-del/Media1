export interface ModuleScore {
  score: number;
  reasoning: string[];
  flags: string[];
}

export interface DryFact {
  fact: string;
  context: string;
  source: string;
}

export interface Publication {
  name: string;
  leaning: string;
  reliability: string;
  analysis: string;
  conflictOfInterest: string;
  ownership: {
    model: string;
    analysis: string;
  };
  revenue: {
    model: string[];
    analysis: string;
  };
}

export interface SocialMediaPost {
  platform: string;
  content: string;
}

export interface AuthorScorecard {
  total_score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  color_code: "Green" | "Amber" | "Red";
  summary_analysis: string;
  flags: string[];
}

export interface Author {
  name: string;
  role: string;
  is_agency: boolean;
  leaning: string;
  location_based?: string;
  past_experience?: string[];
  affiliations?: string[];
  analysis: string;
  conflictOfInterest: string;
  expertise: string;
  socialMediaPosts: SocialMediaPost[];
  scorecard?: AuthorScorecard;
}

export type AuthorInfo = Author;

export interface Artifact {
  type: string;
  description: string;
  url: string;
  status: string;
}

export interface CriticalAnalysis {
  summary: string;
  critiques: string[];
  claimsAnalysis: {
    claim: string;
    rebuttal: string;
    rebuttalSource: string;
    rebuttalSourceUrl: string;
  }[];
  logicalFallacies: string[];
  omissions: string[];
}

export interface KeyPerson {
  name: string;
  role?: string;
  scorecard: AuthorScorecard;
}

export interface AnalysisResult {
  v2_scorecard: {
    total_score: number;
    grade: "A" | "B" | "C" | "D" | "F";
    color_code: "Green" | "Amber" | "Red";
    summary_analysis: string;
    module_1: ModuleScore;
    module_2: ModuleScore;
    module_3: ModuleScore;
  };
  dryFacts?: DryFact[];
  publication: Publication;
  author: Author;
  authors?: Author[];
  sourcing: {
    namedSources: number;
    anonymousSources: number;
    analysis: string;
    evidence: string[];
    isSingleSourced: boolean;
    singleSourceAnalysis: string;
  };
  factuality: {
    analysis: string;
    corroboration: { score: number; analysis: string };
    factCheck: { status: string; analysis: string };
    mediaVerification: { status: string; analysis: string };
    retractions?: { hasCorrection: boolean; summary: string };
    corrections?: { hasCorrection: boolean; summary: string };
  };
  summary: {
    keyPoints: string[];
    overallAssessment: string;
    originality: string;
    publicationDate: string;
    emotionalTone: { score: number; analysis: string };
    aiGenerated: { status: string; analysis: string };
  };
  evidence: {
    artifacts: Artifact[];
  };
  criticalAnalysis: CriticalAnalysis;
  keyPeople?: {
    publicationRelated: KeyPerson[];
    articleRelated: KeyPerson[];
  };
  network: {
    publisher: { owner: string; parentCompany: string; affiliations: string[] };
    authors: { name: string; status: string; connectedEntities: string[] }[];
    author: { status: string; connectedEntities: string[] };
  };
}

export type AnalysisReport = AnalysisResult;

export interface GroundingSource {
  title?: string;
  uri: string;
}