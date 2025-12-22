import "./globals.css";

export const metadata = {
  title: "MyPortfolio",
  description: "CMS Driven Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

