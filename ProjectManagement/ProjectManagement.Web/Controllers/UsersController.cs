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


        // POST: api/Users
        public bool Post([FromBody]User value)
        {
            bool status = false;
            try
            {
                UsersBusiness usersBusiness = new UsersBusiness();
                usersBusiness.CreateUser(value);
                status = true;
            }
            catch
            {
                status = false;
                throw;
            }

            return status;
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
            UsersBusiness usersBusiness = new UsersBusiness();
            usersBusiness.DeleteUser(id);
        }
    }
}
