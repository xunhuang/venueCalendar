(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{33:function(e,t,n){},34:function(e,t,n){},39:function(e){e.exports=JSON.parse('{"projectId":"myrandomwatch-b4b41","appId":"1:458223764382:web:ad550ac9d5d240982d0c8f","databaseURL":"https://myrandomwatch-b4b41-default-rtdb.firebaseio.com","storageBucket":"myrandomwatch-b4b41.appspot.com","locationId":"us-central","apiKey":"AIzaSyCfD31xo4THGYQ5_Y0-VPVT71T3sB2YxL0","authDomain":"myrandomwatch-b4b41.firebaseapp.com","messagingSenderId":"458223764382","measurementId":"G-F2BBYE9XWJ"}')},44:function(e,t,n){"use strict";n.r(t);var i=n(4),o=n(1),c=n.n(o),r=n(24),s=n.n(r),a=(n(33),n(27)),u=n(5),d=(n(34),n(20)),l=c.a.createContext(void 0),h=n(17),b=n(25),j=function e(t){Object(h.a)(this,e),this.displayName=t.displayName,this.uid=t.uid};n(35),n(37);var v=n(38).default,p=n(39);v.apps.length||v.initializeApp(p);var g=new(function(){function e(){Object(h.a)(this,e),this.currentUser=null}return Object(b.a)(e,[{key:"login",value:function(){var e=new v.auth.GoogleAuthProvider;v.auth().signInWithPopup(e).then((function(e){console.log(e.user)})).catch((function(e){console.log(e)}))}},{key:"logout",value:function(){this.currentUser=null,v.auth().signOut()}},{key:"userStatusChange",value:function(e){var t=this;v.auth().onAuthStateChanged((function(n){n?(console.log("newuser 2 !"),t.currentUser=new j(n)):console.log("user loggout!"),e(t.currentUser)}))}},{key:"getCurrentUser",value:function(){return this.currentUser}},{key:"getCurrentUserNotNull",value:function(){return this.currentUser}}]),e}()),f=function(){return Object(i.jsx)("h1",{children:" Oops! That page couldn't be found. "},void 0)},O=function(){var e=g.getCurrentUserNotNull();return Object(i.jsxs)("h1",{children:[" AuthenticatedHome - ",e.displayName,", ",e.uid," "]},void 0)},x=function(){var e=g.getCurrentUserNotNull();return Object(i.jsxs)("h1",{children:[" My Subscription for ",e.displayName,", ",e.uid," "]},void 0)};function m(){return Object(i.jsxs)("div",{children:[Object(i.jsx)(w,{},void 0),Object(i.jsx)("p",Object.assign({onClick:function(e){g.logout()}},{children:"Logout"}),void 0)]},void 0)}function y(){return Object(i.jsxs)("h1",{children:[" Un-AuthenticatedApp xxx",Object(i.jsx)("p",Object.assign({onClick:function(e){console.log("clicked"),g.login()}},{children:"Sign in here"}),void 0)]},void 0)}function C(e){var t=c.a.useState(void 0),n=Object(a.a)(t,2),o=n[0],r=n[1];return c.a.useEffect((function(){g.userStatusChange((function(e){r(e)}))}),[]),void 0===o?Object(i.jsx)("h2",{children:" Loading"},void 0):o?Object(i.jsx)(l.Provider,Object.assign({value:o},{children:Object(i.jsx)(m,{},void 0)}),void 0):Object(i.jsx)(y,{},void 0)}var w=Object(u.g)((function(e){return e.location.search.startsWith("?/")?Object(i.jsx)(u.a,{to:e.location.search.slice(1)},void 0):Object(i.jsxs)(u.d,{children:[Object(i.jsx)(u.b,{exact:!0,path:"/",component:O},void 0),Object(i.jsx)(u.b,{exact:!0,path:"/sub",component:x},void 0),Object(i.jsx)(u.b,{exact:!0,path:"*",component:f},void 0)]},void 0)})),N=function(e){return Object(i.jsx)(d.a,{children:Object(i.jsx)("header",{children:Object(i.jsx)("div",Object.assign({className:"App"},{children:Object(i.jsx)(C,Object.assign({},e),void 0)}),void 0)},void 0)},void 0)},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,45)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),o(e),c(e),r(e)}))};s.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(N,{},void 0)},void 0),document.getElementById("root")),U()}},[[44,1,2]]]);
//# sourceMappingURL=main.01276a35.chunk.js.map