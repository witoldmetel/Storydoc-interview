export function getWorkspaceInitials(workspaceName: string) {
  return workspaceName ? workspaceName.charAt(0).toUpperCase() : '';
}
