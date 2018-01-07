using ProjectManagement.Business;
using ProjectManagement.Entities;
using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManagement.API.Controllers
{
    public class TasksController : ApiController
    {
        // GET api/values
        public IEnumerable<Task> Get()
        {
            TasksBusiness tasksBusiness = new TasksBusiness();
            return tasksBusiness.GetTasks();
        }


        // POST api/values
        public bool Post([FromBody]Task value)
        {
            bool status = false;
            try
            {
                TasksBusiness tasksBusiness = new TasksBusiness();
                tasksBusiness.CreateTask(value);
                status = true;
            }
            catch
            {
                status = false;
                throw;
            }

            return status;
        }
    }
}
