import { defineField, defineType } from 'sanity';

export const adventureType = defineType({
  name: 'adventure',
  title: 'Adventure Photo',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
