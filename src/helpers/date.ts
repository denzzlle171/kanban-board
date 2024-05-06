export const timePassed = (date :string) => {
  const currentDate = new Date();
  const issueDate = new Date(date);

  const timeDiff = currentDate.getTime() - issueDate.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24));
}

export const starsString = (stars:number): string => {
  return stars !== null && stars / 1000 > 0
    ? `${Math.trunc(stars / 1000)}K`
    : stars !== null
    ? stars.toString()
    : '';
};