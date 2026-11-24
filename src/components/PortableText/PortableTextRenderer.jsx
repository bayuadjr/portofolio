import { PortableText } from '@portabletext/react';
import { urlFor } from '../../sanity/client';
import { sanitizeHttpUrl, sanitizeEmbedUrl } from '../../utils/url';
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
    link: ({ children, value }) => {
      const safeHref = sanitizeHttpUrl(value?.href);
      if (!safeHref) return <span>{children}</span>;
      return (
        <a href={safeHref} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className={styles.figure}>
          <img
            src={urlFor(value).auto('format').url()}
            alt={value.caption || 'Illustration from post'}
            width={1200}
            height={800}
            className={styles.image}
            loading="lazy"
          />
          {value.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      const safeSrc = sanitizeEmbedUrl(value?.url);
      if (!safeSrc) return null;
      return (
        <figure className={styles.figure}>
          <div className={styles.videoWrapper}>
            <iframe
              src={safeSrc}
              title={value?.caption || 'Embedded video'}
              width={960}
              height={540}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {value?.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
        </figure>
      );
    },
    fileAttachment: ({ value }) => {
      const safeUrl = sanitizeHttpUrl(value?.asset?.url);
      if (!safeUrl) return null;
      return (
        <div className={styles.fileAttachment}>
          <a href={safeUrl} target="_blank" rel="noopener noreferrer">
            Download: {value.description || 'Attachment'}
          </a>
        </div>
      );
    },
  },
};

export default function PortableTextRenderer({ value }) {
  return (
    <div className={styles.container}>
      <PortableText value={value} components={components} />
    </div>
  );
}
