(window.webpackJsonpspeechreg=window.webpackJsonpspeechreg||[]).push([[0],{135:function(e,t,a){},213:function(e,t,a){e.exports=a(376)},218:function(e,t,a){},376:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(48),c=a.n(l),i=(a(218),a(32)),o=a(21),m=a(42),s=a.n(m),u=a(68),d=a(39),E=a(385),p=a(395),h=a(386),v=a(389),b=a(391),g=a(397),f=a(393),w=a(197),y=(a(135),a(180)),x=a.n(y);a(222);var I=x.a.initializeApp({apiKey:"AIzaSyAu2ma47HVZVgvMQ3OfhUbgGgUthi8qsEE",authDomain:"https://revcode-83ac0.firebaseapp.com/",databaseURL:"https://revcode-83ac0.firebaseio.com/",storageBucket:"projectId.appspot.com"}),O=r.a.createContext(),j=function(e){var t=e.children,a=Object(n.useState)(null),l=Object(d.a)(a,2),c=l[0],i=l[1];return Object(n.useEffect)((function(){I.auth().onAuthStateChanged(i)}),[]),r.a.createElement(O.Provider,{value:{currentUser:c}},t)},k=Object(o.f)((function(e){var t=e.history,a=Object(n.useState)({error:""}),l=Object(d.a)(a,2),c=l[0],m=l[1],y=Object(n.useCallback)(function(){var e=Object(u.a)(s.a.mark((function e(a){var n,r,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),n=a.target.elements,r=n.email,l=n.password,r.value){e.next=4;break}return e.abrupt("return",m({error:"Email is required"}));case 4:if(l.value){e.next=6;break}return e.abrupt("return",m({error:"Password is required"}));case 6:return e.prev=6,e.next=9,I.auth().signInWithEmailAndPassword(r.value,l.value);case 9:t.push("/main"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(6),m({error:e.t0.message});case 15:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(n.useContext)(O).currentUser?r.a.createElement(o.a,{to:"/main"}):r.a.createElement("div",{className:"area"},r.a.createElement(E.a,{className:"box",style:{width:400}},r.a.createElement(p.a,{as:"h2",icon:!0,textAlign:"center"},r.a.createElement(p.a.Content,{style:{color:"white"}},"Sign In")),r.a.createElement(h.a,null),r.a.createElement(v.a,{inverted:!0,style:{paddingTop:20},error:!0,onSubmit:y},c.error&&r.a.createElement(b.a,{error:!0,header:c.error}),r.a.createElement(v.a.Input,{icon:"user",iconPosition:"left",label:"Email",placeholder:"Email",name:"email",type:"email"}),r.a.createElement(v.a.Input,{icon:"lock",iconPosition:"left",label:"Password",type:"password",placeholder:"Password",name:"password"}),r.a.createElement(g.a,null,r.a.createElement(g.a.Column,{textAlign:"center"},r.a.createElement(g.a.Row,null,r.a.createElement(f.a,{type:"submit",content:"Login",basic:!0,inverted:!0,color:"teal",size:"large",style:{marginTop:"1em"}})),r.a.createElement(w.a,null,r.a.createElement(p.a,{as:"h5",textAlign:"center"},r.a.createElement(p.a.Content,{style:{color:"#909090",marginTop:"2em"}},"Don't have an account?"," ",r.a.createElement(i.b,{to:"/register"},r.a.createElement("i",null,"Sign Up"))))))))),r.a.createElement("ul",{className:"circles"},r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null)))})),C=a(387),S=a(198),P=a.n(S),A=a(359),U=Object(o.f)((function(e){var t=e.history,a=Object(n.useState)({signed:!1}),l=Object(d.a)(a,2),c=l[0],m=l[1],y=Object(n.useState)({show:!1}),x=Object(d.a)(y,2),j=x[0],k=x[1],S=Object(n.useState)({error:""}),U=Object(d.a)(S,2),W=U[0],T=U[1],z=Object(n.useState)({percent:0,color:"grey",scale:""}),H=Object(d.a)(z,2),q=H[0],B=H[1],N=Object(n.useCallback)(function(){var e=Object(u.a)(s.a.mark((function e(a){var n,r,l,c,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),n=a.target.elements,r=n.email,l=n.password,c=n.cpassword,(i=n.username).value){e.next=4;break}return e.abrupt("return",T({error:"Username is required"}));case 4:if(r.value){e.next=6;break}return e.abrupt("return",T({error:"Email is required"}));case 6:if(l.value){e.next=8;break}return e.abrupt("return",T({error:"Password is required"}));case 8:if(c.value){e.next=10;break}return e.abrupt("return",T({error:"Confirm password is required"}));case 10:if(l.value===c.value){e.next=12;break}return e.abrupt("return",T({error:"Your password and confirm password don't match"}));case 12:return e.prev=12,e.next=15,I.auth().createUserWithEmailAndPassword(r.value,l.value).then(function(){var e=Object(u.a)(s.a.mark((function e(a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m({signed:!0}),console.log("#",a),e.next=4,P.a.post("https://revcode.herokuapp.com/adduser",{uid:a.user.uid,name:i.value}).then((function(e){console.log(e),alert("Successfully Registered"),t.push("/")})).catch((function(e){T({error:e.message})}));case 4:I.auth().signOut();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){T({error:e.message})}));case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(12),T({error:e.t0.message});case 20:case"end":return e.stop()}}),e,null,[[12,17]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(n.useContext)(O).currentUser&&!c.signed?r.a.createElement(o.a,{to:"/main"}):r.a.createElement("div",{className:"area"},r.a.createElement(E.a,{className:"box",style:{width:400}},r.a.createElement(p.a,{as:"h2",icon:!0,textAlign:"center"},r.a.createElement(p.a.Content,{style:{color:"white"}},"Sign Up")),r.a.createElement(h.a,null),r.a.createElement(v.a,{inverted:!0,style:{paddingTop:20},error:!0,onSubmit:N},W.error&&r.a.createElement(b.a,{error:!0,header:W.error}),r.a.createElement(v.a.Input,{icon:"user",iconPosition:"left",label:"Username",placeholder:"Username",name:"username",type:"text"}),r.a.createElement(v.a.Input,{icon:"mail",iconPosition:"left",label:"Email",placeholder:"Email",name:"email",type:"email"}),r.a.createElement(v.a.Input,{icon:"lock",iconPosition:"left",label:"Password",placeholder:"Password",name:"password",type:"password",onChange:function(e){k({show:!0});var t=20*(A(e.target.value).score+1);20===t&&B({percent:t,color:"red",scale:"Weak"}),40===t&&B({percent:t,color:"yellow",scale:"Fair"}),60===t&&B({percent:t,color:"blue",scale:"Normal"}),80===t&&B({percent:t,color:"teal",scale:"Good"}),100===t&&B({percent:t,color:"green",scale:"Strong"}),console.log(q)}}),j.show?r.a.createElement(C.a,{percent:q.percent,color:q.color,size:"tiny",style:{marginBottom:"1em"}}):null,j.show?r.a.createElement(p.a,{as:"h5",textAlign:"left",color:q.color,style:{marginTop:"1em"}},r.a.createElement(p.a.Content,null,r.a.createElement("b",null,"Password Strength ")," : ",r.a.createElement("i",null,q.scale))):null,r.a.createElement(v.a.Input,{icon:"lock",iconPosition:"left",label:"Confirm Password",type:"password",placeholder:"Confirm Password",name:"cpassword"}),r.a.createElement(g.a,null,r.a.createElement(g.a.Column,{textAlign:"center"},r.a.createElement(g.a.Row,null,r.a.createElement(f.a,{type:"submit",content:"Sign Up",basic:!0,inverted:!0,color:"teal",size:"large",style:{marginTop:"1em"}})),r.a.createElement(w.a,null,r.a.createElement(p.a,{as:"h5",textAlign:"center"},r.a.createElement(p.a.Content,{style:{color:"#909090",marginTop:"2em"}},"Already have an account?"," ",r.a.createElement(i.b,{to:"/login"},r.a.createElement("i",null,"Sign In"))))))))),r.a.createElement("ul",{className:"circles"},r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null),r.a.createElement("li",null)))})),W=a(69),T=a(70),z=a(72),H=a(71),q=a(73),B=a(392),N=a(394),R=a(41),L=a(396),M=function(e){var t=e.animation,a=e.direction,n=e.visible;return r.a.createElement(B.a,{as:N.a,animation:t,direction:a,icon:"labeled",inverted:!0,vertical:!0,visible:n,width:"thin"},r.a.createElement(N.a.Item,{as:"a"},r.a.createElement(R.a,{name:"home"}),"Home"),r.a.createElement(N.a.Item,{as:"a"},r.a.createElement(R.a,{name:"gamepad"}),"Games"),r.a.createElement(N.a.Item,{as:"a"},r.a.createElement(R.a,{name:"camera"}),"Channels"))},F=function(e){function t(){var e,a;Object(W.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(z.a)(this,(e=Object(H.a)(t)).call.apply(e,[this].concat(r)))).state={dimmed:!1,visible:!1,activeItem:"home"},a.handleItemClick=function(e,t){var n=t.name;return a.setState({activeItem:n})},a}return Object(q.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.dimmed,n=t.visible,l=t.activeItem;return console.log(I.auth().currentUser),r.a.createElement("div",null,r.a.createElement(B.a.Pushable,{as:L.a},r.a.createElement(M,{animation:"push",direction:"left",visible:n}),r.a.createElement(B.a.Pusher,{dimmed:a&&n},r.a.createElement(L.a,{inverted:!0},r.a.createElement(N.a,{inverted:!0,pointing:!0,secondary:!0},r.a.createElement(N.a.Item,{name:"home",active:"home"===l,onClick:function(t,a){var n=a.name;e.setState({visible:!e.state.visible}),e.setState({activeItem:n})}}),r.a.createElement(N.a.Item,{name:"messages",active:"messages"===l,onClick:this.handleItemClick}),r.a.createElement(N.a.Item,{name:"friends",active:"friends"===l,onClick:this.handleItemClick}))),r.a.createElement(L.a,{basic:!0},r.a.createElement(p.a,{as:"h3"},"Application Content"),r.a.createElement(f.a,{onClick:function(){return I.auth().signOut()}},"Sign out")))))}}]),t}(n.Component),D=a(398),G=a(388),J=a(390),V=function(){return"undefined"===typeof window?D.a.onlyTablet.minWidth:window.innerWidth},K=function(e){var t=e.mobile;return r.a.createElement(E.a,{text:!0},r.a.createElement(p.a,{as:"h1",content:"RevCode",inverted:!0,style:{fontSize:t?"2em":"4em",fontWeight:"normal",marginBottom:0,marginTop:t?"1.5em":"3em"}}),r.a.createElement(p.a,{as:"h3",inverted:!0,style:{fontSize:t?"1.5em":"1.7em",fontWeight:"normal",marginTop:t?"0.5em":"1.5em"}},r.a.createElement(p.a.Content,null,r.a.createElement("b",null,"<>")," Speak your code ",r.a.createElement("b",null,"</>"))),r.a.createElement(f.a,{primary:!0,size:"huge",style:{marginTop:t?"0.5em":"1.5em"}},"Get Started",r.a.createElement(R.a,{name:"right arrow"})))},Q=function(e){function t(){var e,a;Object(W.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(z.a)(this,(e=Object(H.a)(t)).call.apply(e,[this].concat(r)))).state={},a.hideFixedMenu=function(){return a.setState({fixed:!1})},a.showFixedMenu=function(){return a.setState({fixed:!0})},a}return Object(q.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this.props.children,t=this.state.fixed;return r.a.createElement(D.a,{getWidth:V,minWidth:D.a.onlyTablet.minWidth},r.a.createElement(G.a,{once:!1,onBottomPassed:this.showFixedMenu,onBottomPassedReverse:this.hideFixedMenu},r.a.createElement(L.a,{inverted:!0,textAlign:"center",style:{minHeight:700,padding:"1em 0em"},vertical:!0},r.a.createElement(N.a,{fixed:t?"top":null,inverted:!t,pointing:!t,secondary:!t,size:"large"},r.a.createElement(E.a,null,r.a.createElement(N.a.Item,{as:"a",active:!0},"Home"),r.a.createElement(N.a.Item,{as:"a"},"###"),r.a.createElement(N.a.Item,{as:"a"},"###"),r.a.createElement(N.a.Item,{as:"a"},"###"),r.a.createElement(N.a.Item,{position:"right"},r.a.createElement(i.b,{to:"/login"},r.a.createElement(f.a,{inverted:!t},"Log In")),r.a.createElement(i.b,{to:"/register"},r.a.createElement(f.a,{inverted:!t,primary:t,style:{marginLeft:"0.5em"}},"Sign Up"))))),r.a.createElement(K,null))),e)}}]),t}(n.Component),Y=function(e){function t(){var e,a;Object(W.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(z.a)(this,(e=Object(H.a)(t)).call.apply(e,[this].concat(r)))).state={},a.handleSidebarHide=function(){return a.setState({sidebarOpened:!1})},a.handleToggle=function(){return a.setState({sidebarOpened:!0})},a}return Object(q.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this.props.children,t=this.state.sidebarOpened;return r.a.createElement(D.a,{as:B.a.Pushable,getWidth:V,maxWidth:D.a.onlyMobile.maxWidth},r.a.createElement(B.a,{as:N.a,animation:"push",inverted:!0,onHide:this.handleSidebarHide,vertical:!0,visible:t},r.a.createElement(N.a.Item,{as:"a",active:!0},"Home"),r.a.createElement(N.a.Item,{as:"a"},"####"),r.a.createElement(N.a.Item,{as:"a"},"####"),r.a.createElement(N.a.Item,{as:"a"},"####"),r.a.createElement(N.a.Item,{as:"a"},"####"),r.a.createElement(N.a.Item,{as:"a"},"####")),r.a.createElement(B.a.Pusher,{dimmed:t},r.a.createElement(L.a,{inverted:!0,textAlign:"center",style:{minHeight:350,padding:"1em 0em"},vertical:!0},r.a.createElement(E.a,null,r.a.createElement(N.a,{inverted:!0,pointing:!0,secondary:!0,size:"large"},r.a.createElement(N.a.Item,{onClick:this.handleToggle},r.a.createElement(R.a,{name:"sidebar"})),r.a.createElement(N.a.Item,{position:"right"},r.a.createElement(f.a,{as:"a",inverted:!0},"Log in"),r.a.createElement(f.a,{as:"a",inverted:!0,style:{marginLeft:"0.5em"}},"Sign Up")))),r.a.createElement(K,{mobile:!0})),e))}}]),t}(n.Component),Z=function(e){var t=e.children;return r.a.createElement("div",null,r.a.createElement(Q,null,t),r.a.createElement(Y,null,t))},$=function(){return Object(n.useContext)(O).currentUser?r.a.createElement(o.a,{to:"/main"}):r.a.createElement(Z,null,r.a.createElement(L.a,{style:{padding:"8em 0em"},vertical:!0},r.a.createElement(g.a,{container:!0,stackable:!0,verticalAlign:"middle"},"###Content###")),r.a.createElement(L.a,{inverted:!0,vertical:!0,style:{padding:"5em 0em"}},r.a.createElement(E.a,null,r.a.createElement(g.a,{divided:!0,inverted:!0,stackable:!0},r.a.createElement(g.a.Row,null,r.a.createElement(g.a.Column,{width:3},r.a.createElement(p.a,{inverted:!0,as:"h4",content:"#####"}),r.a.createElement(J.a,{link:!0,inverted:!0},r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"))),r.a.createElement(g.a.Column,{width:3},r.a.createElement(p.a,{inverted:!0,as:"h4",content:"#####"}),r.a.createElement(J.a,{link:!0,inverted:!0},r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"),r.a.createElement(J.a.Item,{as:"a"},"######"))),r.a.createElement(g.a.Column,{width:7},r.a.createElement(p.a,{as:"h4",inverted:!0},"######"),r.a.createElement("p",null,"########################")))))))},X=a(204),_=function(e){var t=e.component,a=Object(X.a)(e,["component"]),l=Object(n.useContext)(O).currentUser;return r.a.createElement(o.b,Object.assign({},a,{render:function(e){return l?r.a.createElement(t,e):r.a.createElement(o.a,{to:"/login"})}}))},ee=function(){return r.a.createElement(j,null,r.a.createElement(i.a,null,r.a.createElement("div",null,r.a.createElement(o.b,{exact:!0,path:"/",component:$}),r.a.createElement(_,{exact:!0,path:"/main",component:F}),r.a.createElement(o.b,{exact:!0,path:"/login",component:k}),r.a.createElement(o.b,{exact:!0,path:"/register",component:U}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[213,1,2]]]);
//# sourceMappingURL=main.4fffa3f5.chunk.js.map