const { Router } = require('express');
const PecaController = require('../controllers/PecaController');
// Middlewares de autenticação/autorização — a implementar pelo Integrante 1.
const { authenticate, authorize } = require('../middlewares/auth');

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'ATENDENTE']), PecaController.criar);
router.get('/', PecaController.listar);
router.get('/:id', PecaController.buscarPorId);
router.put('/:id', authorize(['ADMIN', 'ATENDENTE']), PecaController.atualizar);
router.delete('/:id', authorize(['ADMIN']), PecaController.remover);

module.exports = router;
