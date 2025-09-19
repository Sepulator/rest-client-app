import { Button } from '@heroui/react';

export type FallbackProps = {
  error?: Error;
  resetError?: () => void;
  buttonMessage: string;
  title: string;
};

export function FallbackUi({ error, resetError, buttonMessage, title }: FallbackProps) {
  const handleReset = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <section className="flex w-full max-w-screen-2xl flex-1 flex-col items-center justify-center gap-5">
      <div className="border-default-400 rounded-medium border-1 p-10 text-center">
        <h1 className="mb-4">{title}</h1>
        {error && <p className="mb-6">{error.message}</p>}
        <Button className="bg-primary-300 w-full" onPress={handleReset}>
          {buttonMessage}
        </Button>
      </div>
    </section>
  );
}
