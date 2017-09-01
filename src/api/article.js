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
    url: '/api/queryArticleById',
    method: 'post',
    data: articleIdObj
  })
}
export function queryDraftArticleAPI (articleIdObj) {
  return fetch({
    url: '/api/queryDraftArticleById',
    method: 'post',
    data: articleIdObj
  })
}
export function getAllArticleCategoryAPI () {
  return fetch({
    url: '/api/getAllArticleCategory',
    method: 'get'
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
export function getArticleListByDateAPI () {
  return fetch({
    url: '/api/getArticleListByDate',
    method: 'get'
  })
}
export function getArticleListByCateAPI (reqParams) {
  return fetch({
    url: '/api/getArticleListByCate',
    method: 'get',
    params: reqParams
  })
}
export function getDraftArticleListAPI (reqParams) {
  return fetch({
    url: '/api/getDraftArticleList',
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
