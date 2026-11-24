// Server component: no client JavaScript is shipped for the footer.
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
//   Instagram, 
//   Twitter, 
//   Facebook, 
//   Linkedin,
//   Youtube
} from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { CONTACT } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Work', href: '/work' },
      { name: 'Our Services', href: '/services' },
    ],
    Services: [
      { name: 'Media Content Creation', href: '/services/media-content-creation' },
      { name: 'Event Videography', href: '/services/video-production' },
      { name: 'Branding', href: '/services/visual-brand-development' },
      { name: 'Photography', href: '/services/photography' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
    Resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'All Services', href: '/services' },
    ],
    Support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

//   const socialIcons = [
//     { icon: Instagram, href: '#', label: 'Instagram' },
//     { icon: Twitter, href: '#', label: 'Twitter' },
//     { icon: Facebook, href: '#', label: 'Facebook' },
//     { icon: Linkedin, href: '#', label: 'LinkedIn' },
//     { icon: Youtube, href: '#', label: 'YouTube' },
//   ];

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Background (CSS animation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={`orb-${i}`}
            className="drift absolute rounded-full bg-purple-900/5 blur-3xl"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDuration: `${20 + i * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div
            className="col-span-2 lg:col-span-1"
          >
            <Link href="/" aria-label="LO Media Studio home">
              <span className="flex items-center text-2xl font-bold bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent mb-4">
                <Image
                  src="/logo.png"
                  alt=""
                  width={82}
                  height={82}
                  sizes="82px"
                  className="inline-block mr-2"
                />
                LoMediaStudio
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Creating captivating media experiences that transform brands and inspire audiences worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <a href="mailto:layo@lomediahouse.com" className="hover:text-white break-all">layo@lomediahouse.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <a href={`tel:${CONTACT.phoneE164}`} className="hover:text-white">{CONTACT.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400" aria-hidden="true" />
                <span>{CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}, {CONTACT.countryName}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div
              key={category}
              className="lg:col-span-1"
            >
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                  >
                    <Link
                      href={link.href}
                      className="inline-block text-gray-400 hover:text-white hover:translate-x-1 text-sm transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-white font-semibold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-400 text-sm">Get the latest updates on projects and industry insights.</p>
            </div>
            <div className="flex gap-3">
              <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
              <input
                id="footer-newsletter"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-900 transition-colors"
              />
              <button
                type="button"
                className="px-4 py-2 bg-purple-900 hover:bg-red-600 hover:scale-105 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} LO Media Studio. All rights reserved.
          </p>
          
          {/* Social Links */}
          {/* <div className="flex gap-3">
            {socialIcons.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                className="w-9 h-9 bg-gray-800 hover:bg-purple-900 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}