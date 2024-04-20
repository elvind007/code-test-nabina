import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


router.post("/adminlogin", (req, res) => {
    console.log("Request Body:", req.body); 
  
    const sql = "SELECT * from allusers Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) {
        console.error("Database Query Error:", err); 
        return res.json({ loginStatus: false, Error: "Query error" });
      }
       if (result.length > 0) {
        // Directly compare entered password with stored hash
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
          if (err) {
            console.error("Password Comparison Error:", err); 
            return res.json({ loginStatus: false, Error: "Wrong Password" });
          }
          console.log("Password Comparison Response:", response); 
  
          if(response) {
            const userRole = result[0].role;
                const email = result[0].email;
                const id = result[0].id;
                console.log("Retrieved ID:", id);
                const token = jwt.sign(
                    { role: userRole, email: email, id: result[0].id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                res.cookie('currentUserId', result[0].id, { httpOnly: true }); 
                
                if (userRole === "ADMIN") {
                    return res.json({ loginStatus: true, role: "ADMIN",id:result[0].id });
                } else if (userRole === "HR") {
                    return res.json({ loginStatus: true, role: "HR",id:result[0].id });
                } else if (userRole === "EMPLOYEE") {
                    return res.json({ loginStatus: true, role: "EMPLOYEE" ,id:result[0].id});
                } else {
                    return res.json({ loginStatus: false, Error: "Invalid role" });
                }// ... (rest of your logic to generate token, set cookies etc.) 
          } else {
            return res.json({ loginStatus: false, Error:"wrong email or password" });
          }
        });
      } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})


// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end image upload 

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO allusers
    (name, lname,email,password,category_id,role,image) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})        
        const values = [
            req.body.name,
            req.body.lname,
            req.body.email,
            hash, 
            req.body.category_id,
            req.body.role,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM allusers";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT name,lname,email,category_id,role FROM allusers WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    let sql;
    let values;
    
    // Check if a new password is provided
    if (req.body.password) {
        // Hash the new password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ Status: false, Error: "Internal server error" });
            }
            console.log("Hashed password:", hash); // Log the hashed password
            // Construct the SQL query and values for updating with the new password
            sql = `UPDATE allusers SET name=?, lname=?, email=?,  password=?, category_id=?, role=? WHERE id=?`;
            values = [
                req.body.name,
                req.body.lname,
                req.body.email,
                hash,
                req.body.category_id,
                req.body.role,
                id    
            ];
            console.log("SQL query:", sql); // Log the SQL query
            console.log("SQL values:", values); // Log the SQL values
            // Execute the SQL query
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error updating employee:", err);
                    return res.status(500).json({ Status: false, Error: "Query Error" });
                }
                console.log("Update result:", result); // Log the result of the update query
                // Check if any rows were affected by the update
                if (result.affectedRows > 0) {
                    return res.json({ Status: true, Message: "Employee updated successfully" });
                } else {
                    return res.json({ Status: false, Error: "Employee not found or no changes made" });
                }
            });
        });
    } else {
        // Construct the SQL query and values for updating without changing the password
        sql = `UPDATE allusers SET name=?, lname=?, email=?, category_id=?, role=? WHERE id=?`;
        values = [
            req.body.name,
            req.body.lname,
            req.body.email,
            req.body.category_id,
            req.body.role,
            id            
        ];
        console.log("SQL query:", sql); // Log the SQL query
        console.log("SQL values:", values); // Log the SQL values
        // Execute the SQL query
        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error updating employee:", err);
                return res.status(500).json({ Status: false, Error: "Query Error" });
            }
            console.log("Update result:", result); // Log the result of the update query
            // Check if any rows were affected by the update
            if (result.affectedRows > 0) {
                return res.json({ Status: true, Message: "Employee updated successfully" });
            } else {
                return res.json({ Status: false, Error: "Employee not found or no changes made" });
            }
        });
    }
});



router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from allusers where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {    
    const sql = "SELECT COUNT(*) AS admin FROM allusers WHERE role = 'ADMIN'";
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error fetching admin count:", err);
            return res.json({ Status: false, Error: "Error fetching admin count" });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.get('/employee_count', (req, res) => {
    const sql = "SELECT COUNT(*) AS employee FROM allusers";
    con.query(sql, (err, result) => {
        if(err) {
            console.error("Error fetching employee count:", err);
            return res.json({ Status: false, Error: "Error fetching employee count" });
        }
        return res.json({ Status: true, Result: result });
    });
});


router.get('/employee_detail/:userid', (req, res) => {
    const id = req.params.userid;
    const sql = "SELECT name, lname, email, role FROM allusers WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching employee details:', err);
            return res.status(500).json({ Status: false, Message: 'Failed to fetch employee details.' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ Status: false, Message: 'Employee not found.' });
        }

        return res.status(200).json({ Status: true, Data: result[0] });
    });
});

router.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM allusers WHERE role = 'ADMIN'";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
});



export { router as adminRouter };
