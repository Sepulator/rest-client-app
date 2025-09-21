export const mockHistoryData = [
  {
    duration: 200,
    status: 500,
    timestamp: 'timestampMock',
    method: 'POST',
    requestSize: 300,
    responseSize: 300,
    error:
      'Invalid header value: Headers must contain only ASCII characters. Remove non-ASCII characters from header names and values.',
    url: 'https://api.example.com/resource',
    headers: { 'content-type': 'application/json; charset=utf-8' },
  },
  {
    duration: 200,
    status: 200,
    timestamp: 'timestampMock',
    method: 'POST',
    requestSize: 300,
    responseSize: 300,
    url: 'https://api.example.com/resource/2',
    headers: { 'content-type': 'application/json; charset=utf-8' },
  },
];
