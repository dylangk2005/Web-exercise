class StudentController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const data = await this.service.getAll(req.query);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const data = await this.service.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Not found" });
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.service.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Not found" });
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  updateScore = async (req, res, next) => {
    try {
      const { score } = req.body;

      if (score < 0 || score > 100) {
        return res.status(400).json({ message: "Score invalid" });
      }

      const data = await this.service.updateScore(req.params.id, score);
      if (!data) return res.status(404).json({ message: "Not found" });

      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.service.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Not found" });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  top = async (req, res, next) => {
    try {
      const data = await this.service.getTop(req.query.limit);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  avg = async (req, res, next) => {
    try {
      const data = await this.service.avgScore();
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = StudentController;