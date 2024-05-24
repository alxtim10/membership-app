using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace membership_app_server.Models
{
    public class Member
    {
        public int id {  get; set; }
        public string name { get; set; }
        public string place_of_birth { get; set; }
        public DateTime date_of_birth { get; set; }
        public string phone_number {  get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string province { get; set; }
        public string city { get; set; }
        public string gender { get; set; }
        public string job { get; set; }
        public string status { get; set; }

    }
}