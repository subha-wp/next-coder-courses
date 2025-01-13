"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { questions, Question } from "./questions";
import { Results } from "./results";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    let frontendScore = 0;
    let backendScore = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question.category === "frontend" && answer === question.options[0]) {
        frontendScore++;
      } else if (
        question.category === "backend" &&
        answer === question.options[1]
      ) {
        backendScore++;
      } else if (question.category === "general") {
        if (answer === question.options[0]) frontendScore++;
        else if (answer === question.options[1]) backendScore++;
      }
    });

    return { frontendScore, backendScore };
  };

  if (showResults) {
    const scores = calculateScores();
    return <Results scores={scores} totalQuestions={questions.length} />;
  }

  const question: Question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-lg mx-auto mt-4 sm:mt-8">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-center">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <h2 className="text-base sm:text-lg mb-4">{question.text}</h2>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="text-sm sm:text-base"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          size="sm"
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
