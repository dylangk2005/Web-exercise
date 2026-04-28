class StudentService {
  constructor(Student) {
    this.Student = Student;
  }

  create(data) {
    return this.Student.create(data);
  }

  getAll(query) {
    const { page = 1, limit = 10 } = query;

    return this.Student.find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(Number(limit));
  }

  getById(id) {
    return this.Student.findById(id);
  }

  update(id, data) {
    return this.Student.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return this.Student.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  updateScore(id, score) {
    return this.Student.findByIdAndUpdate(
      id,
      { score },
      { new: true }
    );
  }

  getTop(limit = 5) {
    return this.Student.find().sort("-score").limit(limit);
  }

  avgScore() {
    return this.Student.aggregate([
      { $group: { _id: null, avg: { $avg: "$score" } } }
    ]);
  }
}

module.exports = StudentService;