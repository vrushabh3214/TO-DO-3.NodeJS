const exppress = require("express");
const app = exppress();
const path = require("path");
const post = 3000;
// In-memory tasks storage
let tasks = {
    ongoing: [],
    completed: [],
  };


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(exppress.urlencoded({ extended: true }));

// Routes

// Render Home Page
app.get("/", (req, res) => {
    res.render("home", { tasks });
    console.log(tasks);
 });
// app.post("/", (req, res) => { });

// Add Task
app.post('/add', (req, res) => {
    const id = crypto.randomUUID();
    if (!req.query.id) {
      const data = { task: req.body.task, type: req.body.type, dueDate: req.body.dueDate, id };
      if (data.task && data.type) tasks[data.type].push((data));
  
      console.log("28", data);
  
      res.redirect('/');
    }
  });

  // Move Task (Ongoing to Completed)
app.post('/move', (req, res) => {
    const { task, from, to, dueDate, id } = req.body;
    if (tasks[from] && tasks[to]) {
      // Remove task from the current list
      tasks[from]= tasks[from].filter(t => t.id !== id);
      // Add task to the target list
      tasks[to].push(req.body);
    }
    res.redirect('/');
  });
  
  // Delete Task
  app.post('/delete', (req, res) => {
    const { task, type, id } = req.body;
    if (tasks[type]) {
      tasks[type] = tasks[type].filter(t => t.id !== id);
    }
    res.redirect('/');
  });

app.listen(post, () => {
    console.log(`Server is running on port ${post}`);
});