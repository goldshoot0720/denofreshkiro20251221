import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>鋒兄AI資訊系統</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 min-h-screen">
        <Component />
      </body>
    </html>
  );
}
