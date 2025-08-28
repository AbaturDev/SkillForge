import type { Paginated, PaginationQuery } from "../models/commons"
import type { CreateSkill, Skill } from "../models/skills"
import { apiClient } from "./api-client"

export const SkillsService = {
    getSkill: async (id: string) => {
        const { data } = await apiClient.get<Skill>(`/skills/${id}`)
        return data
    },

    getSkillsList: async (args: PaginationQuery) => {
        const { data } = await apiClient.get<Paginated<Skill>>('/skills', {
            params: {
                ...args
            }
        })

        return data
    },

    deleteSkill: async (id: string) => {
        await apiClient.delete(`/skills/${id}`)
    },

    updateSkill: async (id: string, data: CreateSkill) => {
        await apiClient.put(`/skills/${id}`, data)
    },

    createSkill: async (data: CreateSkill) => {
        await apiClient.post('/skills', data)
    },

    endSkill: async (id: string) => {
        await apiClient.post(`/skills/${id}`)
    },
}