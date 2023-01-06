import { Request, Response } from 'express';
import axios from 'axios';
import httpStatus from 'http-status';

export async function signInWithGithub(req: Request, res: Response) {
  try {
    const { code } = req.query;

    if (code) {
      let githubToken: string;
      const GITHUB_URL = 'https://github.com/login/oauth/access_token';
      await axios
        .post(
          `${GITHUB_URL}?client_id=${process.env.GH_BASIC_CLIENT_ID}&client_secret=${process.env.GH_BASIC_SECRET_ID}&code=${code}`,
        )
        .then((res) => {
          githubToken = res.data;
        })
        .catch((err) => {
          throw err;
        });

      const decode = githubToken.split('&').reduce<Record<string, string>>((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = value;
        return acc;
      }, {});

      return res.status(httpStatus.OK).send(code);
    }

    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'code is missing' });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
