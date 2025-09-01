import { useQuery } from "@tanstack/react-query";
import { SkillsService } from "../services/skills";
import type { Paginated, PaginationQuery } from "../models/commons";
import type { Skill } from "../models/skills";

export const useSkillsList = ({ pageSize = 10, pageNumber = 1 }: PaginationQuery) => {
  return useQuery<Paginated<Skill>, Error>({
    queryKey: ["skills", { pageSize, pageNumber }],
    queryFn: () => SkillsService.getSkillsList({ pageSize, pageNumber }),
  });
};
