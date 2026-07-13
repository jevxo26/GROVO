
import { projects } from '@/data/project';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';


const ProjectPage = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectPage;