using membership_app_server.Models;
using membership_app_server.Services;
using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;

namespace membership_app_server
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IMemberService, MemberService>(new HierarchicalLifetimeManager());
            container.RegisterType<IProvinceService, ProvinceService>(new HierarchicalLifetimeManager());
            container.RegisterType<ICityService, CityService>(new HierarchicalLifetimeManager());
            container.RegisterType<MembershipContext>(new HierarchicalLifetimeManager());

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}