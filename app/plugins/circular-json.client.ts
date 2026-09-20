export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    // 1. Double protection for JSON.stringify against circular structures
    const originalStringify = JSON.stringify;
    JSON.stringify = function (val: any, replacer?: any, space?: any): string {
      const seen = new WeakSet();
      const safeReplacer = function (this: any, key: string, value: any) {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        if (typeof replacer === 'function') {
          return replacer.call(this, key, value);
        }
        return value;
      };

      try {
        return originalStringify.call(
          this,
          val,
          typeof replacer === 'function' ? safeReplacer : (replacer || safeReplacer),
          space
        );
      } catch {
        try {
          return originalStringify.call(this, val, safeReplacer, space);
        } catch {
          return '"[Circular]"';
        }
      }
    };

    // 2. Vue warning handler to prevent logging circular Vue reactive effect objects
    nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
      // Suppress hydration mismatch warnings if any benign mismatches occur
      if (msg && (msg.includes('Hydration') || msg.includes('mismatch'))) {
        return;
      }
      console.warn(`[Vue warn]: ${msg}${trace || ''}`);
    };
  }
});
