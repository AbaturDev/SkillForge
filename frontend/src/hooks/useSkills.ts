import { useEffect, useState } from "react"
import { SkillsService } from '../services/skills'
import type { PaginationQuery } from "../models/commons"
import type { Skill } from "../models/skills";
import { CanceledError } from "axios";

export const useSkills = ({ pageSize = 10, pageNumber = 1 }: PaginationQuery) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchSkills = async () => {
            setIsLoading(true);
            setError('')

            try {
                const data = await SkillsService.getSkillsList({ pageSize, pageNumber });
                setSkills(data.items);
            } catch (ex) {
                if (ex instanceof CanceledError) {
                    return
                }
                setError(ex instanceof Error ? ex.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkills()
    }, [pageSize, pageNumber]);

    return { skills, error, isLoading }
} 