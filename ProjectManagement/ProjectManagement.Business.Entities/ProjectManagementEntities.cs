using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ProjectManagement.Entities
{
    public partial class ProjectManagementEntities
    {
        public static ProjectManagementEntities Context
        {
            get
            {
                string objectContextKey = HttpContext.Current.GetHashCode().ToString("x");
                if (!HttpContext.Current.Items.Contains(objectContextKey))
                {
                    HttpContext.Current.Items.Add(objectContextKey, new ProjectManagementEntities());
                }
                return HttpContext.Current.Items[objectContextKey] as ProjectManagementEntities;
            }
        }
    }
}
