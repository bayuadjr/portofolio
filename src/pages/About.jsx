export default function About() {
  return (
    <>
      <section className="page-head">
        <h1>About</h1>
        <p>
          what can we learn about people when we change the way we look at them?
        </p>
      </section>

      <section className="section">
        <div className="section-label">Profile</div>
        <div className="section-body">
          <p>
            I am Bayu Adji Ramadhan, an Anthropology student at Universitas Brawijaya. My background
            started in technology and software development in vocational high school (SMK), then continued into anthropology. Now I am
            trying to bring the two together through data science and computational social science.
          </p>
          <p>
            Anthropology taught me not to rush to take a pattern as an answer. In the field,
            context often changes the meaning of an action. Data gives me another way to see patterns on a larger scale.
          </p>
          <p>
            Because of that, I am interested in using computational approaches not to replace anthropological research,
            but to find patterns and questions that might be hard to see from just one approach.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Where I Come From</div>
        <div className="timeline">
          <div className="timeline-item">
            <span className="when">SMK</span>
            <div>
              <h4>Technology</h4>
              <p>
                I started my journey in vocational high school (SMK) with a background in Software Engineering and experience as a Scrum Master.
                From there, I learned about software, project management, division of work, and how an idea turns into something that can actually be used.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">UB</span>
            <div>
              <h4>Anthropology</h4>
              <p>
                At Universitas Brawijaya, I then entered the world of anthropology.
                Fieldwork, ethnography, and qualitative research changed the way I see technology and data. Behind numbers and systems, there are always humans who have their own context, interests, habits, and ways of thinking.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="when">MBKM</span>
            <div>
              <h4>Data Science</h4>
              <p>
                Now I am expanding that way of working with data science.
                Through Program Asah, namely the Dicoding Data Science Specialist, I am learning Python, data analysis, statistics, machine learning, and computing fundamentals to start working on social issues with a more experimental approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">What I'm Exploring</div>
        <div className="skills-grid">
          <div>
            <h4>People & Society</h4>
            <ul>
              <li>Ethnographic fieldwork</li>
              <li>Qualitative research</li>
              <li>Digital society</li>
              <li>Social behavior</li>
              <li>Discourse and interaction</li>
            </ul>
          </div>
          <div>
            <h4>Data & Computation</h4>
            <ul>
              <li>Python — Pandas, NumPy, OOP</li>
              <li>Machine learning</li>
              <li>Computational social science</li>
              <li>Statistics</li>
              <li>Data analysis</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
