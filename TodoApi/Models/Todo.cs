namespace TodoApi.Models;

public class Todo
{
    public long Id { get; set; } = 0;

    public string? Title { get; set; } = null;

    public bool Completed { get; set; } = false;
}
