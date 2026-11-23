import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Number (e.g. 01)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags (Tech Stack / Methods)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Flexible badges for tech stack (React, PWA) or research methods (BERTopic, Ethnography, Twitter API)',
    }),
    defineField({
      name: 'tag',
      title: 'Legacy Tags (Deprecated)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Older tag field maintained for backward compatibility',
      hidden: true,
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web App', value: 'Web App' },
          { title: 'Working Paper', value: 'Working Paper' },
          { title: 'Fieldwork', value: 'Fieldwork' },
          { title: 'Data Analysis', value: 'Data Analysis' },
          { title: 'Research', value: 'Research' },
          { title: 'Other', value: 'Other' },
          // Legacy values for compatibility
          { title: 'Research (Legacy)', value: 'research' },
          { title: 'Website (Legacy)', value: 'website' },
          { title: 'ML Model (Legacy)', value: 'ml-model' },
          { title: 'Brand (Legacy)', value: 'brand' },
          { title: 'other (Legacy)', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Research',
    }),
    defineField({
      name: 'previewVideo',
      title: 'Preview Video (Cloudinary URL)',
      type: 'url',
      description: 'Short 5-10 second autoplay preview video',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL (GitHub, etc)',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Showcase',
      type: 'boolean',
      initialValue: false,
      description: 'Pin this project as the full-width featured showcase on the Work page.',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Feature Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short feature labels shown on the featured showcase card (e.g. Team Digest, Theme Detector).',
    }),
    defineField({
      name: 'demoCredentials',
      title: 'Public Demo Credentials',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Demo Email',
          type: 'string',
        }),
        defineField({
          name: 'password',
          title: 'Demo Password',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'videoEmbed',
          title: 'Video Embed',
          type: 'object',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'fileAttachment',
          title: 'File Attachment',
          type: 'file',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'num',
    },
  },
});
