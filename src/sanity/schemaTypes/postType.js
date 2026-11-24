import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
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
      name: 'date',
      title: 'Date (e.g. Apr 2025)',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Anthropology', value: 'Anthropology' },
          { title: 'Research Notes', value: 'Research Notes' },
          { title: 'Data & Technology', value: 'Data & Technology' },
          { title: 'Reading Notes', value: 'Reading Notes' },
          { title: 'Reflections', value: 'Reflections' },
        ],
      },
      description: 'Primary section category on the Writing page',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tag',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Reflection', value: 'Reflection' },
          { title: 'Social Theory', value: 'Social Theory' },
          { title: 'Book Notes', value: 'Book Notes' },
          { title: 'Data Science', value: 'Data Science' },
          { title: 'Anthropology', value: 'Anthropology' },
          { title: 'Personal', value: 'Personal' },
        ],
      },
    }),
    defineField({
      name: 'tagColor',
      title: 'Tag Color',
      type: 'string',
      options: {
        list: [
          { title: 'Terracotta', value: 'terracotta' },
          { title: 'Sky', value: 'sky' },
          { title: 'Acid', value: 'acid' },
        ],
      },
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
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
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
    defineField({
      name: 'references',
      title: 'References & External Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
});
