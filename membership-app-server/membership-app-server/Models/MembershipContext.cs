using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace membership_app_server.Models
{
    public class MembershipContext : DbContext
    {
        public MembershipContext() : base("name=MembershipContext")
        {

        }

        public DbSet<Member> Members { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<City> Cities { get; set;}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>().HasRequired(p=>p.Province).WithMany(c=>c.Cities).HasForeignKey(p=>p.province_id);
            base.OnModelCreating(modelBuilder);
        }
    }
}