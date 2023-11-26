import CONFIG from '../globals/config';

const cacheHelper = {
  async cachingAppShell(req) {
    const cache = await caches.open(CONFIG.CACHE_NAME);
    cache.addAll(req);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(req) {
    const response = await caches.match(req);

    if (response) {
      this._fetchRequest(req);
      return response;
    }
    return this._fetchRequest(req);
  },

  async fetchingCache(req) {
    try {
      const response = await fetch(req);
      if (!response || response.status !== 200) {
        return response;
      }
      await this._addCache();
      return response;
    } catch (error) {

    }
  },

  async _addCache(req) {
    const cache = await caches.open(CONFIG.CACHE_NAME);
    cache.add(req);
  },
};

export default cacheHelper;
