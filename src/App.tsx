import { ThemeProvider } from "./lib/theme-provider";
import { QueryProvider } from "./lib/api";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SmoothScrollProvider>
          <AppRoutes />
        </SmoothScrollProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

