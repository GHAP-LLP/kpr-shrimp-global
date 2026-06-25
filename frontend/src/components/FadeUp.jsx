import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1]; // expo-out — smooth & premium

const itemVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0 } },
};

/** Single fade-up block, triggers once when scrolled into view */
export function FadeUp({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.58, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its FadeUpItem children */
export function FadeUpGrid({ children, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariant}
    >
      {children}
    </motion.div>
  );
}

/** Animated child for use inside FadeUpGrid */
export function FadeUpItem({ children, className }) {
  return (
    <motion.div className={className} variants={itemVariant}>
      {children}
    </motion.div>
  );
}
