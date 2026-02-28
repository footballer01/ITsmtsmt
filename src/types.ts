export interface Language {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Data Science' | 'Systems' | 'Other';
  description: string;
}

export interface Lesson {
  step: number;
  title: string;
  content: string;
  codeTemplate: string;
  expectedOutput?: string;
}

export interface ITTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
}
