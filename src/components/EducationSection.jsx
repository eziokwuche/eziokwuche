import education from "@/data/education";

function schoolInitials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function EducationSection() {
  return (
    <ul className="education-list">
      {education.map((item) => (
        <li
          className="education-list__item"
          key={`${item.institution}-${item.period}`}
        >
          {item.logo ? (
            <span className="education-list__logo">
              <img src={item.logo} alt="" />
            </span>
          ) : (
            <span
              className="education-list__logo education-list__logo--initials"
              aria-hidden
            >
              {schoolInitials(item.institution)}
            </span>
          )}
          <div className="education-list__body">
            {item.institutionUrl ? (
              <a
                className={[
                  "education-list__school",
                  item.linkTheme && `education-list__school--${item.linkTheme}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                href={item.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.institution}
              </a>
            ) : (
              <span className="education-list__school">{item.institution}</span>
            )}
            <span className="education-list__credential">
              {item.credential}
            </span>
          </div>
          <span className="education-list__period">{item.period}</span>
        </li>
      ))}
    </ul>
  );
}
