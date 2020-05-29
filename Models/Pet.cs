using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hello_world.Models
{
    [Table("pet")]
    public class Pet
    {
        public uint PetId { get; set; }
        public uint EmployeeId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
