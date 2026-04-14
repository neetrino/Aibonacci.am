export type TaskActors = {
  taskOwnerId: number;
  taskAssigneeId: number;
};

export type BitrixEnv = {
  webhook: string;
  groupId: number;
} & TaskActors;

export function resolveBitrixContext(params: {
  webhook: string;
  projectBitrixId: string;
  taskOwnerId: string;
  taskAssigneeId: string;
}): BitrixEnv {
  const groupId = Number(params.projectBitrixId.trim());
  if (!Number.isFinite(groupId)) {
    throw new Error('Bitrix project id must be a number');
  }
  const owner = Number(params.taskOwnerId.trim());
  const assignee = Number(params.taskAssigneeId.trim());
  if (!Number.isFinite(owner) || !Number.isFinite(assignee)) {
    throw new Error('Task owner and assignee must be numeric Bitrix user ids');
  }
  return {
    webhook: params.webhook.trim(),
    groupId,
    taskOwnerId: owner,
    taskAssigneeId: assignee,
  };
}
