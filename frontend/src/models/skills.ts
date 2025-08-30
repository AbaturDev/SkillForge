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

export enum SkillStatus {
  Active = 0,
  Finished = 1,
}

export const mapSkillStatus = (status: number): string => {
  return SkillStatus[status as SkillStatus] ?? "Unknown";
};