const { db }=require("../config/db");
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        await db.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }

    {/*const username = req.body.username;
    const email = req.body.email; 
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.execute(
      "INSERT INTO users (username, email, password) VALUES (?,?,?);",
      [username, email, hashedPassword],
      (err, result) => {
      
        if (err) {
      
            console.error("Error executing query:", err);
      
            res.status(500).json({ error: "Internal Server Error" });
      
            return;
        }
      
        console.log("Query result:", result);
      
        res.status(200).json({ message: "Registration successful" });
      }
    );*/}
  };


const loginUser = async (req, res) => {
    const input = req.body.input; // Added this line to declare 'username'
    const password = req.body.password;

    db.execute(
        "SELECT * FROM users WHERE username = ? or email = ?;",
        [input, input],
        (err, result) => {
            if (err) {
                console.error("Error querying user:", err);
                res.status(500).send({ error: "Internal Server Error" });
            } else {
                console.log("Query result:", result);

                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {
                            const id = result[0].id
                            const token = jwt.sign({id}, "jwt", {
                            expiresIn: 300,
                        })
                            req.session.user = result;
                            console.log(req.session.user);
                            res.json({auth: true, token: token, result: result});
                        } else{
                            res.json({auth: false, message: "Wrong username password"});                         }
                    });
                } else {
                    console.log("Wrong username/password combination");
                    res.json({auth: false, message: "no user exists"});
                }
            }
        }
    );
};

const checkLoginStatus = (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  };
  

module.exports={registerUser,loginUser, checkLoginStatus}

 