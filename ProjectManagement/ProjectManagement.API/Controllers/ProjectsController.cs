using ProjectManagement.Business;
using ProjectManagement.Entities;
using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManagement.API.Controllers
{
    public class ProjectsController : ApiController
    {
        // GET: api/Projects
        public IEnumerable<Project> Get()
        {
            ProjectsBusiness projectsBusiness = new ProjectsBusiness();
            return projectsBusiness.GetProjects();
        }

        // GET: api/Projects/5
        public Project Get(int id)
        {
            ProjectsBusiness projectsBusiness = new ProjectsBusiness();
            return projectsBusiness.GetProjectByID(id);
        }

        // POST: api/Projects
        public bool Post([FromBody]Project value)
        {
            bool status = false;
            try
            {
                ProjectsBusiness projectsBusiness = new ProjectsBusiness();
                projectsBusiness.CreateProject(value);
                status = true;
            }
            catch
            {
                status = false;
            }

            return status;
        }

        // PUT: api/Projects/5
        public Project Put(int id, [FromBody]Project value)
        {
            ProjectsBusiness projectsBusiness = new ProjectsBusiness();
            return projectsBusiness.UpdateProject(id, value);
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
            ProjectsBusiness projectsBusiness = new ProjectsBusiness();
            projectsBusiness.DeleteProject(id);
        }
    }
}
