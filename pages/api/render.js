export default (req, res) => {
  const { id } = req.query;
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial; padding: 20px;">
        <h1>¡Funciona!</h1>
        <p>ID de propiedad: ${id || 'No proporcionado'}</p>
        <p>Este es tu primer endpoint en Vercel</p>
      </body>
    </html>
  `);
}
