internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
       {
           options.AddPolicy("AllowSpecificOrigins",
              builder =>
              {
                  builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
              });
       });


        var app = builder.Build();

        app.UseHttpsRedirection();


        app.MapGet("/courses", () =>
        {
            return CourseItem.getDummyCourses();
        });

        app.MapPost("/courses", (CourseItem course) =>
        {
            course.id = CourseItem.getDummyCourses().Length + 1;
            return course;
        });


        app.UseCors("AllowSpecificOrigins");
        app.Run();
    }
}

public class CourseItem
{
    public int id { get; set; }
    public string? department { get; set; }

    public string? name { get; set; }

    public CourseItem(int id, string department, string name)
    {
        this.id = id;
        this.department = department;
        this.name = name;
    }

    public static CourseItem[] getDummyCourses()
    {
        var courses = new CourseItem[3];
        courses[0] = new CourseItem(1, "CSE", "C#");
        courses[1]= new CourseItem(2, "CSE", "Java");
        courses[2] = new CourseItem(3, "CSE", "Python");

        return courses;
    }

}