using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hello_world.Models
{
    [Table("employee")]
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] 
        public uint EmployeeId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public bool MediaInteractiva { get; set; }

    }
}
