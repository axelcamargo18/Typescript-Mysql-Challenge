
import express, { Express, Request, Response } from "express";
import mysql, { Connection, MysqlError } from "mysql";

const app: Express = express();

app.use(express.json());
const port: number = 3000;

const connection: Connection = mysql.createConnection({
  host: "localhost",
  user: "root2",
  password: "password",
  database: "classicmodels",
});

app.get("/", (req: Request, res: Response) => {
  connection.query(
    "SELECT * FROM classicmodels.customers",
    (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
      res.status(200).json(result).end();
    }
  );
});

app.post("/", (req: Request, res: Response) => {
  connection.query(
    "INSERT INTO customers (`customerNumber`,`customerName`,`contactLastName`,`contactFirstName`,`phone`,`addressLine1`,`addressLine2`,`city`,`state`,`postalCode`,`country`,`salesRepEmployeeNumber`,`creditLimit`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.customerNumber,
      req.body.customerName,
      req.body.contactLastName,
      req.body.contactFirstName,
      req.body.phone,
      req.body.addressLine1,
      req.body.addressLine2,
      req.body.city,
      req.body.state,
      req.body.postalCode,
      req.body.country,
      req.body.salesRepEmployeeNumber,
      req.body.creditLimit
    ],
    (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).end();

        return;
      }

      req.body.id = result.insertId;
      res.status(200).json(req.body).end();
    }
  );
});

app.get("/:id", (req: Request, res: Response) => {
  connection.query(
    "SELECT * FROM customers WHERE customerNumber = ?",
    [req.params.id],
    (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
      res.status(200).json(result).end();
    }
  );
});

app.put("/:id", (req: Request, res: Response) => {
  connection.query(
    "UPDATE customers SET customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?, salesRepEmployeeNumber = ?, creditLimit = ? WHERE customerNumber = ?",
    [
      req.body.customerName,
      req.body.contactLastName,
      req.body.contactFirstName,
      req.body.phone,
      req.body.addressLine1,
      req.body.addressLine2,
      req.body.city,
      req.body.state,
      req.body.postalCode,
      req.body.country,
      req.body.salesRepEmployeeNumber,
      req.body.creditLimit,
      req.params.id
    ],
    (err: MysqlError | null) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
  } 
})