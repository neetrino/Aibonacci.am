import type { EpicPayload, PlanPayload, TaskPayload } from '@/shared/domain/plan';

/** YAML export: omit Bitrix sync metadata so handoffs stay readable. */
export function planPayloadForYamlExport(plan: PlanPayload): PlanPayload {
  return {
    ...plan,
    epics: plan.epics.map(stripEpicBitrix),
  };
}

function stripEpicBitrix(epic: EpicPayload): EpicPayload {
  return {
    name: epic.name,
    description: epic.description,
    tasks: epic.tasks.map(stripTaskBitrix),
  };
}

function stripTaskBitrix(task: TaskPayload): TaskPayload {
  const out: TaskPayload = { title: task.title };
  if (task.description !== undefined) out.description = task.description;
  if (task.size !== undefined) out.size = task.size;
  return out;
}
