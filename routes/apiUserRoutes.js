const router = require("express").Router();
const db = require("../models");
const nano = require("nanoid");
const bcrypt = require("bcrypt");
const { login, RestVerifyToken } = require("../authentication");
const { Op } = require("sequelize");
router.post("/api/createUser", async (req, res) => {
  try {
    await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      socketId: nano.nanoid(),
    });
    res.status(200).send("Account Created!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/api/login", async (req, res) => {
  try {
    let data = await login(req.body);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(404).send(err.message);
  }
});

router.get("/api/findConnection/:name", async (req, res) => {
  let inspect = req.params.name.split(" ").filter((item) => item !== "");
  let firstName = inspect[0];
  let lastName = inspect[1];

  if (lastName) {
    try {
      const userId = await RestVerifyToken(req);
      const data = await db.User.findAll({
        where: {
          firstName: {
            [Op.substring]: firstName,
          },
          lastName: {
            [Op.substring]: lastName,
          },
        },
        attributes: {
          exclude: ["password", "UserToUser", "createdAt", "updatedAt"],
        },
      });
      if (data.length) {
        console.log(data);
        res.status(200).json(data);
      } else {
        console.log(data);
        res.status(200).json(["No Matching Results."]);
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
    }
  } else {
    try {
      const userId = await RestVerifyToken(req);
      console.log(userId);
      const data = await db.User.findAll({
        where: {
          firstName: {
            [Op.substring]: firstName,
          },
        },
        attributes: {
          exclude: ["password", "UserToUser", "createdAt", "updatedAt"],
        },
      });
      if (data.length) {
        console.log(data);
        res.status(200).json(data);
      } else {
        console.log(data);
        res.status(200).json(["No Matching Results."]);
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
    }
  }
});
router.put("/api/rejectConnection", async (req, res, next) => {
  console.log(req.body.connectionRequestid);
  // flipped userId and req.body.connectionRequestid as this is reseaver response
  try {
    const userId = await RestVerifyToken(req);
    await db.UserToUser.destroy({
      where: {
        UserId: req.body.connectionRequestid,
        FriendId: userId,
      },
    });

    res.status(200).json({ id: req.body.connectionRequestid });
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});
router.get("/api/getuser", async (req, res, next) => {
  console.log("test");
  // flipped userId and req.body.connectionRequestid as this is reseaver response
  try {
    const userId = await RestVerifyToken(req);
    const data = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password", "socketId", "id", "createdAt", "updatedAt"],
      },
    });
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});
router.put("/api/edituser", async (req, res, next) => {
  console.log("test");
  console.log(req.body.password);
  console.log(req.body.newdata);
  // flipped userId and req.body.connectionRequestid as this is reseaver response
  try {
    const userId = await RestVerifyToken(req);

    await db.User.findOne({
      where: {
        id: userId,
      },
    }).then(async function(user){
        const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }else{
        if (req.body.newdata.newPassword) {
            let up = await user.update(
              {
                firstName: req.body.newdata.firstName,
                lastName: req.body.newdata.lastName,
                email: req.body.newdata.email,
                password: req.body.newdata.newPassword,
              },
              {
                where: {
                  id: userId,
                },
              }
            );
            console.log(up);
          } else {
            let up = await user.update(
              {
                firstName: req.body.newdata.firstName,
                lastName: req.body.newdata.lastName,
                email: req.body.newdata.email,
              },
              {
                where: {
                  id: userId,
                },
              }
            );
            console.log(up);
          }

    }
        

    });
   
   

  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});

module.exports = router;
