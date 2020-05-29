using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hello_world.Models;
using hello_world.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace hello_world.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VETController : ControllerBase
    {
        private readonly ILogger<VETController> _logger;
        private readonly Context _context;

        public VETController(ILogger<VETController> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [Route("/employees")]
        [HttpGet]
        public IEnumerable<EmployeeViewModel> GetEmployees()
        {
            return _context.Employees.ToList().Select(e => EmployeeToViewModel(e));
        }

        [Route("/employees/{employeeId}")]
        [HttpDelete("{employeeId}")]
        public IActionResult DeleteEmployee(uint employeeId)
        {
            try
            {
                var employee = _context.Employees.Where(e => e.EmployeeId == employeeId).FirstOrDefault();
                if (employee == null)
                {
                    _logger.LogError($"Employee with id: {employeeId}, hasn't been found in db.");
                    return NotFound();
                }

                _context.Employees.Remove(employee);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong deleting employee: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Route("/employees")]
        [HttpPost()]
        public IActionResult CreateEmployee(EmployeeViewModel e)
        {
            try
            {
                var employee = new Employee()
                {
                    EmployeeId = new uint(),
                    Name = e.Name,
                    LastName = e.LastName,
                    MediaInteractiva = e.MediaInteractiva
                };
                _context.Employees.Add(employee);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong adding a new employee: ", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [Route("/employees/edit/{employeeId}")]
        [HttpPut("{employeeId}")]
        public IActionResult ModifyEmployee(uint employeeId, Employee e)
        {
            try
            {
                e.EmployeeId = employeeId;
                _context.Employees.Update(e);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong modifing employee with ID: " + employeeId, ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [Route("/pets")]
        [HttpGet]
        public IEnumerable<PetViewModel> GetPets()
        {
            return _context.Pets.ToList().Select(p => PetToViewModel(p));
        }

        [Route("/pets/{petId}")]
        [HttpDelete("{petId}")]
        public IActionResult DeletePet(uint petId)
        {
            try
            {
                var pet = _context.Pets.Where(e => e.PetId == petId).FirstOrDefault();
                if (pet == null)
                {
                    _logger.LogError($"Pet with id: {petId}, hasn't been found in db.");
                    return NotFound();
                }

                _context.Pets.Remove(pet);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong deleting pet: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Route("/pets")]
        [HttpPost()]
        public IActionResult CreatePet(PetViewModel e)
        {
            try
            {
                var pet = new Pet()
                {
                    PetId = new uint(),
                    Name = e.Name,
                    Type = e.Type,
                    EmployeeId = Convert.ToUInt32(e.Employee)
                };
                _context.Pets.Add(pet);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong adding a new pet: ", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [Route("/pets/edit/{petId}")]
        [HttpPut("{petId}")]
        public IActionResult ModifyPet(uint petId, Pet p)
        {
            try
            {
                p.PetId = petId;
                _context.Pets.Update(p);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong modifing pet with ID: " + petId, ex);
                return StatusCode(500, "Internal server error");
            }
        }

        private int GetPetNumberByEmployee(Employee employee)
        {
            return _context.Pets.Where(p => p.EmployeeId == employee.EmployeeId).Count();
        }
        private string GetEmployeeByPet(Pet pet)
        {
            var employee = _context.Employees.Where(e => e.EmployeeId == pet.EmployeeId).FirstOrDefault();
            return employee.Name + " " + employee.LastName + " ( ID:" + employee.EmployeeId + " )";
        }
        private EmployeeViewModel EmployeeToViewModel(Employee e)
        {
            var petsOwned = GetPetNumberByEmployee(e);
            return new EmployeeViewModel()
            {
                EmployeeId = e.EmployeeId,
                LastName = e.LastName,
                MediaInteractiva = e.MediaInteractiva,
                Name = e.Name,
                PetsOwned = petsOwned
            };
        }
        private PetViewModel PetToViewModel(Pet e)
        {
            var owner = GetEmployeeByPet(e);
            return new PetViewModel()
            {
                PetId = e.PetId,
                Employee = owner,
                Type = e.Type,
                Name = e.Name,
                EmployeeId = e.EmployeeId.ToString()
            };
        }
    }
}
