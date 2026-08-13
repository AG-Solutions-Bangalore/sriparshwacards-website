import { ThemeProvider } from "./lib/theme-provider";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
