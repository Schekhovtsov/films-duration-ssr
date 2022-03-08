export const getHumanRuntime = (filmRuntime: number): string => {
    const hours = Math.trunc(filmRuntime / 60);
    const minutes = filmRuntime % 60;
    return `${hours} hours ${minutes} min`;
  };