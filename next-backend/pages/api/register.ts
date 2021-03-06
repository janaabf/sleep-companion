import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
} from '../../util/database';

type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  // check method
  if (req.method === 'POST') {
    // check if username & pw are strings
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
      return;
    }

    // check if user already exists
    if (await getUserByUsername(req.body.username)) {
      res
        .status(401)
        .json({ errors: [{ message: 'username already registered' }] });
      return;
    }
    // 1. get userinfo
    const user = req.body;

    // 2. hash password
    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // 3. create user
    const newUser = await createUser(req.body.username, passwordHash);

    const userId = newUser.id;
    // 4. create a session (random session token, using the 64 base characters)
    const token = crypto.randomBytes(80).toString('base64');

    const session = await createSession(token, userId);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    res
      .status(200)
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: newUser.id } });
  } else {
    res.status(400).json({ errors: [{ message: 'method not allowed' }] });
  }
}
