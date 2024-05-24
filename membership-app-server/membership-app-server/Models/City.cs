using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace membership_app_server.Models
{
    public class City
    {
        public int id { get; set; }
        [ForeignKey("Province")]
        public int province_id { get; set; }
        public string name {  get; set; }

        public Province Province { get; set; }
    }
}