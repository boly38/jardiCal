(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{56:function(e,t,n){e.exports=n(75)},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(28),c=n.n(o),s=(n(61),n(6)),l=n(7),i=n(15),u=n(10),m=n(9),h=(n(62),n(82)),d=(n(63),function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.version?this.props.version:"";return r.a.createElement("div",{className:"corner-ribbon bottom-right sticky blue shadow"},"Alpha ",r.a.createElement("sup",null,e))}}]),n}(a.Component)),p=(n(64),n(81)),v=n(80),f="UA-1988442-19",E={ADMIN:"ADMIN",MENU:"MENU",ENTRIES:"ENTRIES"},b=n(38),k=function(e){b.a.initialize(e)},y=function(e,t,n){b.a.event({category:e,action:t,label:n})},g=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).onMenuClic=a.onMenuClic.bind(Object(i.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){k(f)}},{key:"onMenuClic",value:function(e){console.info("onMenuClic",e),y(E.MENU,e,"Menu clic on "+e)}},{key:"render",value:function(){return r.a.createElement(p.a,{bg:"light",expand:"lg"},r.a.createElement(p.a.Brand,{href:"/",onClick:this.onMenuClic.bind(this,"logo")},"JardiCal"),r.a.createElement(p.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(p.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"container-fluid"},r.a.createElement(v.a.Link,{href:"/docs",onClick:this.onMenuClic.bind(this,"entr\xe9es")},"Entr\xe9es"),this.props.roles&&this.props.roles.includes("owner")?r.a.createElement(v.a.Link,{href:"/owner",onClick:this.onMenuClic.bind(this,"admin"),className:"ml-auto"},"Admin."):null)))}}]),n}(a.Component),j=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"jhome"},r.a.createElement("h1",null,"JardiCal"),r.a.createElement("p",null,"Retrouvez quand planter quoi, et quand r\xe9colter !"))}}]),n}(a.Component),S=n(83),O=n(51),N=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).data="",a.handleMonthsChange=a.handleMonthsChange.bind(Object(i.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;if(""===this.data){console.log("fetch json");var t=this;fetch("/garden.json").then((function(e){return e.json()})).then((function(n){t.data=n,console.log("data",n),e.forceUpdate()})).catch(console.log)}}},{key:"handleMonthsChange",value:function(e){var t=this;console.log("handleMonthsChange",e),this.bucket=[],this.ground=[],this.data.forEach((function(n){if(n.sowBucket){var a=!1;n.sowBucket.forEach((function(t){e.includes(t)&&(a=!0)})),a&&t.bucket.push(n.name)}if(n.sowGround){var r=!1;n.sowGround.forEach((function(t){e.includes(t)&&(r=!0)})),r&&t.ground.push(n.name)}})),this.forceUpdate()}},{key:"render",value:function(){return r.a.createElement("div",{className:"jmonth"},r.a.createElement("div",{className:"selectMonth"},r.a.createElement("h1",null,"Par mois"),r.a.createElement("p",null,"Choisissez un ou plusieurs mois"),r.a.createElement(S.a,{type:"checkbox",defaultValue:[],className:"mb-2",onChange:this.handleMonthsChange},r.a.createElement(O.a,{value:1},"Janvier"),r.a.createElement(O.a,{value:2},"F\xe9vrier"),r.a.createElement(O.a,{value:3},"Mars"),r.a.createElement(O.a,{value:4},"Avril"),r.a.createElement(O.a,{value:5},"Mai"),r.a.createElement(O.a,{value:6},"Juin"),r.a.createElement(O.a,{value:7},"Juillet"),r.a.createElement(O.a,{value:8},"Ao\xfbt"),r.a.createElement(O.a,{value:9},"Septembre"),r.a.createElement(O.a,{value:10},"Octobre"),r.a.createElement(O.a,{value:11},"Novembre"),r.a.createElement(O.a,{value:12},"D\xe9cembre"))),r.a.createElement("div",{className:"showMonth"},"Semis en godets : ",this.bucket,r.a.createElement("br",null),"Semis en pleine terre : ",this.ground,r.a.createElement("br",null)))}}]),n}(a.Component),C=(n(68),n(78)),M=n(79),w=n(53),D=n(52),R=n(37),x=n(77),A=(n(69),function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.value;return r.a.createElement("div",null,r.a.createElement(D.a,{variant:e.includes(1)?"primary":"secondary",size:"sm",disabled:!0},"jan."),r.a.createElement(D.a,{variant:e.includes(2)?"primary":"secondary",size:"sm",disabled:!0},"f\xe9v."),r.a.createElement(D.a,{variant:e.includes(3)?"primary":"secondary",size:"sm",disabled:!0},"mars"),r.a.createElement(D.a,{variant:e.includes(4)?"primary":"secondary",size:"sm",disabled:!0},"avril"),r.a.createElement(D.a,{variant:e.includes(5)?"primary":"secondary",size:"sm",disabled:!0},"mai"),r.a.createElement(D.a,{variant:e.includes(6)?"primary":"secondary",size:"sm",disabled:!0},"juin"),r.a.createElement(D.a,{variant:e.includes(7)?"primary":"secondary",size:"sm",disabled:!0},"juil."),r.a.createElement(D.a,{variant:e.includes(8)?"primary":"secondary",size:"sm",disabled:!0},"ao\xfbt"),r.a.createElement(D.a,{variant:e.includes(9)?"primary":"secondary",size:"sm",disabled:!0},"sep."),r.a.createElement(D.a,{variant:e.includes(10)?"primary":"secondary",size:"sm",disabled:!0},"oct."),r.a.createElement(D.a,{variant:e.includes(11)?"primary":"secondary",size:"sm",disabled:!0},"nov."),r.a.createElement(D.a,{variant:e.includes(12)?"primary":"secondary",size:"sm",disabled:!0},"d\xe9c."))}}]),n}(a.Component)),z=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"onUnselect",value:function(){this.props.onUnselect()}},{key:"render",value:function(){return r.a.createElement("div",{className:"doc-selected"},r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{colSpan:"2"},r.a.createElement("span",{className:"entryName"},this.props.doc.nom),r.a.createElement(C.a,{variant:"info",size:"sm mr-2 mt-2",style:{cursor:"pointer"},onClick:this.onUnselect.bind(this)},"Fermer ",r.a.createElement(R.a,null))))),r.a.createElement("tbody",null,this.props.doc.semi&&this.props.doc.semi.m?r.a.createElement("tr",null,r.a.createElement("td",null,"Semi"),r.a.createElement("td",null,r.a.createElement(A,{name:"semi",value:this.props.doc.semi.m}))):null,this.props.doc.plantation&&this.props.doc.plantation.m?r.a.createElement("tr",null,r.a.createElement("td",null,"Plantation"),r.a.createElement("td",null,r.a.createElement(A,{name:"plantation",value:this.props.doc.plantation.m}))):null,this.props.doc.floraison&&this.props.doc.floraison.m?r.a.createElement("tr",null,r.a.createElement("td",null,"Floraison"),r.a.createElement("td",null,r.a.createElement(A,{name:"floraison",value:this.props.doc.floraison.m}))):null,this.props.doc.recolte&&this.props.doc.recolte.m?r.a.createElement("tr",null,r.a.createElement("td",null,"R\xe9colte"),r.a.createElement("td",null,r.a.createElement(A,{name:"recolte",value:this.props.doc.recolte.m}))):null,r.a.createElement("tr",null,r.a.createElement("td",null,"Nom scientifique"),r.a.createElement("td",null,this.props.doc.nom_scientifique)),r.a.createElement("tr",null,r.a.createElement("td",null,"Famille"),r.a.createElement("td",null,this.props.doc.familles.join(" - "))),r.a.createElement("tr",null,r.a.createElement("td",null,"Type"),r.a.createElement("td",null,this.props.doc.type.join(" - "))))))}}]),n}(a.Component),U=n(32),I=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"onSelect",value:function(e){this.props.onSelect(e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"doc-choice"},r.a.createElement(C.a,{variant:"success",size:"sm mr-2 mt-2",style:{cursor:"pointer"},title:this.props.doc.type,onClick:this.onSelect.bind(this,this.props.doc)},this.props.doc.nom,"\xa0",this.props.doc.type.map((function(e,t){return"fleur"===e?r.a.createElement(U.b,{key:t}):"fruit"===e?r.a.createElement(U.d,{key:t}):"l\xe9gume"===e?r.a.createElement(U.a,{key:t}):r.a.createElement(U.c,{key:t})}))))}}]),n}(a.Component),L=n(17),T=n.n(L),P=n(29),_=function(){function e(){Object(s.a)(this,e)}return Object(l.a)(e,null,[{key:"about",value:function(t,n){fetch("/api/v0/about").then(function(){var a=Object(P.a)(T.a.mark((function a(r){var o;return T.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return o=null,a.prev=1,a.next=4,r.json();case 4:o=a.sent,e.debug&&console.log("RESPONSE",o),a.next=10;break;case 8:a.prev=8,a.t0=a.catch(1);case 10:if(r.ok){a.next=13;break}return n(),a.abrupt("return");case 13:t(o);case 14:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e){return a.apply(this,arguments)}}()).catch((function(t){e.debug&&console.log("ERR",t),n(t)}))}},{key:"getDocs",value:function(t,n,a){var r=e.objToQueryString(t);fetch("/api/v0/docs?".concat(r)).then(function(){var t=Object(P.a)(T.a.mark((function t(a){var r,o;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.json();case 2:if(r=t.sent,e.debug&&console.log("RESPONSE",r),a.ok){t.next=7;break}return o=r&&r.details||r&&r.message||a.status,t.abrupt("return",Promise.reject(o));case 7:n(r);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.debug&&console.log("ERR",t),a(t)}))}},{key:"samples",value:function(t,n){fetch("/api/v0/docs/samples",{method:"POST"}).then(function(){var a=Object(P.a)(T.a.mark((function a(r){var o;return T.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return o=null,a.prev=1,a.next=4,r.json();case 4:o=a.sent,e.debug&&console.log("RESPONSE",o),a.next=10;break;case 8:a.prev=8,a.t0=a.catch(1);case 10:if(r.ok){a.next=13;break}return n(),a.abrupt("return");case 13:t(o.count);case 14:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e){return a.apply(this,arguments)}}()).catch((function(t){e.debug&&console.log("ERR",t),n(t)}))}},{key:"removeAllDocs",value:function(t,n){fetch("/api/v0/docs",{method:"DELETE"}).then(function(){var n=Object(P.a)(T.a.mark((function n(a){var r,o;return T.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.json();case 2:if(r=n.sent,e.debug&&console.log("RESPONSE",r),a.ok){n.next=7;break}return o=r&&r.details||r&&r.message||a.status,n.abrupt("return",Promise.reject(o));case 7:t(r.count);case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(t){e.debug&&console.log("ERR",t),n(t)}))}},{key:"removeAllContribs",value:function(t,n){fetch("/api/v0/contributions",{method:"DELETE"}).then(function(){var n=Object(P.a)(T.a.mark((function n(a){var r,o;return T.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.json();case 2:if(r=n.sent,e.debug&&console.log("RESPONSE",r),a.ok){n.next=7;break}return o=r&&r.details||r&&r.message||a.status,n.abrupt("return",Promise.reject(o));case 7:t(r.count);case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(t){e.debug&&console.log("ERR",t),n(t)}))}},{key:"objToQueryString",value:function(e){var t=[];for(var n in e)t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}}]),e}();_.debug=!1;var J=_,B=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={docs:null,errorMessage:null,infoMessage:null,hasNext:!0,searchString:"",bookmark:"",searchLocked:!1},e._handleKeyDown=function(t){switch(t.keyCode){case 27:e.onUnSearch();break;case 39:e.onNext();break;case 38:e.onReload()}},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){k(f),this._refocus(),this.searchDocs(),document.addEventListener("keydown",this._handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this._handleKeyDown)}},{key:"_refocus",value:function(){this.entriesSearch&&this.entriesSearch.focus()}},{key:"onReload",value:function(){var e=this;this.setState({searchString:"",bookmark:"",searchLocked:!1},(function(){return e.searchDocs()}))}},{key:"onSearch",value:function(e){e&&e.preventDefault();var t=this,n="search "+this.entriesSearch.value;y(E.ENTRIES,n,n),this.setState({searchString:this.entriesSearch.value,bookmark:"",searchLocked:!0},(function(){return t.searchDocs()}))}},{key:"onNext",value:function(){var e=this;y(E.ENTRIES,"list next","list next");var t=this.state.docs[this.state.docs.length-1]._id;this.setState({bookmark:t,searchLocked:!1},(function(){return e.searchDocs()}))}},{key:"onSelect",value:function(e){var t="select "+e.nom;y(E.ENTRIES,t,t),this.setState({doc:e})}},{key:"onUnselect",value:function(){var e=this,t="unselect"+this.state.doc.nom;y(E.ENTRIES,t,t),this.setState({doc:null},(function(){return e.searchDocs()}))}},{key:"onUnlock",value:function(){var e=this;this.setState({searchLocked:!1},(function(){return e.entriesSearch.focus()}))}},{key:"onUnSearch",value:function(){this.onReload()}},{key:"searchDocs",value:function(){var e=this,t=this.state.bookmark,n=this.state.searchString,a={limit:5};t&&""!==t&&(a.bookmark=t),n&&""!==n&&(a.nom=n),J.getDocs(a,(function(n){if(n.length)e.setState({docs:n,errorMessage:null,infoMessage:null,hasNext:!0},(function(){return e._refocus()}));else{var a={hasNext:!1};null!=t&&""!==t||(a.infoMessage="aucun r\xe9sultat",a.docs=null),e.setState(a,(function(){return e._refocus()}))}}),(function(t){e.setState({errorMessage:t},(function(){return e._refocus()}))}))}},{key:"render",value:function(){var e=this,t=this.state.searchString;return r.a.createElement("div",{className:"jdocs"},this.state.errorMessage?r.a.createElement(h.a,{variant:"warning"},this.state.errorMessage):null,r.a.createElement("div",{className:"infoBox"},this.state.infoMessage,"\xa0"),this.state.doc?r.a.createElement("div",null," ",r.a.createElement(z,{doc:this.state.doc,onUnselect:this.onUnselect.bind(this)})," "):r.a.createElement("div",{className:"docsList"},r.a.createElement("p",null,"Entr\xe9es li\xe9es au jardin"),this.state.searchLocked?r.a.createElement("div",{className:"mb-3"},r.a.createElement(C.a,{variant:"secondary",size:"sm mr-2 mt-2",onClick:this.onUnlock.bind(this)},"search : ",this.state.searchString),"\xa0",r.a.createElement(R.a,{onClick:this.onUnSearch.bind(this),style:{cursor:"pointer"},title:"Annuler la recherche (raccourci: Escape)"})):r.a.createElement(M.a,{inline:!0,className:"mb-3",onSubmit:this.onSearch.bind(this)},r.a.createElement(w.a,{key:"entriesSearch",type:"text",placeholder:"Recherche par nom",value:t,className:"mr-sm-2",onChange:function(t){return e.setState({searchString:t.target.value})},ref:function(t){e.entriesSearch=t}}),r.a.createElement(D.a,{key:"entriesSearchButton",variant:"outline-success",onClick:this.onSearch.bind(this),title:"Lancer la recherche (raccourci: Enter)"},"Rechercher")),this.state.docs&&this.state.docs.length?r.a.createElement("div",null,this.state.docs.map((function(t,n){return r.a.createElement(I,{key:n,index:n,doc:t,onSelect:e.onSelect.bind(e)})}))):null,this.state.hasNext?r.a.createElement("div",null,r.a.createElement(C.a,{variant:"info",size:"sm mr-2 mt-2",style:{cursor:"pointer"},onClick:this.onNext.bind(this),title:"Suivant (raccourci: <Fl\xe8che droite>)"},"...")):r.a.createElement("div",null,r.a.createElement(C.a,{variant:"info",size:"sm mr-2 mt-2",style:{cursor:"pointer"},onClick:this.onReload.bind(this),title:"Raccourci (raccourci: <Fl\xe8che du haut>)"},"Recharger"))))}}]),n}(a.Component),F=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={docs:null,errorMessage:null,infoMessage:null},a.onAddSample=a.onAddSample.bind(Object(i.a)(a)),a.onRemoveDocuments=a.onRemoveDocuments.bind(Object(i.a)(a)),a.onRemoveContribs=a.onRemoveContribs.bind(Object(i.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){k(f)}},{key:"onRemoveDocuments",value:function(){var e=this,t=this;J.removeAllDocs((function(e){var n=e+" \xe9chantillon(s) supprim\xe9(s)";y(E.ADMIN,"removeAllDocs",n),t.props.onActionDone(n)}),(function(t){e.setState({errorMessage:t})}))}},{key:"onRemoveContribs",value:function(){var e=this,t=this;J.removeAllContribs((function(e){var n=e+" contribution(s) supprim\xe9(s)";y(E.ADMIN,"removeAllContribs",n),t.props.onActionDone(n)}),(function(t){e.setState({errorMessage:t})}))}},{key:"onAddSample",value:function(){var e=this,t=this;J.samples((function(e){var n=e+" \xe9chantillons en base";y(E.ADMIN,"samples",n),t.props.onActionDone(n)}),(function(t){e.setState({errorMessage:t})}))}},{key:"render",value:function(){var e=this,t=null,n=null,a=null,o=null,c=this.props.about&&this.props.about.roles.includes("owner"),s=this.props.about&&this.props.about.roles.includes("admin");return this.props.about&&(t=this.props.about.dbName,n=this.props.about.documents,a=this.props.about.adminDbName,o=this.props.about.contributions),r.a.createElement("div",{className:"jadmin"},this.state.errorMessage?r.a.createElement(h.a,{variant:"warning"},this.state.errorMessage):null,this.state.infoMessage?r.a.createElement(h.a,{variant:"info"},this.state.infoMessage):null,r.a.createElement("div",{className:"adminContent"},r.a.createElement("h1",null,"Configuration"),r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Base"),r.a.createElement("th",null,"Nom"),r.a.createElement("th",null,"Nombre d'entr\xe9es"),r.a.createElement("th",null,"Actions"))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"Utilisateur"),r.a.createElement("td",null,t),r.a.createElement("td",null,n),r.a.createElement("td",null,c?r.a.createElement(D.a,{variant:"secondary",size:"sm",className:"mr-2",onClick:this.onAddSample.bind(this)},"Ajout d'un \xe9chantillon"):null,c&&n>0?r.a.createElement(D.a,{variant:"secondary",size:"sm",onClick:function(){window.confirm("\xcates-vous s\xfbr de vouloir supprimer les documents ?")&&e.onRemoveDocuments()}},"Supprimer"):null)),a?r.a.createElement("tr",null,r.a.createElement("td",null,"Contribution"),r.a.createElement("td",null,a),r.a.createElement("td",null,o),r.a.createElement("td",null,s&&o>0?r.a.createElement(D.a,{variant:"secondary",size:"sm",onClick:function(){window.confirm("\xcates-vous s\xfbr de vouloir supprimer les contributions ?")&&e.onRemoveContribs()}},"Supprimer"):null)):null))))}}]),n}(a.Component),q=n(54),K=n(8),W=(n(71),function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={errorMessage:null,about:null},a.onActionDone=a.onActionDone.bind(Object(i.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){k(f),b.a.pageview(window.location.pathname+window.location.search),null==this.state.about&&null==this.state.errorMessage&&this.doAbout()}},{key:"doAbout",value:function(){var e=this;J.about((function(t){e.setState({about:t})}),(function(t){e.setState({errorMessage:t})}))}},{key:"onActionDone",value:function(e){console.info("onActionDone",e),this.doAbout()}},{key:"render",value:function(){var e=this,t=[];return this.state.about&&this.state.about.roles&&(t=this.state.about.roles),r.a.createElement(q.a,null,r.a.createElement(d,null),this.state.about?r.a.createElement(d,{version:this.state.about.version.api}):r.a.createElement(d,null),r.a.createElement("div",{className:"app"},this.state.errorMessage?r.a.createElement(h.a,{variant:"warning"},this.state.errorMessage):null,r.a.createElement("div",{className:"JMenu"},r.a.createElement(g,{roles:t})),r.a.createElement("div",{className:"JContent"},r.a.createElement(K.c,null,r.a.createElement(K.a,{exact:!0,path:"/",component:function(){return r.a.createElement(j,null)}}),r.a.createElement(K.a,{exact:!0,path:"/month",component:function(){return r.a.createElement(N,null)}}),r.a.createElement(K.a,{exact:!0,path:"/docs",component:function(){return r.a.createElement(B,null)}}),t.includes("owner")?r.a.createElement(K.a,{exact:!0,path:"/owner",component:function(){return r.a.createElement(F,{about:e.state.about,onActionDone:e.onActionDone})}}):null))))}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[56,1,2]]]);
//# sourceMappingURL=main.86165607.chunk.js.map