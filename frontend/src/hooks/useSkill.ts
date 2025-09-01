import type { Skill } from "../models/skills";
import { useQuery } from "@tanstack/react-query";
import { SkillsService } from "../services/skills";

export const useSkill = (id: string) => {
    return useQuery<Skill, Error>({
        queryKey: [`skills/${id}`],
        queryFn: () => SkillsService.getSkill(id),
    });
};
