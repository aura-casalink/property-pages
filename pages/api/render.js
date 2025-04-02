export default function handler(req, res) {
  // Forzamos el código 200 aunque no reciba ID
  res.status(200).setHeader('Content-Type', 'text/html').send(`
    <!DOCTYPE html>
    <html>
      <head><title>Test</title></head>
      <body style="font-family: Arial; padding: 20px;">
        <h1>¡Endpoint Funcional!</h1>
        <p>ID recibido: ${req.query.id || 'Ninguno'}</p>
        <p>Ruta: ${req.url}</p>
        <p>Este es un test de funcionamiento básico</p>
      </body>
    </html>
  `);
}
