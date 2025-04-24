export default async (req, res) => {
  const { id, session } = req.query;

  // 1. Validación del ID
  if (!id) {
    return res.status(400).send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Error: Falta ID de Propiedad</h1>
          <p>Formato de URL esperado:</p>
          <code>https://www.propiedades.aura-app.es/[ID_PROPIEDAD]/[ID_SESION]</code>
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
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.send(html);

  } catch (error) {
    // 5. Manejo detallado de errores
    res.status(500).send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Error interno al cargar la propiedad</h1>
          <p><strong>ID Propiedad:</strong> ${id}</p>
          <p><strong>ID Sesión:</strong> ${session || 'No proporcionado'}</p>
          <p><strong>Detalle:</strong> ${error.message}</p>
          <p>Por favor, intenta más tarde o contacta con soporte.</p>
        </body>
      </html>
    `);
  }
};
