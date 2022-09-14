import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router'

const variants = {
  fadeIn: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  },
  fadeOut: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const TransitionEffect = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <div style={{ overflow: 'hidden' }}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={asPath}
          variants={variants}
          initial="fadeIn"
          animate="inactive"
          exit="fadeOut"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransitionEffect;