import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = import.meta.env?.VITE_SANITY_PROJECT_ID || 'ee61qwkf';
const dataset = import.meta.env?.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool(), ...(import.meta.env?.DEV ? [visionTool()] : [])],

  schema: {
    types: schemaTypes,
  },
});
