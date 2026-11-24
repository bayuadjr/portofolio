export default function About() {
  return (
    <>
      <section className="page-head">
        <h1>About</h1>
        <p>
          How I got curious about ordinary habits, small tools, and why people rarely act the way a spreadsheet expects.
        </p>
      </section>

      <section className="section">
        <div className="section-label">Background</div>
        <div className="section-body">
          <p>
            I'm Bayu Adji Ramadhan, an anthropology student at Universitas Brawijaya in Malang. I started out in vocational high school learning software engineering, then switched tracks to study people, culture, and everyday life.
          </p>
          <p>
            Fieldwork taught me not to jump too quickly from a neat pattern to a final conclusion. People bend rules, improvise, and mean different things by the same gesture depending on who is watching.
          </p>
          <p>
            Learning data analysis and building small web tools helps me look at those questions from another angle: spotting what repeats on paper, then stepping outside to understand why.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Where I started</div>
        <div className="timeline">
          <div className="timeline-item">
            <span className="when">Vocational School</span>
            <div>
              <h4>Software &amp; team habits</h4>
              <p>
                Studied software engineering and helped run sprints as a student Scrum Master. That was where I first learned how small teams divide work, disagree, and turn a rough sketch into something people can click.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">University</span>
            <div>
              <h4>Anthropology</h4>
              <p>
                Entered Universitas Brawijaya to study anthropology. Sitting through interviews and writing field notes changed how I look at numbers: behind every clean table there is someone with context, habits, and reasons of their own.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">Program Asah</span>
            <div>
              <h4>Working with data</h4>
              <p>
                Picked up Python, statistics, and machine learning through the Dicoding data program so I could explore social questions with code alongside qualitative notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Things I spend time on</div>
        <div className="skills-grid">
          <div>
            <h4>Fieldwork &amp; reading</h4>
            <ul>
              <li>Ethnographic observation</li>
              <li>Qualitative interviews</li>
              <li>Online communities</li>
              <li>Everyday social habits</li>
              <li>Writing field notes</li>
            </ul>
          </div>
          <div>
            <h4>Code &amp; data</h4>
            <ul>
              <li>Python, Pandas, NumPy</li>
              <li>Exploratory data analysis</li>
              <li>Basic statistics and modeling</li>
              <li>Small React web apps</li>
              <li>Offline-first tools</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
