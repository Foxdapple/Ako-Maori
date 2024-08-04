using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using A2.Dtos;
using A2.Models;

namespace A2.Helper;

public class CalendarOutputFormatter : TextOutputFormatter
{
    public CalendarOutputFormatter()
    {
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/calendar"));
        SupportedEncodings.Add(Encoding.UTF8);
    }

    public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
    {
        DateTime localDate = DateTime.Now;
        Event evnt = (Event)context.Object;
        StringBuilder builder = new StringBuilder();
        builder.AppendLine("BEGIN:VCALENDAR");
        builder.AppendLine("VERSION:2.0");
        builder.AppendLine("PRODID:ahea795");
        builder.AppendLine("BEGIN:VEVENT");
        builder.Append("UID:").AppendLine(evnt.Id + "");
        builder.Append("DTSTAMP:").AppendLine(localDate.ToString());
        builder.Append("DTSTART:").AppendLine(evnt.Start);
        builder.Append("DTEND:").AppendLine(evnt.End);
        builder.Append("SUMMARY:").AppendLine(evnt.Summary);
        builder.Append("DESCRIPTION:").AppendLine(evnt.Description);
        builder.Append("LOCATION:").AppendLine(evnt.Location);
        builder.AppendLine("END:VEVENT");
        builder.AppendLine("END:VCALENDAR");
        string outString = builder.ToString();
        byte[] outBytes = selectedEncoding.GetBytes(outString);
        var response = context.HttpContext.Response.Body;
        return response.WriteAsync(outBytes, 0, outBytes.Length);
    }
}