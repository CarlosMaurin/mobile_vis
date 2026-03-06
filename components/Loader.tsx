
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-dark"
        >
          <style>
            {`
              .loader-container {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: not-allowed;
                scale: 1.2; /* Adjusted scale for better visibility */
              }

              .central {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 10em;
                height: 10em;
                border-radius: 50%;
                /* Brand color shadows: Primary (#316765) and Accent (#7CA87A) */
                box-shadow: 0.5em 1em 1em #316765,
                  -0.5em 0.5em 1em #7CA87A,
                  0.5em -0.5em 1em #316765,
                  -0.5em -0.5em 1em #7CA87A;
              }

              .external-shadow {
                width: 10em;
                height: 10em;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                /* Glow effect with brand colors */
                box-shadow: 0.5em 0.5em 3em #316765,
                  -0.5em 0.5em 3em #7CA87A,
                  0.5em -0.5em 3em #316765,
                  -0.5em -0.5em 3em #7CA87A;
                z-index: 999;
                animation: rotate 3s linear infinite;
                background-color: #2E2D3A; /* Brand dark color */
              }

              .intern {
                position: absolute;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .logo-pulse {
                width: 5em;
                height: 5em;
                object-fit: contain;
                animation: heartbeat 1.5s ease-in-out infinite;
                filter: drop-shadow(0 0 10px rgba(124, 168, 122, 0.5));
              }

              @keyframes rotate {
                0% {
                  transform: rotate(0deg);
                }
                50% {
                  transform: rotate(180deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }

              @keyframes heartbeat {
                0% {
                  transform: scale(1);
                }
                14% {
                  transform: scale(1.15);
                }
                28% {
                  transform: scale(1);
                }
                42% {
                  transform: scale(1.15);
                }
                70% {
                  transform: scale(1);
                }
              }
            `}
          </style>

          <div className="loader-container">
            <div className="intern">
              <img 
                src="https://res.cloudinary.com/deit2ncmp/image/upload/v1767404237/Untitled-2-01_sbqvo2.png" 
                alt="V.I.S. Loader Logo" 
                className="logo-pulse"
              />
            </div>
            <div className="external-shadow">
              <div className="central"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
