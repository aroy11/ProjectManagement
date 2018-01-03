using ProjectManagement.Business;
using ProjectManagement.Entities;
using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManagement.API.Controllers
{
    public class ParentTasksController : ApiController
    {
        // GET: api/ParentTasks
        public IEnumerable<ParentTask> Get()
        {
            ParentTasksBusiness parentTasksBusiness = new ParentTasksBusiness();
            return parentTasksBusiness.GetParentTasks();
        }

        // GET: api/ParentTasks/5
        public ParentTask Get(int id)
        {
            ParentTasksBusiness parentTasksBusiness = new ParentTasksBusiness();
            return parentTasksBusiness.GetParentTaskByID(id);
        }

        // POST: api/ParentTasks
        public bool Post([FromBody]ParentTask value)
        {
            bool status = false;
            try
            {
                ParentTasksBusiness parentTasksBusiness = new ParentTasksBusiness();
                parentTasksBusiness.CreateParentTask(value);
                status = true;
            }
            catch
            {
                status = false;
                throw;
            }

            return status;
        }

        // PUT: api/ParentTasks/5
        public ParentTask Put(int id, [FromBody]ParentTask value)
        {
            ParentTasksBusiness parentTasksBusiness = new ParentTasksBusiness();
            return parentTasksBusiness.UpdateParentTask(id, value);
        }

        // DELETE: api/ParentTasks/5
        public void Delete(int id)
        {
            ParentTasksBusiness parentTasksBusiness = new ParentTasksBusiness();
            parentTasksBusiness.DeleteParentTask(id);
        }

    }
}
