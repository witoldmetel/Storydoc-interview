export function getBoardInitials(boardName: string) {
  return boardName ? boardName.charAt(0).toUpperCase() : '';
}
