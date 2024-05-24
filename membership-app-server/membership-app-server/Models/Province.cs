using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace membership_app_server.Models
{
    public class Province
    {
        public int id { get; set; }
        public string name { get; set; }

        public ICollection<City> Cities { get; set; }
    }
}