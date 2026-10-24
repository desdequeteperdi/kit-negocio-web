import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'REEMPLAZAR',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Dirección del panel alojado: https://<nombre>.sanity.studio (cada alumno elige la suya)
  studioHost: process.env.SANITY_STUDIO_HOST,
});
