export interface CaseStudy {
  id: string
  name: string
  blurb: string
  role: string
  status: string
  tech: string[]
  links: {
    live?: string
    github?: string
  }
  screenshot?: string
  stat: { value: string; label: string }
}

export interface DataProject {
  id: string
  title: string
  description: string
  tech: string[]
  stat: string
  links: {
    github?: string
  }
}

export interface TimelineItem {
  id: string
  date: string
  title: string
  organization: string
  description: string
  type: 'education' | 'work' | 'activity'
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface Achievement {
  id: string
  title: string
  organization: string
  description: string
}

export interface NowGroup {
  category: 'Building' | 'Learning' | 'Exploring'
  items: string[]
}
