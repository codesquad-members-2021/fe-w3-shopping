const htmlSkeleton = (head, body) => {
  const { styles, scripts, title } = head;
  const { header, main, footer } = body;
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${styles}
        <title>${title}</title>
      </head>
    
      <body>
        <header>
          ${header}
        </header>
        <main>
          ${main}
        </main>
        <footer>
          ${footer}
        </footer>
        <a href="#top" class="btn_follow">
          <span><i class="fas fa-chevron-up"></i></span>
        </a>
        ${scripts}
        <script src="https://kit.fontawesome.com/439db4bb02.js" crossorigin="anonymous"></script>
      </body>
    </html>
    `;
};

module.exports = htmlSkeleton;
