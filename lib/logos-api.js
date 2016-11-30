module.exports = class LogosAPI {
  constructor(logos) {
    this.logos = logos;
  }

  search(conditions = {}) {
    const conditionKeys = Object.keys(conditions);
    if (conditionKeys.length === 0) return this.logos;

    return this.logos.filter(logo => {
      // All conditions must match
      return conditionKeys.filter(key => {
        const query = conditions[key]
          .trim()
          .replace(/[.\-() ]/gi, '')
          .toLowerCase();
        if (query.length === 0) return false;
        // Use substring matching
        return logo[key].indexOf(query) > -1;
      }).length === conditionKeys.length;
    });
  }

  findById(id) {
    return this.logos.find(logo => logo.id === id);
  }

  getAll() {
    return this.logos;
  }
};
