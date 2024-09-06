import { LockClosedIcon, ChartBarIcon, CurrencyDollarIcon, CalculatorIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()

  const aboutUsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/about')
  }

  const startClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate('/signup')
  }

  return (
    <>
      <div className='flex justify-between items-center h-screen px-6'>
        <div className="flex flex-col w-full md:w-1/2">
          <header className="text-5xl font-extrabold tracking-tight">
            Empower Your Financial Journey
          </header>
          <p className='text-xl mt-5'>
            Take control of your finances effortlessly and make informed decisions with our powerful tools.
          </p>
          <div className='flex mt-8'>
            <button
              type='submit'
              onClick={startClick}
              className="py-3 bg-blue-700 text-white font-bold rounded w-1/3 md:w-1/5 transform hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Get started
            </button>
            <button
              type='submit'
              onClick={aboutUsClick}
              className='flex items-center mx-5 px-4 py-2 bg-transparent text-black font-semibold'
            >
              About us
              <ArrowRightIcon className='h-5 w-5 ml-2' />
            </button>
          </div>
        </div>

        <div className="hidden md:w-1/2 md:flex md:justify-end">
          <img
            src="/background4.jpg"
            alt="Tilted Image"
            className="transform"
          />
        </div>
      </div>

      <div className='bg-green-500 h-auto p-10 flex flex-col md:flex-row justify-start items-center tracking-tight'>
        <div className='flex flex-col text-black w-2/3'>
          <p className='text-3xl font-bold'>
            Did you know?
          </p>
          <p className='text-lg mt-3 font-light py-1'>
            People with a budget feel significantly more in control, with 62% reporting this benefit. They also experience greater confidence, with 55% feeling this way, and a heightened sense of security, felt by 52%. On the other hand, those without a budget often feel less in control, with only 19% feeling secure, and are more likely to be worried or stressed, reported by 18% and 17% respectively.
          </p>
          <p className='text-lg mt-5 font-light py-1'>
            Managing a budget can greatly improve your financial stability and enhance your overall sense of well-being.
          </p>
        </div>
        <div className='flex flex-col w-1/3'>
          maybe add a chart here?
        </div>
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
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div>
        biggest wealth killers
      </div>
      <div>
        stats on finance tracking
      </div>
    </>
  )
}
