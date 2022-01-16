import db from '../service/db';
import { genSaltSync, hashSync, compareSync } from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { createJwtToken } from '../controllers/middleware/jwt.middleware'


export const login = (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    db.query("SELECT * FROM employee WHERE email = $1", [email], (err: Error, result: QueryResult) => {
        if (err != undefined || err != null) res.status(404).json({ message: err })

        if (result.rows.length > 0) {
            const validPassword = compareSync(password, result.rows[0].password)
            if (!validPassword) res.status(404).json({ message: "Invalid Email or Password" })
            else {
                const token = createJwtToken(result.rows[0])
                res.status(200).json({
                    message: "Login Successful",
                    object: result.rows[0],
                    token: token
                })
            }

        } else {
            res.status(404).json({ message: "Invalid Email or Password" })
        }
    })
}


export const signup = (req: Request, res: Response, next: NextFunction) => {
    let { email, password, emp_name, store_id, gender } = req.body;
    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    //! CHECKING IF EMAIL EXISTS OR NOT
    db.query('SELECT * FROM employee WHERE email = $1', [email]).then((existEmail) => {
        if (existEmail.rows.length > 0) {
            res.status(404).json({ message: 'Email already exists!' })
        } else {
            db.query("INSERT INTO employee (email, password, emp_name, store_id, gender) VALUES ($1, $2, $3, $4, $5)", [email, password, emp_name, store_id, gender]).then((result) => {
                if (result.rowCount > 0) {
                    res.status(200).json({ message: 'Employee created successfully!', })
                } else {
                    res.status(404).json({ message: 'Employee not created!' })
                }
            }).catch((err) => {
                res.status(500).json({ message: 'Error creating employee!', err: err })
            })
        }
    }).catch(err => {
        console.log(err)
    })

}

export const fetch = (req: Request, res: Response, next: NextFunction) => {
    db.query('SELECT * FROM employee').then((result) => {
        res.status(200).json({ message: 'Employee fetched successfully!', employee: result.rows[0] })
    }).catch((err) => {
        res.status(500).json({ message: 'Error fetching employee!', err: err })
    })
}

export const fetchById = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    db.query('SELECT * FROM employee WHERE id = $1', [id]).then((student) => {
        if (student.rows.length > 0) {
            res.status(200).json(student.rows[0])
        } else {
            res.status(404).json({ message: 'Employee not found!' })
        }
    }).catch((err) => {
        res.status(404).json({ message: err })
    })
}