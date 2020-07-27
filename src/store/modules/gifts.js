import GiftService from '@/services/gifts.service';

export default {
  state: {
    gifts: [],
  },
  mutations: {
    setGifts(state, giftList) {
      state.gifts = giftList;
    },
    pushGift(state, gift) {
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
      GiftService.index().then(res => {
        const array = [];
        for (let key in res.data) {
          array.push({ id: key, ...res.data[key] });
        }
        commit('setGifts', array || []);
      });
    },
    async addGift({ commit }, gift) {
      GiftService.create(gift).then(res => {
        gift.id = res.data.name;
        commit('pushGift', gift);
      });
    },
    async deleteGift({ commit }, id) {
      GiftService.remove(id).then(_ => {
        commit('removeGift', id);
      });
    },
    async editGift({ commit }, gift) {
      const { name, quantity, description, photoBase64, photoUrl } = gift;
      GiftService.update(gift.id, {
        name,
        quantity,
        description,
        photoBase64,
        photoUrl,
      }).then(res => {
        commit('editGift', gift);
      });
    },
  },
  getters: {
    gifts(state) {
      state.gifts.map(record => {
        if (!record.photoBase64) {
          record.photoBase64 =
            'data:image/png;base64,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';
          record.photoUrl = '../assets/default-gift-photo.png';
        }
      });
      return state.gifts;
    },
  },
};
