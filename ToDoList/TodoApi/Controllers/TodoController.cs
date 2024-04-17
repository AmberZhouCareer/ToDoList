using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly ILogger _logger;

        public TodoController(TodoContext context, ILogger<TodoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(GetAllTodos)}");
            return await _context.Todos.ToListAsync();
        }

        // GET: api/Todo/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetActiveTodos()
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(GetActiveTodos)}");
            return await _context.Todos.Where(x => !x.Completed).ToListAsync();
        }

        // GET: api/Todo/done
        [HttpGet("done")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetCompletedTodos()
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(GetCompletedTodos)}");
            return await _context.Todos.Where(x => x.Completed).ToListAsync();
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(long id)
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(GetTodo)}");
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        // PUT: api/Todo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(long id, Todo todo)
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(PutTodo)}");
            if (id != todo.Id)
            {
                return BadRequest();
            }

            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Todo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(PostTodo)}");
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(long id)
        {
            _logger.LogInformation($"{DateTime.Now.ToString()}: Entering {nameof(DeleteTodo)}");
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoExists(long id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
