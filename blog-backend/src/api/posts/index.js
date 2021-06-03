import Router from 'koa-router';
import * as postsCtrl from './post.ctrl';
import checkLoggedIn from "../../lib/checkLoggedIn";
import {getPostById,checkOwnPost} from "./post.ctrl";

const posts = new Router();

posts.get('/',postsCtrl.list);
posts.post('/', checkLoggedIn,postsCtrl.write);
posts.get('/:id', getPostById, postsCtrl.read);
posts.delete('/:id', checkLoggedIn, getPostById, checkOwnPost, postsCtrl.remove);
posts.patch('/:id', checkLoggedIn, getPostById, checkOwnPost, postsCtrl.update);

export default posts;