type Props = {
  step: number
}

export default function CheckoutSteps({ step }: Props) {
  const steps = ["Cart", "Shipping", "Payment"]

  return (
    <div className="flex justify-between mb-8">

      {steps.map((label, index) => {
        const active = index + 1 <= step

        return (
          <div
            key={label}
            className="flex flex-col items-center flex-1"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                active ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <p className="text-sm mt-2">{label}</p>
          </div>
        )
      })}

    </div>
  )
}