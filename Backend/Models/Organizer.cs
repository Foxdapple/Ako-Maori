﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace A2.Models
{
    public class Organizer
    {
        [Key]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

    }

}