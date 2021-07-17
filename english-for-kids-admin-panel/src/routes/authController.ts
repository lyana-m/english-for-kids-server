import * as express from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const secret = 'SECRET_KEY'

const generateAccessToken = (id: string, login: string) => {
  const payload = {
    id,
    login
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'});
};

export const login = async (req: express.Request, res: express.Response) => {
  const client = MongoClient(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    const { login, password } = req.body;
    await client.connect();
    const admins = client.db().collection('admins');
    const admin = await admins.findOne({login});
    client.close();

    if (!admin) {
      res.status(400).json({message: 'Wrong login'})
    }

    const validPassword = bcrypt.compareSync(password, admin.password);

    if (!validPassword) {
      res.status(400).json({message: 'Wrong password'})
    }

    const token = generateAccessToken(admin._id, admin.login);
    return res.json({token});    
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Login error'})
  }
}

module.exports = login;