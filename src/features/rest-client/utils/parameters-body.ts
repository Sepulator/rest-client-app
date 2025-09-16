export const getBodyFromParams = (parameters: string[]): string => {
  try {
    return parameters[2] ? String(JSON.parse(atob(decodeURIComponent(parameters[2])))) : '';
  } catch {
    return '';
  }
};
