(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t,n){e?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",""))}e.d({},{x:()=>U,n:()=>z});var r=document.querySelector(".profile__avatar-img"),o=document.querySelector(".profile__name"),a=document.querySelector(".profile__description");function i(e){r.src=e.avatar,o.textContent=e.name,a.textContent=e.about}var c={baseUrl:"https://nomoreparties.co/v1/plus-cohort-11",headers:{authorization:"b774376d-f39e-48ac-9645-fb307bb3995b","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject(e.status)}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=document.querySelector(".profile__name"),d=document.querySelector(".profile__description"),f=document.forms.editAvatar,p=document.forms.editProfile,m=document.forms.newPlace,y=m.elements.name,v=m.elements.address,h=f.elements.address,_=p.elements.name,b=p.elements.description,g=p.elements.submit,S=document.querySelector(".popup_type_new-place"),C=document.querySelector(".popup_type_edit-avatar"),L=document.querySelector(".popup_type_edit-profile"),E=document.querySelector(".popup_type_show-image"),k=E.querySelector(".popup__image"),A=E.querySelector(".popup__image-description"),q=document.querySelector(".gallery__list");function w(e){e.classList.add("popup_active"),document.addEventListener("keydown",O)}function x(e){e.classList.remove("popup_active"),document.removeEventListener("keydown",O)}function j(e){e.reset(),n(!1,e.submit,z);var t,r=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}(e.children);try{for(r.s();!(t=r.n()).done;){var o=t.value;o.classList.remove(z.inputErrorClass),o.classList.remove(z.errorClass)}}catch(e){r.e(e)}finally{r.f()}}function O(e){"Escape"===e.key&&x(document.querySelector(".popup_active"))}var U,P=document.querySelector("#gallery-item-template");function T(e){e.target.disabled=!0;var t,n,r=e.target.closest(".gallery__item").id,o=e.target.nextElementSibling;(t=r,n=e.target.classList.contains("gallery__like-button_like")?"DELETE":"PUT",fetch("".concat(c.baseUrl,"/cards/likes/").concat(t),{method:n,headers:c.headers}).then((function(e){return l(e)}))).then((function(t){o.textContent=t.likes.length,e.target.classList.toggle("gallery__like-button_like"),e.target.disabled=!1})).catch((function(e){return console.log("Ошибка лайка карточки: ".concat(e))}))}function I(e){var t,n=e.target.closest(".gallery__item");(t=n.id,fetch("".concat(c.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:c.headers}).then((function(e){return l(e)}))).then((function(){n.remove()})).catch((function(e){return console.log("Ошибка удаления карточки: ".concat(e))}))}function D(e,t,n,r,o){var a=P.content.cloneNode(!0),i=a.querySelector(".gallery__delete-button"),c=a.querySelector(".gallery__image"),l=a.querySelector(".gallery__like-button");return c.src=t,c.alt=e,c.addEventListener("click",(function(){return function(e,t){k.src=t,k.alt=e,A.textContent=e,w(E)}(e,t)})),a.querySelector(".gallery__title").textContent=e,l.addEventListener("click",T),i.closest(".gallery__item").id=r,a.querySelector(".gallery__like-counter").textContent=n.length,n.some((function(e){return e._id===U}))&&l.classList.add("gallery__like-button_like"),o===U&&(i.addEventListener("click",I),i.classList.add("gallery__delete-button_active")),a}function B(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var N=document.querySelector(".profile__avatar-overlay"),J=document.querySelector(".profile__add"),$=document.querySelector(".profile__edit"),H=document.querySelectorAll(".popup"),z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_invalid",errorClass:"popup__invalid-msg_active"};J.addEventListener("click",(function(){j(m),w(S)})),N.addEventListener("click",(function(){j(f),w(C)})),$.addEventListener("click",(function(){j(p),_.value=s.textContent,b.value=d.textContent,n(!0,g,z),w(L)})),f.addEventListener("submit",(function(e){var t;e.target.submit.textContent="Сохранение...",(t=h.value,fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:t})}).then((function(e){return l(e)}))).then((function(e){i(e),x(C)})).catch((function(e){console.log("Ошибка обновления аватара: ".concat(e))})).finally((function(){e.target.submit.textContent="Сохранить"})),e.preventDefault()})),p.addEventListener("submit",(function(e){var t,n;g.textContent="Сохранение...",(t=_.value,n=b.value,fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return l(e)}))).then((function(e){i(e),x(L)})).catch((function(e){console.log("Ошибка обновления профиля: ".concat(e))})).finally((function(){g.textContent="Сохранить"})),e.preventDefault()})),m.addEventListener("submit",(function(e){var t,n;e.target.submit.textContent="Сохранение...",(t=y.value,n=v.value,fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return l(e)}))).then((function(e){q.prepend(D(e.name,e.link,e.likes,e._id,e.owner._id)),x(S)})).catch((function(e){console.log("Ошибка при добавлении карточки: ".concat(e))})).finally((function(){e.target.submit.textContent="Создать"})),e.preventDefault()}));var V,F=B(H);try{var G=function(){var e=V.value;e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_active")||t.target.classList.contains("popup__close"))&&x(e)}))};for(F.s();!(V=F.n()).done;)G()}catch(e){F.e(e)}finally{F.f()}!function(e){var r,o=function(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw i}}}}(document.querySelectorAll(e.formSelector));try{var a=function(){var t=r.value;t.setAttribute("novalidate",""),t.addEventListener("input",(function(r){return function(e,t,r){var o=e.submit;(function(e,t,n){t.textContent=e.validationMessage,e.validity.valid?(e.classList.remove(n.inputErrorClass),t.classList.remove(n.errorClass)):(e.classList.add(n.inputErrorClass),t.classList.add(n.errorClass))})(t,e.querySelector(".".concat(t.name,"-invalid")),r),n(e.checkValidity(),o,r)}(t,r.target,e)}))};for(o.s();!(r=o.n()).done;)a()}catch(e){o.e(e)}finally{o.f()}}(z),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(e){return l(e)})),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(e){return l(e)}))]).then((function(e){i(e[0]),U=e[0]._id;var t,n=B(e[1]);try{for(n.s();!(t=n.n()).done;){var r=t.value;q.append(D(r.name,r.link,r.likes,r._id,r.owner._id))}}catch(e){n.e(e)}finally{n.f()}})).catch((function(e){return console.log("Ошибка загрузки данных: ".concat(e))}))})();