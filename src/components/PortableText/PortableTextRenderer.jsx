import { PortableText } from '@portabletext/react';
import { urlFor } from '../../sanity/client';
import styles from './PortableTextRenderer.module.css';

const components = {
  block: {
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  marks: {
    code: ({ children }) => <code className={styles.code}>{children}</code>,
  },
  types: {
    image: ({ value }) => (
      <figure className={styles.figure}>
        <img src={urlFor(value).url()} alt={value.caption || 'Image'} className={styles.image} />
        {value.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
      </figure>
    ),
    videoEmbed: ({ value }) => (
      <figure className={styles.figure}>
        <div className={styles.videoWrapper}>
          <iframe
            src={value.url}
            title={value.caption || 'Video Embed'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {value.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
      </figure>
    ),
    fileAttachment: ({ value }) => (
      <div className={styles.fileAttachment}>
        <a href={value?.asset?.url} target="_blank" rel="noopener noreferrer">
          📎 {value.description || 'Download File'}
        </a>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ value }) {
  return (
    <div className={styles.container}>
      <PortableText value={value} components={components} />
    </div>
  );
}
