using A2.Models;
using A2.Dtos;

namespace A2.Data
{
    public interface IA2Repo
    {
        public User AddUser(User user);

        public User GetUserByUsername(string u);

        public Product GetProduct(int id);

        public Organizer GetOrganiserByUsername(string o);
        public Event AddEvent(Event evnt);
        public bool ValidUserLogin(string userName, string password);
        public bool ValidOrganiserLogin(string userName, string password);
        public IEnumerable<Event> GetAllEvents();
        public Event GetEvent(int id);

    }
}