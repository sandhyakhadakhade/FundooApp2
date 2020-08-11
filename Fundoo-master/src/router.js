/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 ******************************************************************************/

import Vue from 'vue'
import Router from 'vue-router'
import loginView from './views/loginView.vue'
import registrationView from './views/registrationView.vue'
import forgotPasswordView from './views/forgotPasswordView.vue'
import resetPasswordView from './views/resetPasswordView.vue'
// import dashboardView from './views/dashboardView.vue'
import navbarView from './views/navbarView.vue'
import createNotes from './components/createNotes.vue'
import noteList from './components/noteList.vue'
import trashNoteList from './components/trashNoteList.vue'
import archiveNoteList from './components/archiveNoteList.vue'
import reminderNoteList from './components/reminderNoteList'
import searchNote from './components/searchNote'
import labelNotes from './components/labelNotes'
import questionAnswer from './components/questionAnswer'
import addToCard from './components/addToCard'
import shoppingCart from './components/shoppingCart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'loginView',
      component: loginView
    },
    {
      path: '/',
      name: 'AddToCard',
      component: addToCard
    },
    {
      path: '/registration',
      name: registrationView,
      component: registrationView
    },
    {
      path: '/forgotPassword',
      name: forgotPasswordView,
      component: forgotPasswordView
    },
    {
      path: '/resetpassword/:token',
      name: resetPasswordView,
      component: resetPasswordView
    },
    {
      path: '/notes',
      name: navbarView,
      component: navbarView,
      children: [
        {
          path: '/',
          name: noteList,
          component: noteList
        },
        {
          path: '/shoppingcart',
          component: shoppingCart,
          name: shoppingCart
        },
        {
          path: '/addNotes',
          name: createNotes,
          component: createNotes
        },

        {
          path: '/notelist',
          name: noteList,
          component: noteList
        },
        {
          path: '/trashnote',
          name: trashNoteList,
          component: trashNoteList
        },
        {
          path: '/archivenotes',
          name: archiveNoteList,
          component: archiveNoteList
        },
        {
          path: '/reminder',
          name: reminderNoteList,
          component: reminderNoteList

        },
        {
          path: '/searchnote',
          name: searchNote,
          component: searchNote
        },
        {
          path: '/label/:id',
          name: labelNotes,
          component: labelNotes
        },
        {
          path: '/qustionAnswer/:id',
          name: questionAnswer,
          component: questionAnswer
        }

      ]
    },

  ]
})
