export const ErrorMessageList = (errors: string[]) => {
  return (
    <ul>
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};
