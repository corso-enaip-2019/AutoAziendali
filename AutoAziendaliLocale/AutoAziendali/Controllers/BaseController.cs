using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AutoAziendali.Controllers
{
    public abstract class BaseController : ApiController
    {
        protected readonly CarDbEntities _context;

        protected BaseController()
        {
            _context = new CarDbEntities();
        }
    }
}