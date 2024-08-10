import "dotenv/config";

class Env {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
  }

  log(message) {
    console.log(message);
  }
}

export default new Env();
