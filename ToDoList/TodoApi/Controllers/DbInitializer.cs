using Microsoft.AspNetCore.Identity;

namespace TodoApi.Models
{
    public class DbInitializer
    {
        public static async Task Initialize(TodoContext context, IWebHostEnvironment environment)
        {
            context.Database.EnsureCreated();
            SeedTodos(context);
        }

        private static void SeedTodos(TodoContext context)
        {
            if (context.Todos.Any())
            {
                return;   // DB has been seeded
            }
            var todoList = new List<Todo>();
            for (int i = 0; i < 5; i++)
            {
                int id = i + 1;
                var todo = new Todo();
                todo.Id = id;
                todo.Title = $"Task {id}";
                todo.Completed = false;
                todoList.Add(todo);
            }

            context.Todos.AddRange(todoList);
            context.SaveChanges();
        }
    }
}
