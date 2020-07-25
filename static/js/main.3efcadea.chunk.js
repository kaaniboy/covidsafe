(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{100:function(e,t,a){},104:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(36),o=a(34),s=a(31),c=a.n(s),l=a(40),u=a(9),m=a.n(u),d=a(11),p=a(27),v=a(28),g=a(29),f=a(30),h=a(118),b=a(121),y=a(114),w=a(12),k=a.n(w),E={Food:"utensils","Nightlife Spot":"utensils","Shop & Service":"store"};function C(){return(C=Object(d.a)(m.a.mark((function e(t,a,n){var r,i,o,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n?"?query=".concat(n,"&ll=").concat(t,",").concat(a):"?ll=".concat(t,",").concat(a),e.next=3,fetch("https://covidsafe.herokuapp.com/places"+r);case 3:return i=e.sent,e.next=6,i.json();case 6:return o=e.sent,s=o.sort((function(e,t){return t.location.lat-e.location.lat})),e.abrupt("return",new Promise((function(e){return e(s)})));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x={retrievePlaces:function(e,t,a){return C.apply(this,arguments)},getCategoryIcon:function(e){return E[e.category]||"store"}},S=a(58),N=a(112),M=a(120),R=a(59),O=a.n(R),I=a(52),j=a(117),P=a(109),D=a(119),_=a(53),A=a.n(_);function T(){var e=Object(I.a)(["\n  mutation (\n    $placeId: String!\n    $userId: String!\n    $content: String\n    $employeeMasks: Int\n    $customerMasks: Int\n    $distancing: Int\n    $dividers: Int\n    $diningType: String\n  ) {\n    createReview(input: {\n      review: {\n        placeId: $placeId\n        userId: $userId\n        content: $content\n        employeeMasks: $employeeMasks\n        customerMasks: $customerMasks\n        distancing: $distancing\n        dividers: $dividers\n        diningType: $diningType\n      }\n    }) { clientMutationId }\n  }\n"]);return T=function(){return e},e}function L(){var e=Object(I.a)(["\n  query ($placeId: String!) {\n    allReviews(\n      condition: { placeId: $placeId }\n      orderBy: CREATED_AT_DESC\n    ) {\n      edges {\n        node {\n          id content userId\n          placeId updatedAt createdAt\n          employeeMasks customerMasks\n          distancing dividers diningType\n        }\n      }\n    }\n  }\n"]);return L=function(){return e},e}var F=A()(L()),q=A()(T()),H=new j.a({uri:"https://covidsafe.herokuapp.com/graphql"}),V=new P.a({link:H,cache:new D.a,defaultOptions:{query:{fetchPolicy:"no-cache"}}});function $(){return($=Object(d.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.query({query:F,variables:{placeId:t}});case 2:return a=e.sent,e.abrupt("return",a.data.allReviews.edges.map((function(e){return e.node})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return(B=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.mutate({mutation:q,variables:t});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var z={createReview:function(e){return B.apply(this,arguments)},getPlaceReviews:function(e){return $.apply(this,arguments)}},W=2.5,U=4,Y={unknown:"primary",low:"success",medium:"warning",high:"danger"},J={unknown:"",low:"normal",medium:"increased",high:"high"},K={employeeMasks:"Employees %s wear masks.",customerMasks:"Customers %s wear masks.",distancing:"Social distancing is %s enforced.",dividers:"of reviewers say dividers are present.",diningTypes:""};function G(){return(G=Object(d.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://covidsafe.herokuapp.com/rating"+"?placeId=".concat(t.id));case 2:return a=e.sent,e.next=5,a.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Q={getCategoryMessage:function(e,t){if("diningTypes"===t)return e.diningTypes?void 0:"This category does not have any ratings yet.";if(void 0===e.categories[t])return"This category does not have any ratings yet.";var a=e.categories[t],n="almost always";return a<=W?n="rarely":a<=U&&(n="often"),K[t].replace("%s",n)},getCategoryRisk:function(e,t){if("diningTypes"===t||void 0===e.categories[t])return"unknown";var a=e.categories[t],n=function(e){return"dividers"===t?.25*(e-1):e},r="low";return a<=n(W)?r="high":a<=n(U)&&(r="medium"),r},formatCategoryRating:function(e,t){return void 0===e.categories[t]?null:"dividers"===t?"".concat((100*e.categories[t]).toFixed(0),"%"):"".concat(e.categories[t].toFixed(1)," / 5")},getOverallRisk:function(e){var t=e.rating.overallRating;return void 0===t?"unknown":t<=W?"high":t<=U?"medium":"low"},retrievePlaceRating:function(e){return G.apply(this,arguments)}},X=a(32),Z=(a(88),a(110)),ee=a(65);function te(e){var t=e.place,a=e.isPanelExpanded,n=e.divRef,i=e.onToggleExpanded;return r.a.createElement("div",{className:"place-header",ref:function(e){return n(e)}},r.a.createElement("div",{className:"text-center"},r.a.createElement(X.a,{className:"chevron-icon",icon:"chevron-".concat(a?"down":"up"),color:"black",size:"2x",onClick:i})),r.a.createElement(Z.a,null,r.a.createElement(ee.a,{xs:10},r.a.createElement("h5",{className:"place-name wrap-text"},t.name),r.a.createElement("p",{className:"place-address wrap-text"},t.location.address)),r.a.createElement(ee.a,{xs:2},r.a.createElement(X.a,{className:"place-icon",icon:x.getCategoryIcon(t),color:"black",size:"2x"}))))}function ae(e){var t=e.risk;if("unknown"===t)return null;var a=J[t].toUpperCase()+" RISK";return r.a.createElement("div",{className:"risk-indicator bg-".concat(Y[t])},r.a.createElement("p",{className:"risk-text"},a))}var ne=a(66),re=a.n(ne);function ie(e){var t=e.review,a=re.a.utc(t.createdAt).fromNow().toUpperCase();return r.a.createElement("div",{className:"place-review",key:t.id},r.a.createElement("p",{className:"review-time"},a),r.a.createElement("p",{className:"review-text"},t.content))}function oe(e){var t=e.reviews.filter((function(e){return e.content&&""!==e.content.trim()}));return r.a.createElement("div",{className:"place-reviews-list"},0===t.length?r.a.createElement("p",{className:"no-reviews"},"This location does not have any reviews yet."):t.map((function(e){return r.a.createElement(ie,{review:e,key:e.id})})))}var se=a(115),ce=(a(57),a(116));function le(e){var t=e.question,a=e.options,n=e.value,i=e.onChange;return r.a.createElement("div",{className:"radio-question"},r.a.createElement("h6",{className:"question-label"},t),r.a.createElement(Z.a,null,r.a.createElement(ee.a,{xs:{span:9,offset:3},md:{span:8,offset:4}},a.map((function(e){return r.a.createElement(ce.a.Check,{type:"radio",label:e.label,key:e.label,onChange:function(){return i(e.value)},checked:n===e.value})})))))}var ue=a(111),me=[{label:"1",value:1,primaryColor:"#FA533D",secondaryColor:"#FDBAB1"},{label:"2",value:2,primaryColor:"#FB873E",secondaryColor:"#FDCFB2"},{label:"3",value:3,primaryColor:"#FAB53F",secondaryColor:"#FDE2B2"},{label:"4",value:4,primaryColor:"#B6C64C",secondaryColor:"#E2E9B9"},{label:"5",value:5,primaryColor:"#94C975",secondaryColor:"#D5E9C8"}];function de(e){var t=e.question,a=e.leftLabel,n=e.rightLabel,i=e.value,o=e.onChange;return r.a.createElement("div",{className:"rating-question"},r.a.createElement("h6",{className:"question-label"}," ",t),r.a.createElement("div",{className:"buttons-container"},r.a.createElement("div",{className:"buttons"},r.a.createElement("p",{className:"side-label"},a),r.a.createElement(ue.a,null,me.map((function(e){return r.a.createElement(M.a,{className:"rating-button",style:{color:i===e.value?"white":e.primaryColor,backgroundColor:i===e.value?e.primaryColor:e.secondaryColor,borderColor:e.primaryColor},variant:i===e.value?"primary":"outline-primary",key:e.label,onClick:function(){return t=e.value,void o(t===i?void 0:t);var t}},e.label)}))),r.a.createElement("p",{className:"side-label"},n))))}var pe=[{label:"Dine-In",value:"dine_in"},{label:"Pick-Up",value:"pick_up"},{label:"Drive-Thru",value:"drive_thru"},{label:"None of the above",value:void 0}];function ve(e){var t=e.review,a=e.onFieldChange;return r.a.createElement("div",{className:"review-form"},r.a.createElement(le,{question:"What dining style did you use?",options:pe,value:t.diningType,onChange:function(e){return a("diningType",e)}}),r.a.createElement(de,{question:"Do employees wear masks?",leftLabel:"None",rightLabel:"All",value:t.employeeMasks,onChange:function(e){return a("employeeMasks",e)}}),r.a.createElement(de,{question:"Do customers wear masks?",leftLabel:"None",rightLabel:"All",value:t.customerMasks,onChange:function(e){return a("customerMasks",e)}}),r.a.createElement(de,{question:"How carefully is social distancing enforced?",leftLabel:"Not at all",rightLabel:"Very",value:t.distancing,onChange:function(e){return a("distancing",e)}}),r.a.createElement("h6",{className:"text-center"},"Any additional comments?"),r.a.createElement(ce.a.Control,{value:t.content,as:"textarea",rows:3,placeholder:"Include any other details related to your visit.",onChange:function(e){return a("content",e.target.value)}}))}var ge=[{label:"Yes",value:1},{label:"No",value:0},{label:"Not sure",value:void 0}];function fe(e){var t=e.review,a=e.onFieldChange;return r.a.createElement("div",{className:"review-form"},r.a.createElement(le,{question:"Does this location have dividers (eg, plexiglass) installed?",options:ge,value:t.dividers,onChange:function(e){return a("dividers",e)}}),r.a.createElement(de,{question:"Do employees wear masks?",leftLabel:"None",rightLabel:"All",value:t.employeeMasks,onChange:function(e){return a("employeeMasks",e)}}),r.a.createElement(de,{question:"Do customers wear masks?",leftLabel:"None",rightLabel:"All",value:t.customerMasks,onChange:function(e){return a("customerMasks",e)}}),r.a.createElement(de,{question:"How carefully is social distancing enforced?",leftLabel:"Not at all",rightLabel:"Very",value:t.distancing,onChange:function(e){return a("distancing",e)}}),r.a.createElement("h6",{className:"text-center"},"Any additional comments?"),r.a.createElement(ce.a.Control,{value:t.content,as:"textarea",rows:3,placeholder:"Include any other details related to your visit.",onChange:function(e){return a("content",e.target.value)}}))}var he=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e){var n;Object(p.a)(this,a),(n=t.call(this,e)).submitReview=Object(d.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props.onSubmit,a=n.state.review,n.setState({isSubmitDisabled:!0}),e.prev=3,e.next=6,z.createReview(a);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),console.log(e.t0);case 11:t();case 12:case"end":return e.stop()}}),e,null,[[3,8]])}))),n.getUserId=function(){return localStorage.getItem("userId")||localStorage.setItem("userId",Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)),localStorage.getItem("userId")},n.updateReview=function(e,t){var a=n.state.review;a[e]=t,n.setState({review:a})};var r=n.props.place,i=n.getUserId();return n.state={review:{userId:i,placeId:r.id},isSubmitDisabled:!1},n}return Object(v.a)(a,[{key:"componentDidUpdate",value:function(e){if(!e.isVisible&&this.props.isVisible){var t=this.getUserId();this.setState({review:{userId:t,placeId:this.props.place.id},isSubmitDisabled:!1})}}},{key:"render",value:function(){var e=this.props,t=e.place,a=e.isVisible,n=e.onClose,i=this.state,o=i.review,s=i.isSubmitDisabled;return a?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"backdrop"}),r.a.createElement(se.a.Dialog,{className:"review-modal",scrollable:!0},r.a.createElement(se.a.Header,{closeButton:!0,onHide:n},r.a.createElement(se.a.Title,null,"Write a Review")),r.a.createElement(se.a.Body,null,r.a.createElement("p",{className:"text-center"},"Answer the following questions about ",r.a.createElement("b",null,t.name),". You may leave questions unanswered."),r.a.createElement("hr",null),"Food"===t.category?r.a.createElement(ve,{review:o,onFieldChange:this.updateReview}):r.a.createElement(fe,{review:o,onFieldChange:this.updateReview})),r.a.createElement(se.a.Footer,null,r.a.createElement(M.a,{onClick:this.submitReview,disabled:s},"Submit Review")))):null}}]),a}(r.a.Component),be=(a(91),a(75)),ye=a(73),we={dine_in:"Dine-In",drive_thru:"Drive-Thru",pick_up:"Pick-Up"};function ke(e){return e.diningTypes?r.a.createElement("div",null,r.a.createElement("p",{className:"text-center rating-message"},"This location offers these dining styles:"),Object.keys(we).map((function(t){return e.diningTypes[t]>0&&r.a.createElement("p",{className:"dining-type text-center"},r.a.createElement(X.a,{className:"check-icon",icon:"check",color:"#00E096",size:"lg"}),we[t])}))):null}function Ee(e){var t=e.rating,a=e.category,n=Q.formatCategoryRating(t,a),i=Q.getCategoryMessage(t,a),o=Q.getCategoryRisk(t,a),s=n&&r.a.createElement(ye.Textfit,{mode:"single",max:30,className:"category-rating text-center text-".concat(Y[o])},n),c=i&&r.a.createElement("p",{className:"text-center rating-message"},Q.getCategoryMessage(t,a));return r.a.createElement("div",{className:"category-rating-panel"},"diningTypes"===a?ke(t):s,c)}var Ce=[{name:"employeeMasks",label:"Employee Masks"},{name:"customerMasks",label:"Customer Masks"},{name:"distancing",label:"Social Distancing"},{name:"diningTypes",label:"Dining Styles"}],xe=[{name:"employeeMasks",label:"Employee Masks"},{name:"customerMasks",label:"Customer Masks"},{name:"distancing",label:"Social Distancing"},{name:"dividers",label:"Plexiglass Dividers"}];function Se(e){var t=e.place,a=Object(n.useState)("employeeMasks"),i=Object(be.a)(a,2),o=i[0],s=i[1],c=("Food"===t.category?Ce:xe).map((function(e){return r.a.createElement(M.a,{className:"category-button",size:"sm",variant:(o===e.name?"":"outline-")+Y[Q.getCategoryRisk(t.rating,e.name)],block:!0,key:e.name,onClick:function(){return s(e.name)}},e.label)}));return r.a.createElement("div",{className:"place-ratings-overview"},r.a.createElement(Z.a,null,r.a.createElement(ee.a,{className:"category-buttons text-center",xs:{span:5,offset:1}},c),r.a.createElement(ee.a,{xs:6},r.a.createElement(Ee,{rating:t.rating,category:o}))))}var Ne=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onReviewSubmitted=Object(d.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({isReviewModalVisible:!1}),e.next=3,n.retrieveReviews();case 3:return t=n.props.place,e.prev=4,e.next=7,Q.retrievePlaceRating(t);case 7:a=e.sent,n.props.onReviewSubmitted(a),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[4,11]])}))),n.toggleExpanded=function(){n.setState((function(e){return{isExpanded:!e.isExpanded}}))},n.updatePlaceHeaderHeight=function(e){n.state.placeHeaderHeight||n.setState({placeHeaderHeight:"".concat(e.clientHeight,"px")})},n.state={reviews:[],isLoading:!1,isExpanded:!1,isReviewModalVisible:!1,placeHeaderHeight:null},n}return Object(v.a)(a,[{key:"componentDidMount",value:function(){var e=Object(d.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.retrieveReviews();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isActive&&this.props.isActive&&this.setState({isExpanded:!1}),t.place.id===this.props.place.id){e.next=4;break}return e.next=4,this.retrieveReviews();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"retrieveReviews",value:function(){var e=Object(d.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.place,this.setState({isLoading:!0}),e.prev=2,e.next=5,z.getPlaceReviews(t.id);case 5:a=e.sent,this.setState({reviews:a,isLoading:!1}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0),this.setState({reviews:[],isLoading:!1});case 13:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.props,a=t.place,n=t.isActive,i=this.state,o=i.reviews,s=i.isLoading,c=i.isExpanded,l=i.isReviewModalVisible,u=i.placeHeaderHeight,m=n?c?"70%":"30%":"0%";return r.a.createElement(r.a.Fragment,null,r.a.createElement(he,{place:a,isVisible:l,onClose:function(){return e.setState({isReviewModalVisible:!1})},onSubmit:this.onReviewSubmitted}),r.a.createElement(O.a,{duration:200,height:m,className:"place-panel"},r.a.createElement(S.a,{onSwiped:this.toggleExpanded},r.a.createElement(te,{place:a,isPanelExpanded:c,divRef:function(t){return t&&e.updatePlaceHeaderHeight(t)},onToggleExpanded:this.toggleExpanded})),s&&r.a.createElement("div",{className:"text-center"},r.a.createElement(N.a,{animation:"border",variant:"primary"})),!s&&r.a.createElement("div",{className:"scrolling-panel",style:u?{top:u}:{}},r.a.createElement(ae,{risk:Q.getOverallRisk(a)}),r.a.createElement(Se,{place:a}),r.a.createElement("h5",{className:"text-center"},"Newest Reviews"),r.a.createElement("div",{className:"text-center"},r.a.createElement(M.a,{className:"text-center",variant:"outline-primary",size:"sm",onClick:function(){return e.setState({isReviewModalVisible:!0})}},"Write a Review")),r.a.createElement(oe,{reviews:o}))))}}]),a}(r.a.Component),Me=a(113);function Re(e){var t=e.value,a=e.isLoading,n=e.onChange,i=e.onEnter,o=e.onClear;return r.a.createElement("div",{className:"search"},r.a.createElement(Me.a,null,r.a.createElement(ce.a.Control,{className:"search-input",value:t,placeholder:"Search places...",onChange:function(e){return n(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&i(t)}})),a&&r.a.createElement(N.a,{className:"loading",animation:"grow",variant:"primary"},r.a.createElement("span",{className:"sr-only"},"Loading...")),!a&&""!==t&&r.a.createElement("div",{className:"search-icon"},r.a.createElement(X.a,{icon:"times",color:"black",size:"lg",onClick:o})),!a&&""===t&&r.a.createElement(M.a,{className:"show-nearby",size:"sm",onClick:function(){return i(t)}},"Show nearby"))}var Oe=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).state={dontShowAgain:!1},n}return Object(v.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.isVisible,n=t.onClose,i=this.state.dontShowAgain;return a?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"backdrop"}),r.a.createElement(se.a.Dialog,{className:"welcome-modal",scrollable:!0},r.a.createElement(se.a.Header,{closeButton:!0,onHide:function(){return n(i)}},r.a.createElement(se.a.Title,null,"Welcome")),r.a.createElement(se.a.Body,null,r.a.createElement("p",null,r.a.createElement("b",null,"Mask Traffic")," helps you stay safe by locating restaurants, coffee shops, and grocery stores that take proper COVID-19 safety precautions."),r.a.createElement("p",null,"You can use the platform to view COVID-19 related reviews of businesses, such as whether or not employees wear masks. You can also submit your own reviews to help keep your local community safe."),r.a.createElement("hr",null),r.a.createElement("p",{className:"disclaimer"},r.a.createElement("b",null,"Disclaimer: "),"MaskTraffic cannot guarantee the validity of information found on this platform. Any reliance you place on information from this platform is therefore strictly at your own risk, and such information should not be interpreted as professional medical advice.")),r.a.createElement(se.a.Footer,null,r.a.createElement(ce.a.Check,{type:"checkbox",label:"Don't show this again",checked:i,onChange:function(t){return e.setState({dontShowAgain:t.target.checked})}}),r.a.createElement(M.a,{onClick:function(){return n(i)}},"I'm ready!")))):null}}]),a}(r.a.Component),Ie=(a(99),a(100),{food_unknown:je("markers/marker_food_unknown.png"),food_low:je("markers/marker_food_low.png"),food_medium:je("markers/marker_food_medium.png"),food_high:je("markers/marker_food_high.png"),retail_unknown:je("markers/marker_retail_unknown.png"),retail_low:je("markers/marker_retail_low.png"),retail_medium:je("markers/marker_retail_medium.png"),retail_high:je("markers/marker_retail_high.png")});function je(e){return k.a.icon({iconUrl:e,iconSize:[30,65],iconAnchor:[15,65]})}var Pe={getMarkerIcon:function(e){var t=Q.getOverallRisk(e),a="Food"===e.category?"food":"retail";return Ie["".concat(a,"_").concat(t)]}},De=function(e){Object(f.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).mapRef=null,n.showWelcomeModal=function(){"false"!==localStorage.getItem("showWelcomeModal")&&n.setState({isWelcomeModalVisible:!0})},n.onWelcomeModalClose=function(e){n.setState({isWelcomeModalVisible:!1}),e&&localStorage.setItem("showWelcomeModal","false")},n.retrievePlaces=function(){var e=Object(d.a)(m.a.mark((function e(t,a,r){var i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({isLoading:!0}),e.prev=1,e.next=4,x.retrievePlaces(t,a,r);case 4:return i=e.sent,n.setState({places:i,isLoading:!1}),e.abrupt("return",i);case 9:return e.prev=9,e.t0=e.catch(1),console.log(e.t0),n.setState({isLoading:!1}),e.abrupt("return",[]);case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,a,n){return e.apply(this,arguments)}}(),n.search=function(){var e=Object(d.a)(m.a.mark((function e(t){var a,r,i,o,s,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.mapRef.viewport.center,e.next=3,n.retrievePlaces(a[0],a[1],t);case 3:if(0!==(r=e.sent).length){e.next=6;break}return e.abrupt("return");case 6:i=r.map((function(e){return e.location.lat})),o=r.map((function(e){return e.location.lng})),s={lat:Math.min.apply(Math,Object(l.a)(i)),lng:Math.min.apply(Math,Object(l.a)(o))},c={lat:Math.max.apply(Math,Object(l.a)(i)),lng:Math.max.apply(Math,Object(l.a)(o))},n.mapRef.leafletElement.fitBounds(new k.a.LatLngBounds(s,c));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.selectPlace=function(e){n.setState({selectedPlace:e,isPlacePanelActive:!0})},n.onReviewSubmitted=function(e){var t=n.state.selectedPlace;t.rating=e,n.setState({selectedPlace:t})},n.state={position:{lat:33.4255,lng:-111.94},zoom:15,search:"",places:[],selectedPlace:null,isLoading:!0,isPlacePanelActive:!1,isWelcomeModalVisible:!1},n}return Object(v.a)(a,[{key:"componentDidMount",value:function(){var e=Object(d.a)(m.a.mark((function e(){var t=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.showWelcomeModal(),navigator.geolocation.getCurrentPosition(function(){var e=Object(d.a)(m.a.mark((function e(a){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.coords,r=n.latitude,i=n.longitude,t.setState({position:{lat:r,lng:i}}),e.next=4,t.search();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),function(){var e=Object(d.a)(m.a.mark((function e(a){var n,r,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.state.position,r=n.lat,i=n.lng,e.next=3,t.retrievePlaces(r,i);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.position,n=t.zoom,i=t.search,o=t.places,s=t.selectedPlace,c=t.isPlacePanelActive,l=t.isLoading,u=t.isWelcomeModalVisible;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe,{isVisible:u,onClose:this.onWelcomeModalClose}),r.a.createElement(h.a,{center:a,zoom:n,id:"map",ref:function(t){return e.mapRef=t},zoomControl:!1,onClick:function(){return e.setState({isPlacePanelActive:!1})}},r.a.createElement(b.a,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors  &copy; <a href="https://carto.com/attributions">CARTO</a>',url:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"}),o.map((function(t){return r.a.createElement(y.a,{position:[t.location.lat,t.location.lng],icon:Pe.getMarkerIcon(t),key:t.id,onClick:function(){return e.selectPlace(t)}})}))),s&&r.a.createElement(Ne,{place:s,isActive:c,onReviewSubmitted:this.onReviewSubmitted}),r.a.createElement(Re,{value:i,isLoading:l,onChange:function(t){return e.setState({search:t})},onEnter:function(t){return e.search(t)},onClear:function(){return e.setState({search:""})}}))}}]),a}(r.a.Component),_e=a(55);a(103);i.b.add(o.d,o.f,o.e,o.a,o.c,o.b),_e.a.initialize("UA-80633604-5"),_e.a.pageview(window.location.pathname),c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(De,null)),document.getElementById("root"))},57:function(e,t,a){},76:function(e,t,a){e.exports=a(104)},91:function(e,t,a){}},[[76,1,2]]]);