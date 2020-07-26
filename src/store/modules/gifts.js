import GiftMock from '../../helpers/GiftMock';

export default {
  state: {
    gifts: [],
  },
  mutations: {
    setGifts(state, giftList) {
      state.gifts = giftList;
    },
    pushGift(state, gift) {
      gift.id = Math.round(Math.random() * 1000).toString();
      state.gifts.push(gift);
    },
    editGift(state, gift) {
      state.gifts = state.gifts.map(record => {
        if (record.id == gift.id) {
          return gift;
        }
        return record;
      });
    },
    removeGift(state, id) {
      state.gifts = state.gifts.filter(record => record.id != id);
    },
  },
  actions: {
    async initGifts({ commit }) {
      commit('setGifts', GiftMock);
    },
    async addGift({ commit }, gift) {
      commit('pushGift', gift);
    },
    async deleteGift({ commit }, id) {
      commit('removeGift', id);
    },
    async editGift({ commit }, gift) {
      commit('editGift', gift);
    },
  },
  getters: {
    gifts(state) {
      return state.gifts;
    },
  },
};
