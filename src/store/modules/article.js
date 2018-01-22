import {getArticleCategoryTotalAPI} from '@/api/article'
const article = {
  state: {
    articleTotal: 0,
    categoryTotal: 0
  },
  getters: {},
  mutations: {
    SET_TOTAL (state, {articleTotal, categoryTotal}) {
      state.articleTotal = articleTotal
      state.categoryTotal = categoryTotal
    }
  },
  actions: {
    getTotal ({commit}) {
      return new Promise((resolve, reject) => {
        getArticleCategoryTotalAPI()
          .then((res) => {
            let result = res.data.result
            commit('SET_TOTAL', {
              articleTotal: result.articleTotal,
              categoryTotal: result.categoryTotal
            })
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
export default article
