using A2.Data;
using A2.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Xml.Linq;

namespace A2.Data
{
    public class A2Repo : IA2Repo
    {
        private readonly A2DbContext _dbContext;
        public A2Repo(A2DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User AddUser(User user)
        {
            EntityEntry<User> e = _dbContext.Users.Add(user);
            User u = e.Entity;
            _dbContext.SaveChanges();
            return u;
        }

        public Event AddEvent(Event evnt)
        {
            EntityEntry<Event> e = _dbContext.Events.Add(evnt);
            Event ev = e.Entity;
            _dbContext.SaveChanges();
            return ev;
        }

        public bool ValidUserLogin(string userName, string password)
        {
            User u = _dbContext.Users.FirstOrDefault(e => e.UserName == userName && e.Password == password);
            if (u == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public bool ValidOrganiserLogin(string userName, string password)
        {
            Organizer o = _dbContext.Organizers.FirstOrDefault(e => e.Name == userName && e.Password == password);
            if (o == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public User GetUserByUsername(string u)
        {
            User user = _dbContext.Users.FirstOrDefault(e => e.UserName == u);
            return user;
        }

        public Organizer GetOrganiserByUsername(string o)
        {
            Organizer organiser = _dbContext.Organizers.FirstOrDefault(e => e.Name == o);
            return organiser;
        }

        public Product GetProduct(int id)
        {
            Product product = _dbContext.Products.FirstOrDefault(e => e.Id == id);
            return product;
        }

        public IEnumerable<Event> GetAllEvents()
        {
            IEnumerable<Event> events = _dbContext.Events.ToList<Event>();
            return events;
        }

        public Event GetEvent(int id)
        {
            Event evnt = _dbContext.Events.FirstOrDefault(e => e.Id == id);
            return evnt;

        }
    }
}