import { z } from 'zod';

export const epicModeSchema = z.enum(['scrum', 'parent_tasks']);

/** How finely to split work before generating the full backlog (not per-task labels). */
export const decompositionLevelSchema = z.enum(['coarse', 'balanced', 'fine']);

export type DecompositionLevel = z.infer<typeof decompositionLevelSchema>;

/** Expected total task count range for each level (guidance for the model and UI). */
export const DECOMPOSITION_LEVEL_RANGES: Record<DecompositionLevel, string> = {
  coarse: '~20–30 tasks — major areas (e.g. account, admin, checkout)',
  balanced: '~50–60 tasks — by modules and main flows',
  fine: '~100–120 tasks — maximum breakdown of work items',
};

export const taskSizeSchema = z.enum(['small', 'medium', 'large']);

export const taskSpecSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  size: taskSizeSchema.optional(),
});

export const epicSpecSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  tasks: z.array(taskSpecSchema).min(1),
});

export const planSchema = z.object({
  project_title: z.string().optional(),
  epic_mode: epicModeSchema,
  /** Set when the user chose how deep to decompose; drives total task count. */
  decomposition_level: decompositionLevelSchema.optional(),
  responsible_id: z.number().optional(),
  epics: z.array(epicSpecSchema).min(1),
});

export type PlanPayload = z.infer<typeof planSchema>;
export type EpicPayload = z.infer<typeof epicSpecSchema>;
export type TaskPayload = z.infer<typeof taskSpecSchema>;

const PLACEHOLDER_TASK_TITLE = 'Clarify scope and next steps';

function parseTaskSize(raw: unknown): 'small' | 'medium' | 'large' | undefined {
  if (raw === 'small' || raw === 'medium' || raw === 'large') return raw;
  return undefined;
}

function parseDecompositionLevel(raw: unknown): DecompositionLevel | undefined {
  if (raw === 'coarse' || raw === 'balanced' || raw === 'fine') return raw;
  return undefined;
}

function isValidPriorEpics(prior: PlanPayload | undefined): prior is PlanPayload {
  if (!prior?.epics?.length) return false;
  return prior.epics.every(
    (e) =>
      typeof e.name === 'string' &&
      e.name.trim().length > 0 &&
      Array.isArray(e.tasks) &&
      e.tasks.length > 0,
  );
}

/**
 * Coerces a model-produced plan into a valid {@link PlanPayload}.
 * Fills missing `epic_mode`, empty epics/tasks, and fixes invalid task titles so chat does not fail on vague or greeting-only messages.
 */
export function normalizePlanFromAi(planRaw: unknown, prior: PlanPayload | undefined): PlanPayload {
  const fallbackEpics = isValidPriorEpics(prior) ? prior.epics : DEFAULT_PLAN.epics;

  if (!planRaw || typeof planRaw !== 'object') {
    return planSchema.parse({
      epic_mode: 'scrum',
      decomposition_level: prior?.decomposition_level,
      epics: fallbackEpics,
    });
  }

  const o = planRaw as Record<string, unknown>;
  const epic_mode = o.epic_mode === 'parent_tasks' ? 'parent_tasks' : 'scrum';
  const decomposition_level =
    parseDecompositionLevel(o.decomposition_level) ?? prior?.decomposition_level;

  const project_title =
    typeof o.project_title === 'string' && o.project_title.trim() ? o.project_title.trim() : undefined;
  const responsible_id = typeof o.responsible_id === 'number' && Number.isFinite(o.responsible_id)
    ? o.responsible_id
    : undefined;

  const epicsRaw = o.epics;
  if (!Array.isArray(epicsRaw) || epicsRaw.length === 0) {
    return planSchema.parse({
      epic_mode,
      project_title,
      responsible_id,
      decomposition_level,
      epics: fallbackEpics,
    });
  }

  const epics = epicsRaw.map((epicRaw, epicIndex) => {
    if (!epicRaw || typeof epicRaw !== 'object') {
      return {
        name: `Epic ${epicIndex + 1}`,
        tasks: [{ title: PLACEHOLDER_TASK_TITLE }],
      };
    }
    const e = epicRaw as Record<string, unknown>;
    const name =
      typeof e.name === 'string' && e.name.trim() ? e.name.trim() : `Epic ${epicIndex + 1}`;
    const description =
      typeof e.description === 'string' && e.description.trim() ? e.description.trim() : undefined;

    const tasksRaw = e.tasks;
    if (!Array.isArray(tasksRaw) || tasksRaw.length === 0) {
      return { name, description, tasks: [{ title: PLACEHOLDER_TASK_TITLE }] };
    }

    const tasks = tasksRaw.map((taskRaw, taskIndex) => {
      if (!taskRaw || typeof taskRaw !== 'object') {
        return { title: `Task ${taskIndex + 1}` };
      }
      const t = taskRaw as Record<string, unknown>;
      const title =
        typeof t.title === 'string' && t.title.trim()
          ? t.title.trim()
          : `Task ${taskIndex + 1}`;
      const taskDescription =
        typeof t.description === 'string' && t.description.trim()
          ? t.description.trim()
          : undefined;
      const size = parseTaskSize(t.size);
      const base = taskDescription ? { title, description: taskDescription } : { title };
      return size ? { ...base, size } : base;
    });

    return { name, description, tasks };
  });

  return planSchema.parse({
    epic_mode,
    project_title,
    responsible_id,
    decomposition_level,
    epics,
  });
}

export const DEFAULT_PLAN: PlanPayload = {
  epic_mode: 'scrum',
  epics: [
    {
      name: 'Backlog',
      tasks: [{ title: 'First task', description: 'Describe the outcome' }],
    },
  ],
};

export function parsePlanFromJson(raw: unknown): PlanPayload {
  return planSchema.parse(raw);
}
