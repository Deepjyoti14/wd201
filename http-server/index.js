const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

let homeContent = "";
let projectContent = "";
let registrationFormContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, registrationForm) => {
  if (err) {
    throw err;
  }
  registrationFormContent = registrationForm;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationFormContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
