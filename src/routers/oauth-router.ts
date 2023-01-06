/* eslint-disable import/named, no-console */
import { signInWithGithub } from '@/controllers/oauth-controller';
import axios from 'axios';
import { Router, Request, Response } from 'express';

const oAuth = Router();

const CLIENT_ID = process.env.GH_BASIC_CLIENT_ID;
const CLIENT_SECRET = process.env.GH_BASIC_SECRET_ID;

oAuth.get('/github', signInWithGithub);

export { oAuth };
