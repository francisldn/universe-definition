import { fetchUniverseDefinition } from "@/services/api";
import type { UniverseDefinitionFilterOptions } from "@/types/universe-types";
import { useQuery } from "@tanstack/react-query";

export function useUniverseDefinitionData(filterOptions?: UniverseDefinitionFilterOptions) { 
  return useQuery({
    queryKey: ['universe-definition', filterOptions],
    queryFn: () => fetchUniverseDefinition(filterOptions),
  })
}