export const getCourseWebviewHtml = (title: string, description: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 20px;
      color: #333;
      background-color: #FAFAFA;
      line-height: 1.6;
    }
    h1 {
      color: #1E3A8A;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .content {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="content">
    ${description || '<p>No content provided for this course.</p>'}
  </div>
  <script>
    // Notify the React Native app that the content has loaded
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'CONTENT_LOADED' }));
  </script>
</body>
</html>
`;
