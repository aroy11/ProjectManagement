using ProjectManagement.Data;
using ProjectManagement.Entities;
using System.Collections.Generic;

namespace ProjectManagement.Business
{
    public class ProjectsBusiness
    {
        public IEnumerable<Project> GetProjects()
        {
            IEnumerable<Project> resultsList = null;

            ProjectsDAC projectsData = new ProjectsDAC();
            resultsList = projectsData.Select();

            return resultsList;
        }

        public Project GetProjectByID(int projectID)
        {
            Project project = null;

            ProjectsDAC projectsData = new ProjectsDAC();
            project = projectsData.SelectProject(projectID);

            return project;
        }

        public IEnumerable<Project> GetProjectByName(string projectName)
        {
            IEnumerable<Project> projects = null;

            ProjectsDAC projectsData = new ProjectsDAC();
            projects = projectsData.SelectByName(projectName);

            return projects;
        }

        public Project CreateProject(Project project)
        {
            Project newProject = null;

            ProjectsDAC projectsData = new ProjectsDAC();
            newProject = projectsData.Create(project);

            return newProject;
        }

        public Project UpdateProject(int id, Project project)
        {
            Project newProject = null;

            ProjectsDAC projectsData = new ProjectsDAC();
            newProject = projectsData.Update(id, project);

            return newProject;
        }

        public void DeleteProject(int ID)
        {
            ProjectsDAC projectsData = new ProjectsDAC();
            projectsData.Delete(ID);
        }
    }
}
