export default async (req, res) => {
  const { id } = req.query;

  // 1. Validación del ID
  if (!id) {
    return res.status(400).send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Error: Falta ID</h1>
          <p>Ejemplo de uso correcto:</p>
          <code>https://property-pages-one.vercel.app/api/render?id=107807879</code>
        </body>
      </html>
    `);
  }

  try {
    // 2. Obtener HTML de Supabase
    const supabaseUrl = `https://uxyxxhsgkprnuxohjhbc.supabase.co/storage/v1/object/public/property-pages/property-${id}.html`;
    const response = await fetch(supabaseUrl);

    // 3. Manejar errores de Supabase
    if (!response.ok) {
      throw new Error(`Supabase respondió con error ${response.status}`);
    }

    const html = await response.text();

    // 4. Enviar respuesta exitosa
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);

  } catch (error) {
    // 5. Manejo detallado de errores
    res.status(500).send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Error al cargar la propiedad</h1>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Verifica que el archivo exista en Supabase:</p>
          <code>property-${id}.html</code>
        </body>
      </html>
    `);
  }
};
