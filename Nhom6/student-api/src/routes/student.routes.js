const router = require("express").Router();
const { controller } = require("../container");
const validateId = require("../middlewares/validateObjectId");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/top", controller.top);
router.get("/stats/avg", controller.avg);

router.get("/:id", validateId, controller.getOne);
router.put("/:id", validateId, controller.update);
router.patch("/:id/score", validateId, controller.updateScore);
router.delete("/:id", validateId, controller.delete);

module.exports = router;