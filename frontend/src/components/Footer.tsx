import { sosmed } from "../lib/data";

function Footer() {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--primary-color) font-medium text-white lg:py-6 md:py-5 py-3">
      <div className="mx-auto lg:px-10 md:px-4 px-3">
        <div className="flex flex-col md:flex-row justify-between items-center lg:text-xl md:text-md text-xs">
          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            {sosmed.map((item) => {
              return <a href={item.url} className={`hover:${item.color} transition-colors`}>{item.id}</a>
            })}
          </div>
          
          <div className="lg:hidden md:hidden border-1 border-gray-300 rounded-xl w-full mb-2"/>
          {/* Copyright */}
          <div>
            Copyright UPNVJ ${currentYear}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 