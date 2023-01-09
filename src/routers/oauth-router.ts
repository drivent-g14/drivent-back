/* eslint-disable import/named, no-console */
import { signInWithGithub } from '@/controllers/oauth-controller';
import { Router } from 'express';

const oAuth = Router();

oAuth.get('/github', signInWithGithub);

export { oAuth };
