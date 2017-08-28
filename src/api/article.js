import fetch from '../utils/fetch'
export function saveArticleAPI (form) {
  return fetch({
    url: '/api/saveArticle',
    method: 'post',
    data: form
  })
}
export function queryArticleAPI (articleIdObj) {
  return fetch({
    url: '/api/queryArticle',
    method: 'post',
    data: articleIdObj
  })
}
export function getArticleCategoryAPI () {
  return fetch({
    url: '/api/getArticleCategory',
    method: 'get'
  })
}
export function delArticleAPI (articleIdObj) {
  return fetch({
    url: '/api/delArticle',
    method: 'post',
    data: articleIdObj
  })
}
export function getArticleListAPI (reqParams) {
  return fetch({
    url: '/api/getArticleList',
    method: 'get',
    params: reqParams
  })
}
export function updateCategoryAPI (cateObj) {
  return fetch({
    url: '/api/updateCategory',
    method: 'post',
    data: cateObj
  })
}
export function updateCategoryByIdAPI (cateObj) {
  return fetch({
    url: '/api/updateCategoryById',
    method: 'post',
    data: cateObj
  })
}
