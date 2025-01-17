import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { Prompt } from '@next/font/google';

export const metadata = {
  title: "Online Learning Platform",
  description: "Generated by create next app",
};
const prompt = Prompt({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        {/* Wrap the entire app with AuthProvider to provide authentication context */}
        <AuthProvider>
          <Navbar /> {/* The Navbar has access to AuthContext */}
          {children} {/* The rest of the application */}
        </AuthProvider>
      </body>
    </html>
  );
}
