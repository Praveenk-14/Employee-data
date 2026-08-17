 

const express = require("express");
const app = express();
app.use(express.json());
let employee = [
    { id: 1, name: "Anand", dept: "sales" },
    { id: 2, name: "Kiran", dept: "HR" },
    { id: 3, name: "Abhi", dept: "Account" }
];
app.get("/employee", (req, resp) => {
    resp.json(employee);
});
app.get("/employee/:id", (req, resp) => {
    let empid = req.params.id;
    const e = employee.find((e) => {
        return e.id == empid;
    });

    if (e) {
        resp.json(e);
    } else {
        resp.status(404).json({ "message": "Employee record not found"});
    }
});

app.post("/employee", (req, resp) => {
    let id = req.body.id;
    let name = req.body.name;
    let dept = req.body.dept;

    let e = {
        id: id,
        name: name,
        dept: dept
    };

    employee.push(e);
    resp.status(201).json({"message": "New employee created","employee": e});
});

app.put("/employee/:id", (req, resp) => {
    let empid = req.params.id;
    let index = employee.findIndex((e) => {
        return e.id == empid;
    });

    if (index != -1) {
        let name = req.body.name;
        let dept = req.body.dept;

        let e = {
            id: Number(empid),
            name: name,
            dept: dept
        };

        employee[index] = e;

        resp.json({ "message": "Employee record updated","employee": e});
    } else {
        resp.status(404).json({"message": "Employee record not found"});
    }
});
app.delete("/employee/:id", (req, resp) => {
    let empid = req.params.id;

    let e = employee.find((e) => {
        return e.id == empid;
    });

    if (e) {employee = employee.filter((e) => {
            return e.id != empid;
        });

        resp.json({"message": "Employee record deleted"});
    } else {
        resp.status(404).json({"message": "Employee record not found"});
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});