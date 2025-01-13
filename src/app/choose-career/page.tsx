import Quiz from "./quiz";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center">
        Development Path Quiz
      </h1>
      <p className="text-center mb-4 sm:mb-8 max-w-lg text-sm sm:text-base">
        This quiz will help you determine whether you might be more suited for
        frontend or backend development. Answer the following 20 questions based
        on your interests and preferences. Remember, there are no right or wrong
        answers!
      </p>
      <Quiz />
    </main>
  );
}
