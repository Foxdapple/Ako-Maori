using System;
using System.Collections.Generic;
using System.Linq;
using A2.Data;
using A2.Models;
using A2.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using A2.Helper;
using System.Globalization;

namespace A2.Controllers
{

    [Route("webapi")]
    [ApiController]
    public class A2Controller : Controller
    {
        private readonly IA2Repo _repository;

        public A2Controller(IA2Repo repository)
        {
            _repository = repository;
        }

        [HttpPost("Register")]
        public ActionResult<String> AddUser(User user)
        {
            String username = user.UserName;
            if (_repository.GetUserByUsername(username) == null)
            {
                _repository.AddUser(user);
                return Ok("User successfully registered");
            }
            string response = "UserName " + username + " not available.";
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Authentication")]
        [Authorize(Policy = "Org_User")]
        [HttpGet("PurchaseItem/{id}")]
        public ActionResult<PurchaseOutput> PurchaseItem(int id)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            Claim c = ci.FindFirst("normalUser");
            Product product = _repository.GetProduct(id);
            if (product == null)
            {
                string response = "Product " + id + " could not be found";
                return BadRequest(response); // product not found
            }
            if (c == null) // checks if user is authorised
            {
                c = ci.FindFirst("orgUser");
                if (c != null)
                {
                    return Forbid(); // return 403 response code (StatusCode(403) does the same)
                }
            }
            PurchaseOutput purchaseOutput = new PurchaseOutput { UserName = c.Value, ProductId = id };
            return Ok(purchaseOutput);

        }

        [Authorize(AuthenticationSchemes = "Authentication")]
        [Authorize(Policy = "Org_User")]
        [HttpPost("AddEvent")]
        public ActionResult<String> AddEvent(EventInput evnt)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            Claim c = ci.FindFirst("orgUser");
            if (c == null) // checks if the organiser is authorized
            {
                c = ci.FindFirst("normalUser");
                if (c != null) // checks if the user is a normal user
                {
                    return Forbid(); // valid credentials not organiser
                }
            }
            // finish code for creating an event.

            DateTime startDateTime;
            DateTime endDateTime;
            string format = "yyyyMMddTHHmmssZ";
            bool startDateValid = DateTime.TryParseExact(evnt.Start, format, 
                CultureInfo.CurrentCulture, DateTimeStyles.None, out startDateTime);
            bool endDateValid = DateTime.TryParseExact(evnt.End, format, 
                CultureInfo.CurrentCulture, DateTimeStyles.None, out startDateTime);
            if (!startDateValid && !endDateValid)
            {
                return BadRequest("The format of Start and End should be yyyyMMddTHHmmssZ.");
            }
            else if (!startDateValid)
            {
                return BadRequest("The format of Start should be yyyyMMddTHHmmssZ.");
            }
            else if (!endDateValid)
            {
                return BadRequest("The format of End should be yyyyMMddTHHmmssZ.");
            }
            Event new_event = new Event { Start = evnt.Start, End = evnt.End, 
                Summary = evnt.Summary, Description = evnt.Description, 
                Location = evnt.Location};
            _repository.AddEvent(new_event);
            return Ok("Success");
        }

        [Authorize(AuthenticationSchemes = "Authentication")]
        [Authorize(Policy = "Org_User")]
        [HttpGet("EventCount")]
        public ActionResult<int> EventCount()
        {
            IEnumerable<Event> events = _repository.GetAllEvents();
            return Ok(events.Count());
        }

        [Authorize(AuthenticationSchemes = "Authentication")]
        [Authorize(Policy = "Org_User")]
        [HttpGet("Event/{id}")]
        public ActionResult GetEvent(int id)
        {
            // need to use CalendarOutputFormatter
            Event evnt = _repository.GetEvent(id);
            if (evnt == null)
            {
                string response = "Event " + id + " does not exist.";
                return BadRequest(response);
            }
            Response.Headers.Add("Content-Type", "text/calendar");
            return Ok(evnt);
        }
    }
}