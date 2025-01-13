import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsProps {
  scores: {
    frontendScore: number;
    backendScore: number;
  };
  totalQuestions: number;
}

export function Results({ scores, totalQuestions }: ResultsProps) {
  const { frontendScore, backendScore } = scores;
  const frontendPercentage = (frontendScore / totalQuestions) * 100;
  const backendPercentage = (backendScore / totalQuestions) * 100;

  let recommendation;
  if (frontendScore > backendScore) {
    recommendation =
      "Based on your answers, you seem to have a stronger inclination towards Frontend Development. You might enjoy creating user interfaces and working on the visual aspects of web applications.";
  } else if (backendScore > frontendScore) {
    recommendation =
      "Based on your answers, you seem to have a stronger inclination towards Backend Development. You might enjoy working with databases, server-side logic, and building the core functionality of web applications.";
  } else {
    recommendation =
      "Based on your answers, you seem to have a balanced interest in both Frontend and Backend Development. You might enjoy Full Stack Development, which combines both aspects.";
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-4 sm:mt-8">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-center">
          Your Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm sm:text-base">
              Frontend Development Aptitude:
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${frontendPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm sm:text-base">
              {frontendPercentage.toFixed(0)}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">
              Backend Development Aptitude:
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${backendPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm sm:text-base">
              {backendPercentage.toFixed(0)}%
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-sm sm:text-base">
              Recommendation:
            </h3>
            <p className="text-sm sm:text-base">{recommendation}</p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-sm sm:text-base">Next Steps:</h3>
            <p className="text-sm sm:text-base">
              Remember, this quiz is just a starting point. To make a
              well-informed decision:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
              <li>
                Research both frontend and backend development in more depth
              </li>
              <li>Try out some basic projects in both areas</li>
              <li>Consider your long-term career goals and the job market</li>
              <li>Speak with professional developers or career counselors</li>
              <li>
                Explore online courses or tutorials in both frontend and backend
                development
              </li>
              <li>
                Join coding communities or forums to learn from experienced
                developers
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
