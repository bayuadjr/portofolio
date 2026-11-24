import { defineField, defineType } from 'sanity';

export const glimpseType = defineType({
  name: 'glimpse',
  title: 'Glimpse',
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
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'photo',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== 'photo',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Cloudinary)',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'reflection',
      title: 'Reflection',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
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
              { title: 'Code', value: 'code' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'colorClass',
      title: 'Block Style (Color)',
      type: 'string',
      options: {
        list: [
          { title: 'Block 1 (Terracotta + Glassmorphism)', value: 'block1' },
          { title: 'Block 2 (Sky + Bubbles)', value: 'block2' },
          { title: 'Block 3 (Acid + Stripes)', value: 'block3' },
        ],
      },
      initialValue: 'block1',
    }),
  ],
});

