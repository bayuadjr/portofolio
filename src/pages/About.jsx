export default function About() {
  return (
    <>
      <section className="page-head">
        <h1>About</h1>
        <p>
          Mostly curious about everyday habits and why people rarely behave the way a neat chart predicts.
        </p>
      </section>

      <section className="section">
        <div className="section-label">Story</div>
        <div className="section-body">
          <p>
            I study anthropology at Universitas Brawijaya. Before that I learned software in vocational school, so I tend to wander back and forth between writing field notes and writing code.
          </p>
          <p>
            Fieldwork slows me down in a good way. Something that looks obvious from a distance usually gets stranger once you sit down with the people living it.
          </p>
          <p>
            Working with data gives me a wider look, while talking to people keeps me honest about what a table leaves out.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">So far</div>
        <div className="timeline">
          <div className="timeline-item">
            <span className="when">Vocational school</span>
            <div>
              <h4>Learning to build</h4>
              <p>
                Where I picked up programming and saw how messy ideas turn into working tools.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">Universitas Brawijaya</span>
            <div>
              <h4>Anthropology</h4>
              <p>
                Fieldwork, interviews, and paying closer attention to unwritten rules.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">Lately</span>
            <div>
              <h4>Data and small tools</h4>
              <p>
                Using Python and small web apps to explore social questions alongside qualitative notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
