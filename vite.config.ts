import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: any[] = [react()];
  
  // Only include lovable-tagger in development mode
  if (mode === "development") {
    try {
      // Dynamic import for development-only plugin
      const taggerModule = require("lovable-tagger");
      if (taggerModule?.componentTagger) {
        plugins.push(taggerModule.componentTagger());
      }
    } catch (error) {
      // Silently ignore if lovable-tagger is not available
      // This is expected in production builds
    }
  }
  
  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Ensure build doesn't fail on warnings
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress specific warnings if needed
          if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          warn(warning);
        },
      },
    },
  };
});
