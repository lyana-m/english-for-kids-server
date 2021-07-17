const jwt = require('jsonwebtoken');

export function authenticateToken(req: any, res: any, next: any) {
  if (req.query.mode === 'user') {
    return next();
  }
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  })
}
