import NodeCache from 'node-cache';

class CacheService {
  constructor() {
    // Cache results for 1 hour, check for expired entries every 10 minutes
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
  }

  generateKey(code, language, testCases) {
    const testCasesHash = JSON.stringify(testCases);
    return `${language}_${Buffer.from(code + testCasesHash).toString('base64')}`;
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  invalidate(key) {
    this.cache.del(key);
  }
}

export const cacheService = new CacheService();