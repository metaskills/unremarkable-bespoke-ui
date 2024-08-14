import fs from "fs/promises";
import open from "open";
import { watch } from "fs";
import path from "path";
import { WebSocketServer } from "ws";

const filePath = path.resolve("public/index.html");
await fs.access(filePath).catch(async () => {
  await fs.writeFile(filePath, "");
});
let isOpened = false;

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {});

watch(filePath, async () => {
  if (!isOpened) {
    await open(`file://${filePath}`);
    isOpened = true;
  }
  wss.clients.forEach((client) => {
    client.send("refresh");
  });
});

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React with Tailwind CSS</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
  <!-- React and ReactDOM CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Babel CDN for JSX support in the browser -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <!-- Your React code -->
  <script type="text/babel">
    const BespokeUI = () => (
      {{JSX_CONTENT}}
    );
  </script>
  <script type="text/babel">
    ReactDOM.render(<BespokeUI />, document.getElementById('root'));
  </script>
  <!-- WebSocket refresh script -->
  <script>
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      if (event.data === 'refresh') {
        window.location.reload();
      }
    };
  </script>
</body>
</html>
`;

export async function previewUI(jsx) {
  const content = htmlTemplate.replace("{{JSX_CONTENT}}", jsx);
  await fs.writeFile(filePath, content);
  // Notify all connected clients to refresh
  wss.clients.forEach((client) => {
    client.send("refresh");
  });
}
