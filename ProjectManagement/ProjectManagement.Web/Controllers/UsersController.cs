using ProjectManagement.Business;
using ProjectManagement.Entities;
using System.Collections.Generic;
using System.Web.Http;

namespace ProjectManagement.API.Controllers
{
    public class UsersController : ApiController
    {
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            UsersBusiness userBusiness = new UsersBusiness();
            return userBusiness.GetUsers();
        }

        // GET: api/Users/5
        public User Get(int id)
        {
            return new User();
        }

        // POST: api/Users
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
    }
}
