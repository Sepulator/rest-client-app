export const generateRouteUrl = (
  method: string,
  requestUrl: string,
  locale: string,
  body?: string,
  headers: Record<string, string> = {}
): string => {
  const encodedUrl = Buffer.from(requestUrl).toString('base64');
  const encodedBody = body
    ? (() => {
        try {
          return Buffer.from(JSON.stringify(JSON.parse(body))).toString('base64');
        } catch {
          return Buffer.from(body.trim()).toString('base64');
        }
      })()
    : undefined;

  const queryParams = new URLSearchParams();

  Object.entries(headers).forEach(([key, value]) => {
    if (key && value) {
      queryParams.append(key, value);
    }
  });

  let route = `/${locale ? `${locale}/` : ''}client/${method}/${encodedUrl}`;

  if (encodedBody) {
    route += `/${encodedBody}`;
  }

  const queryString = queryParams.toString();

  if (queryString) {
    route += `?${queryString}`;
  }

  return route;
};
