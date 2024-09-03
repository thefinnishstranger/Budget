import { LockClosedIcon, ChartBarIcon, CurrencyDollarIcon, CalculatorIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Budget Calculator',
    description:
      'Easily manage and track your expenses with our intuitive budget calculator. Simplify your financial planning and stay on top of your spending.',
    icon: CalculatorIcon,
  },
  {
    name: 'Expense Tracking',
    description:
      'Visualize your spending patterns with dynamic graphs and charts. Get insights into where your money goes and make informed decisions.',
    icon: ChartBarIcon,
  },
  {
    name: 'Simple Expense Input',
    description:
      'Quickly add and categorize your expenses with our user-friendly input system. Effortlessly keep your budget updated in real time.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Secure Data',
    description:
      'Your financial data is protected with top-notch security measures. Enjoy peace of mind knowing your information is safe and secure.',
    icon: LockClosedIcon,
  },
]

export default function MainPage() {
  return (
    <>
      <div>
        <p className="main">
          Welcome to Budget
        </p>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are dedicated to helping you gain control over your finances with tools to track, analyze, and manage your budget efficiently.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
