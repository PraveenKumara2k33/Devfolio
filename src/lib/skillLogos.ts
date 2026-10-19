/**
 * Map of skill/technology names to their authentic SVG/image assets.
 * Sourced from the user's asset collection in /public/assets/skills.
 */
export const skillLogos: Record<string, string> = {
  // Frontend
  'React': '/assets/skills/react.svg',
  'React.js': '/assets/skills/react.svg',
  'React 18/19': '/assets/skills/react.svg',
  'TypeScript': '/assets/skills/TypeScript.svg',
  'JavaScript': '/assets/skills/javascript-svg.svg',
  'HTML5': '/assets/skills/html-5.svg',
  'HTML': '/assets/skills/html-5.svg',
  'CSS3': '/assets/skills/css3.svg',
  'CSS': '/assets/skills/css3.svg',
  'SCSS': '/assets/skills/light-sass.svg',
  'Tailwind CSS': '/assets/skills/tailwind.svg',
  'Tailwind': '/assets/skills/tailwind.svg',
  'Bootstrap': '/assets/skills/bootstrap.svg',
  'Vite': '/assets/skills/reactjs.svg',
  'Angular': '/assets/skills/angular.svg',
  'Redux': '/assets/skills/redux.svg',
  'Redux Toolkit': '/assets/skills/redux.svg',
  'RTK Query': '/assets/skills/redux.svg',
  'React Router': '/assets/skills/react.svg',
  'React Hook Form': '/assets/skills/react.svg',
  'Zod': '/assets/skills/Authentication.svg',

  // Backend
  'Python': '/assets/skills/python.svg',
  'FastAPI': '/assets/skills/fastapi.svg',
  'SQLAlchemy': '/assets/skills/python.svg',
  'Pydantic': '/assets/skills/python.svg',
  'Alembic': '/assets/skills/python.svg',
  'Uvicorn': '/assets/skills/fastapi.svg',
  'Java': '/assets/skills/java-svg.svg',
  'Spring Boot': '/assets/skills/spring-boot.svg',
  'Servlets': '/assets/skills/servlet.svg',
  'Servlet': '/assets/skills/servlet.svg',
  'JSP': '/assets/skills/jsp.svg',
  'Hibernate': '/assets/skills/java-svg.svg',
  'Node.js': '/assets/skills/nodejs.svg',
  'PHP': '/assets/skills/php.svg',

  // Database
  'PostgreSQL': '/assets/skills/postgresql.svg',
  'MySQL': '/assets/skills/mysql.svg',
  'Oracle': '/assets/skills/oracle.svg',
  'Oracle Database': '/assets/skills/oracle.svg',
  'SQL': '/assets/skills/mysql.svg',
  'MVC Architecture': '/assets/skills/java-svg.svg',

  // Cloud & DevOps
  'AWS': '/assets/skills/awsblack.svg',
  'ECS Fargate': '/assets/skills/awsblack.svg',
  'S3': '/assets/skills/awsblack.svg',
  'CloudFront': '/assets/skills/awsblack.svg',
  'API Gateway': '/assets/skills/awsblack.svg',
  'KMS': '/assets/skills/awsblack.svg',
  'Docker': '/assets/skills/Docker.svg',
  'Git': '/assets/skills/git-merge.svg',
  'GitHub': '/assets/skills/github.svg',
  'Postman': '/assets/skills/postman.svg',
  'VS Code': '/assets/skills/vscode3.svg',
  'Eclipse': '/assets/skills/eclipse.svg',

  // Specialties
  'WordPress': '/assets/skills/wordpress.svg',
  'DSA': '/assets/skills/DSA.svg',
  'Data Structures': '/assets/skills/DSA.svg',
  'Authentication': '/assets/skills/Authentication.svg',
  'JWT': '/assets/skills/Jwt.svg',
  'Socket.IO': '/assets/skills/nodejs.svg',
  'AI Integration': '/assets/skills/Authentication.svg',
}

export function getSkillLogo(name: string): string | undefined {
  if (skillLogos[name]) return skillLogos[name]
  for (const [key, logo] of Object.entries(skillLogos)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return logo
    }
  }
  return undefined
}
