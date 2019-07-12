const { Router } = require('express');
const router = Router(); //Este enrutador sirve para definir las rutas del servidor.

router.get('/', (req, res) => res.json({text: 'Hello World'}));

module.exports = router;