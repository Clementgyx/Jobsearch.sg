const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//imported
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//register and login routes
app.use("/authentication", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//ROUTES

//create a new job
app.post("/joblist", async (req, res) => {
  try {
    const { company, job_position, job_description } = req.body;
    const newjob = await pool.query(
      "INSERT INTO joblist (company, job_position, job_description) VALUES($1, $2, $3) RETURNING *",
      [company, job_position, job_description]
    );

    res.json(newjob.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all jobs

app.get("/joblist", async (req, res) => {
  try {
    const allJobs = await pool.query("SELECT * FROM joblist");
    res.json(allJobs.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));

//get a specific job

app.get("/joblist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await pool.query("SELECT * FROM joblist WHERE job_id = $1", [
      id,
    ]);

    res.json(job.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update the specific job

app.put("/joblist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company, job_position, job_description } = req.body;
    const updateJob = await pool.query(
      "UPDATE joblist SET company=$1, job_position=$2, job_description=$3 WHERE job_id = $4",
      [company, job_position, job_description, id]
    );

    res.json("Job was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a specific job

app.delete("/joblist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteJob = await pool.query(
      "DELETE FROM joblist WHERE job_id = $1",
      [id]
    );
    res.json("Job was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
