import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ABOUT_CONTENT } from '../data/siteContent';

export default function About() {
  useDocumentMeta({
    title: 'About',
    description:
      'Background, education, research interests, and current projects of Bayu Adji Ramadhan.',
    path: '/about',
  });

  return (
    <>
      <section className="page-head">
        <h1>About</h1>
        <p>{ABOUT_CONTENT.introHeadline}</p>
      </section>

      <section className="section">
        <div className="section-label">Story</div>
        <div className="section-body">
          {ABOUT_CONTENT.story.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Education & honors</div>
        <div className="about-list">
          {ABOUT_CONTENT.education.map((edu) => (
            <div key={edu.institution} className="about-row">
              <span className="about-when">{edu.period}</span>
              <div>
                <h3>{edu.institution}</h3>
                <p>{edu.detail}</p>
              </div>
            </div>
          ))}
          {ABOUT_CONTENT.honors.map((honor) => (
            <div key={honor.title} className="about-row">
              <span className="about-when">{honor.period}</span>
              <div>
                <h3>{honor.title}</h3>
                <p>{honor.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Current</div>
        <ul className="exploring-list">
          {ABOUT_CONTENT.currentActivities.map((item) => (
            <li key={item.title} className="exploring-item">
              <div className="exploring-title">{item.title}</div>
              <p className="exploring-note">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-label">Research interests</div>
        <ul className="interest-list">
          {ABOUT_CONTENT.researchInterests.map((item) => (
            <li key={item.title} className="interest-item">
              <div className="interest-title">{item.title}</div>
              <p className="interest-note">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-label">Tools & methods</div>
        <div className="about-groups">
          {ABOUT_CONTENT.practiceGroups.map((group) => (
            <div key={group.label} className="about-group">
              <h3>{group.label}</h3>
              <p>{group.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Timeline</div>
        <div className="timeline">
          {ABOUT_CONTENT.timeline.map((item) => (
            <div key={`${item.when}-${item.title}`} className="timeline-item">
              <span className="when">{item.when}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Elsewhere</div>
        <div>
          <div className="about-links">
            {ABOUT_CONTENT.externalLinks.map((link) => {
              const isMailto = link.href.startsWith('mailto:');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isMailto ? undefined : '_blank'}
                  rel={isMailto ? undefined : 'noopener noreferrer'}
                  className="about-link-row"
                >
                  <span>{link.label}</span>
                  <span className="about-link-meta">{link.meta}</span>
                </a>
              );
            })}
          </div>
          <Link to="/contact" className="intro-more">
            Write me a note
          </Link>
        </div>
      </section>
    </>
  );
}
