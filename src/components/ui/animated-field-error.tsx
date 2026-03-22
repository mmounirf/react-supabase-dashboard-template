import { AnimatePresence, motion } from "motion/react";
import { FieldError } from "./field";

export default function AnimatedFieldError({
  errors,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  const hasContent =
    errors && errors.length > 0 && errors.some((e) => e?.message);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {hasContent && (
          <motion.div
            className="absolute -top-1 left-0 w-full"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <FieldError errors={errors} {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
