import "./globals.css";
import { AuthProvider } from "../lib/contexts/AuthContext";
import { DeepgramContextProvider } from "../lib/contexts/DeepgramContext";
import { NotesProvider } from "../lib/contexts/NotesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotesProvider>
          <AuthProvider>
            <DeepgramContextProvider>{children}</DeepgramContextProvider>
          </AuthProvider>
        </NotesProvider>
      </body>
    </html>
  );
}
