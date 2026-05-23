import { useState } from "react";
// Using the component in a parent


interface Project {
  index: string;
  title: string;
  tags: string[];
  desc: string;
  metric: string;
  year: string;
  link?: string;
}



function Work( { p, i, worksVisible, hoveredProject, setHoveredProject }: { p: Project; i: number; worksVisible: boolean; hoveredProject: number | null; setHoveredProject: (index: number | null) => void} ) {
  //const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div
            key={p.index}
            className={`project-row ${worksVisible ? "project-row--visible" : "project-row--hidden"}`}
            style={{ transitionDelay: `${i * 0.11}s` }}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <span className="project__index">{p.index}</span>
            <div>
              <h3 className={`project__title ${hoveredProject === i ? "project__title--hovered" : ""}`}>
                {p.title}
              </h3>
              <div className="project__tags">
                {p.tags.map(t => <span key={t} className="project__tag">{t}</span>)}
              </div>
              <p className="project__desc">{p.desc}</p>
            </div>

            <div className="project__meta">
              <p className="project__metric">{p.metric}</p>
              <p className="project__year">{p.year}</p>
            </div>
          </div>
  );
}

export default Work;