export interface PersonaData {
  name: string;
  age: number;
  location: string;
  tagline: string;
  archetype: string;
  coreMission: string;
  visualIdentity: {
    faceDescription: string;
    clothingStyle: string;
    atmosphere: string;
    colorPalette: { name: string; hex: string; desc: string }[];
    midjourneyMasterPrompt: string;
    fluxPrompt: string;
    elevenLabsVoicePreset: {
      name: string;
      timbre: string;
      speed: string;
      stability: string;
      styleExaggeration: string;
      sampleText: string;
    };
  };
  toneOfVoice: {
    doRules: string[];
    dontRules: string[];
    signaturePhrases: string[];
    greetings: string[];
    closings: string[];
  };
  contentPillars: {
    title: string;
    percentage: number;
    description: string;
    examples: string[];
    icon: string;
  }[];
}

export interface InstagramBioOption {
  id: string;
  name: string;
  targetFocus: string;
  line1: string;
  line2: string;
  line3: string;
  cta: string;
  linkText: string;
}

export interface HighlightStory {
  title: string;
  coverIcon: string;
  slidesCount: number;
  description: string;
  slides: {
    stepNumber: number;
    title: string;
    text: string;
    visualTip: string;
    interactiveElement?: string;
  }[];
}

export interface InstagramPost {
  id: string;
  type: "reels" | "carousel" | "single";
  thumbnail: string;
  title: string;
  category: string;
  viewsOrLikes: string;
  caption: string;
  slides?: string[];
  hook: string;
  cta: string;
  midjourneyPrompt: string;
}

export interface InfoproductConcept {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  targetAudience: string;
  coreProblem: string;
  solution: string;
  format: string;
  tripwirePrice: number;
  mainOfferPrice: number;
  leadMagnet: {
    title: string;
    hook: string;
    format: string;
  };
  modules: {
    title: string;
    lessons: string[];
    outcome: string;
  }[];
  bonuses: string[];
  salesLetterHook: string;
  salesPitchBullets: string[];
}

export interface ReelsScript {
  id: string;
  title: string;
  category: string;
  hook: string;
  duration: string;
  estimatedViews: string;
  shotList: {
    timestamp: string;
    visualAction: string;
    voiceoverText: string;
    onScreenText: string;
    aiPromptTip: string;
  }[];
  ctaTriggerWord: string;
  funnelAction: string;
}

export interface TechStep {
  stepNumber: number;
  title: string;
  toolName: string;
  toolUrl: string;
  badge: string;
  actionSummary: string;
  detailedInstructions: string[];
  proTips: string[];
  costEstimate: string;
}

export interface GoogleAiPromptPack {
  imagen3Prompts: {
    id: string;
    title: string;
    category: "portrait" | "lifestyle" | "macro" | "nature" | "banya";
    aspectRatio: "4:5" | "9:16" | "1:1" | "16:9";
    prompt: string;
    negativePrompt?: string;
    description: string;
    recommendedSettings: string;
  }[];
  veo2VideoPrompts: {
    id: string;
    title: string;
    duration: string;
    cameraMotion: string;
    prompt: string;
    visualAtmosphere: string;
    usage: string;
  }[];
  geminiSystemPrompts: {
    id: string;
    title: string;
    role: string;
    modelRecommended: string;
    systemInstruction: string;
    sampleUserQuery: string;
    expectedResponseSummary: string;
  }[];
  notebookLmPacks: {
    id: string;
    title: string;
    targetCourse: string;
    sourceDocumentSummary: string;
    fullKnowledgeSourceText: string;
    readyPrompts: {
      action: string;
      prompt: string;
      expectedOutput: string;
    }[];
  }[];
  googleTtsVoiceConfig: {
    voiceModel: string;
    languageCode: string;
    speakingRate: number;
    pitch: string;
    ssmlSample: string;
    instructions: string[];
  };
}
