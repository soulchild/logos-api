'use strict';

const normalize = val =>
  val
    .trim()
    .replace(/[^A-Za-z0-9]/g, '')
    .toLowerCase();

class LogosAPI {
  constructor(logos) {
    this.logos = logos;
  }

  search(conditions = {}) {
    // Get keys to filter by, removing undefined values
    const conditionKeys = Object.keys(conditions).filter(
      key => conditions[key]
    );
    if (conditionKeys.length === 0) {
      return this.getAll();
    }

    return this.logos.filter(
      logo =>
        conditionKeys.filter(key => {
          const query = normalize(conditions[key]);
          return query.length > 0 && normalize(logo[key]).indexOf(query) > -1;
        }).length === conditionKeys.length // All conditions must match
    );
  }

  findById(id) {
    return this.logos.find(logo => logo.id === id);
  }

  getAll() {
    return this.logos;
  }
}

module.exports = LogosAPI;
