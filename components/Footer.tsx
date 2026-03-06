import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white font-lemonmilk py-4 md:py-6 relative z-20 overflow-hidden max-h-[70vh] md:max-h-[40vh]">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-4 md:gap-6 h-full">
          
          {/* Isologo lateral */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img
              src="https://res.cloudinary.com/deit2ncmp/image/upload/v1766932420/Untitled-2-05_qiztd4.png"
              alt="V.I.S. Isologo"
              className="h-[clamp(80px,18vh,220px)] w-auto max-w-[320px] object-contain drop-shadow-[0_0_15px_rgba(124,168,122,0.2)] transition-all duration-700 hover:brightness-110"
            />
          </div>

          {/* Logo central MUCHO más grande */}
          <div className="w-full md:w-1/3 text-center flex flex-col items-center justify-center">
            <p className="text-[clamp(9px,1vw,11px)] tracking-[0.35em] mb-3 opacity-50 uppercase font-sans font-bold">
              Stop searching. Let's grow together.
            </p>

            <img
              src="https://res.cloudinary.com/deit2ncmp/image/upload/v1766932149/Untitled-2-02_xrro9w.png"
              alt="V.I.S. Isotipo"
              className="
                h-[clamp(180px,28vh,420px)]
                w-auto
                object-contain
                brightness-0 invert
                transition-all duration-700
                hover:scale-105
                drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]
              "
            />

            <div className="mt-3 text-[clamp(9px,1vw,12px)] font-black text-white/20 uppercase tracking-[0.45em]">
              Village Integral Services
            </div>
          </div>

          {/* Social Icons */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="flex space-x-6 md:space-x-8">
              {[
                { icon: 'fab fa-linkedin', href: '#' },
                { icon: 'fab fa-instagram', href: '#' },
                { icon: 'fab fa-facebook', href: '#' },
                { icon: 'fab fa-whatsapp', href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="text-white/30 hover:text-accent transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <i className={`${social.icon} text-xl md:text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-[clamp(8px,0.9vw,10px)] text-white/20 uppercase tracking-[0.2em] text-center md:text-left">
            © 2025 V.I.S. Property & Hospitality. All Rights Reserved.
          </p>

          <div className="flex gap-6 font-sans text-[clamp(8px,0.9vw,10px)] text-white/20 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;