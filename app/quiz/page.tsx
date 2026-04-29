"use client"

import { useState } from "react"
import QuizResult from "@/components/QuizResult"
import { useCart } from "@/context/CartContext"
import { Product } from "@/lib/product"

// Define your products
const magnesium: Product = {
  id: "1",
  name: "Magnesium",
  price: 12.99,
  description: "Supports sleep and muscle recovery",
  image: "/images/magnesium.png",
}

const vitaminD: Product = {
  id: "2",
  name: "Vitamin D",
  price: 9.99,
  description: "Supports immune and bone health",
  image: "/images/vitaminD.png",
}

const omega3: Product = {
  id: "3",
  name: "Omega 3",
  price: 15.99,
  description: "Supports heart and brain health",
  image: "/images/omega3.png",
}

// Quiz questions
const quizQuestions = [
  {
    question: "How often do you exercise per week?",
    options: ["0-1 times", "2-3 times", "4+ times"],
  },
  {
    question: "Do you experience frequent fatigue?",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    question: "Which areas do you want to improve?",
    options: ["Sleep", "Energy", "Immunity"],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const { addToCart } = useCart()

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  // Determine recommended stack based on answers
  const recommendedStack: Product[] = []
  if (completed) {
    if (answers.includes("0-1 times") || answers.includes("Sometimes") || answers.includes("Sleep")) {
      recommendedStack.push(magnesium)
    }
    if (answers.includes("Fatigue") || answers.includes("Energy") || answers.includes("Immunity")) {
      recommendedStack.push(vitaminD)
    }
    if (answers.includes("4+ times") || answers.includes("Exercise") || answers.includes("Heart")) {
      recommendedStack.push(omega3)
    }

    // For simplicity, ensure at least some default stack
    if (recommendedStack.length === 0) {
      recommendedStack.push(magnesium, vitaminD, omega3)
    }
  }

  const handleAddStack = () => {
    recommendedStack.forEach((product) => {
      addToCart(product.id, "one-time", 1)
    })
  }

  const progress = ((currentQuestion + (completed ? 1 : 0)) / quizQuestions.length) * 100

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Wellness Quiz</h1>

      {!completed ? (
        <div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
            <div
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="flex flex-col gap-3">
              {quizQuestions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="border rounded-md p-3 hover:bg-green-100 transition-colors text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <QuizResult recommendedStack={recommendedStack} />
          <button
            onClick={handleAddStack}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Stack to Cart
          </button>
        </div>
      )}
    </div>
  )
}
