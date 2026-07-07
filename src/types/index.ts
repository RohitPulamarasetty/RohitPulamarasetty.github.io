export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  links: {
    github?: string
    live?: string
  }
  featured: boolean
  category: 'software' | 'data' | 'ml' | 'research'
  role?: string
  stat?: string
}

export interface TimelineItem {
  id: string
  year: string
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
  type: 'award' | 'participation' | 'milestone'
}

export interface NowItem {
  category: string
  items: string[]
}
