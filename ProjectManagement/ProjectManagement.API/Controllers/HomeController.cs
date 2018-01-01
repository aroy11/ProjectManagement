using System.Web.Http;
using System.Web.Mvc;

namespace ProjectManagement.API.Controllers
{
    public class HomeController : ApiController
    {
        public string Index()
        {
            string title = "Home Page";

            return title;
        }
    }
}
