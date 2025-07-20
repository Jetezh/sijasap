function Footer() {
  const facebook = 'https://facebook.com/infoupnjakarta';
  const instagram = 'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fupnveteranjakarta%2F&is_from_rle';
  const x = 'https://twitter.com/upnjakarta'
  const email = 'https://plus.google.com/113815727990773900734';
  const youtube = 'https://www.youtube.com/channel/UCMw_GH6YVHMSHKcSA2WJjhw/videos';
  const tiktok = 'https://www.tiktok.com/@upnveteranjakarta';

  return (
    <footer className="bg-(--primary-color) font-medium text-white lg:py-6 md:py-5 py-3">
      <div className="mx-auto lg:px-10 md:px-4 px-3">
        <div className="flex flex-col md:flex-row justify-between items-center lg:text-xl md:text-md text-sm">
          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <a href={facebook} className="hover:text-blue-400 transition-colors">Facebook</a>
            <a href={instagram} className="hover:text-fuchsia-500 transition-colors">Instagram</a>
            <a href={youtube} className="hover:text-red-400 transition-colors">Youtube</a>
            <a href={email} className="hover:text-gray-400 transition-colors">Email</a>
            <a href={x} className="hover:text-indigo-400 transition-colors">X (twitter)</a>
            <a href={tiktok} className="hover:text-amber-200 transition-colors">Tiktok</a>
          </div>
          
          <div className="lg:hidden md:hidden border-1 border-gray-300 rounded-xl w-full mb-2"/>
          {/* Copyright */}
          <div>
            Copyright UPNVJ 2025
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 