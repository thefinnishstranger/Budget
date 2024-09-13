

const Footer = () => {
  return (
    <footer className="flex justify-center bg-green-500 text-white p-20">
      <div className="grid grid-cols-4">
        <div className="p-10">
          <a href="/">
            Home
          </a>
        </div>
        <div className="p-10">
          <a href="/calculator">
            Budget Calculator
          </a>
        </div>
        <div className="p-10">
          <a href="/account">
            Dashboard
          </a>
        </div>
        <div className="p-10">
          <a href="/about">
            About us
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
