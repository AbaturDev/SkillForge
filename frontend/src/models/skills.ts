export interface Skill {
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    description: string,
    endedAt?: string,
    skillStatus: number
}

export interface CreateSkill {
    name: string
    description: string
}