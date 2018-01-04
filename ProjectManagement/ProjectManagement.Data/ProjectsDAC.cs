using ProjectManagement.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace ProjectManagement.Data
{
    public class ProjectsDAC
    {
        public List<Project> Select()
        {
            List<Project> resultsList = null;

            ProjectManagementEntities ctx = new ProjectManagementEntities();
            resultsList = ctx.Projects.ToList();

            return resultsList;
        }

        public Project SelectProject(int projectId)
        {
            Project project = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            project = ctx.Projects.FirstOrDefault(x => x.Project_ID == projectId);

            return project;
        }

        public IEnumerable<Project> SelectByName(string projectName)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            IEnumerable<Project> projects = ctx.Projects.Where(c => string.Equals(c.Project_Name, projectName, StringComparison.OrdinalIgnoreCase));

            return projects;
        }

        public Project Create(Project project)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;

            try
            {
                ctx.Projects.AddObject(project);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                throw;
            }

            return project;
        }

        public Project Update(int id, Project project)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            Project proj = null;
            try
            {
                proj = ctx.Projects.FirstOrDefault(x => x.Project_ID == id);
                proj.Project_Name = project.Project_Name;
                proj.Start_Date = project.Start_Date;
                proj.End_Date = project.End_Date;
                proj.Priority = project.Priority;
                proj.Manager = project.Manager;
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                throw;
            }

            return proj;
        }

        public void Delete(int Id)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            Project project = ctx.Projects.FirstOrDefault(c => c.Project_ID == Id);
            ctx.DeleteObject(project);
            ctx.SaveChanges();
        }
    }
}
