export const generateRouteUrl = (
  method: string,
  requestUrl: string,
  locale: string,
  body?: string,
  headers: Record<string, string> = {}
): string => {
  const encodedUrl = btoa(requestUrl);
  const encodedBody = body ? btoa(JSON.stringify(JSON.parse(body))) : undefined;

  const queryParams = new URLSearchParams();

  Object.entries(headers).forEach(([key, value]) => {
    if (key && value) {
      queryParams.append(key, value);
    }
  });

  let route = `/${locale}/client/${method}/${encodedUrl}`;

  if (encodedBody) {
    route += `/${encodedBody}`;
  }

  const queryString = queryParams.toString();

  if (queryString) {
    route += `?${queryString}`;
  }

  return route;
};
