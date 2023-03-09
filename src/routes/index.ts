import Router from 'express';

import auth from './auth';
import user from './user';
import messages from './messages';
import reactions from './reactions';
import reply from './reply'

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/messages', messages);
router.use('/reactions', reactions);
router.use('/reply', reply);

export default router;