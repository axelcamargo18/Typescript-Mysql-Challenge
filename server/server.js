"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mysql_1 = require("mysql");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var port = 3000;
var connection = mysql_1["default"].createConnection({
    host: "localhost",
    user: "root2",
    password: "password",
    database: "classicmodels"
});
app.get("/", function (req, res) {
    connection.query("SELECT * FROM classicmodels.customers", function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.post("/", function (req, res) {
    connection.query("INSERT INTO customers (`customerNumber`,`customerName`,`contactLastName`,`contactFirstName`,`phone`,`addressLine1`,`addressLine2`,`city`,`state`,`postalCode`,`country`,`salesRepEmployeeNumber`,`creditLimit`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
    ], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        req.body.id = result.insertId;
        res.status(200).json(req.body).end();
    });
});
app.get("/:id", function (req, res) {
    connection.query("SELECT * FROM customers WHERE customerNumber = ?", [req.params.id], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    });
});
app.put("/:id", function (req, res) {
    connection.query("UPDATE customers SET customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?, salesRepEmployeeNumber = ?, creditLimit = ? WHERE customerNumber = ?", [
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
    ], function (err) {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }
    });
});
