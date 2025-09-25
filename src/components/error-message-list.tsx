type Props = {
  errors: string[];
};

export const ErrorMessageList = ({ errors }: Props) => {
  return (
    <ul>
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};
