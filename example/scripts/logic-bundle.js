(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const i=function(){const t={};function e(t,e){this.id=Date.now(),this.name="",this.x=t||0,this.y=e||0,this.type=this.baseType="point"}function n(t,n,i,r){this.width=i||0,this.height=r||0,e.call(this,t,n),this.type=this.baseType="box"}return t.point=e,t.box=n,t.circ=function(t,e,i){this.radius=i,n.call(this,t,e,2*i,2*i),this.type=this.baseType="circle"},t.dist2Points=function(t,e,n,i){let r=n-t,s=i-e;return Math.sqrt(r*r+s*s)},t.angle=function(t,e){return 180*Math.atan2(e,t)/Math.PI},t.vector=function(t,n){let i=n*Math.PI/180;return new e(t*Math.cos(i),t*Math.sin(i))},t.POINT="point",t.BOX="box",t.CIRC="circle",t}(),r=(i.point,i.box),s=i.circ,o=i.dist2Points,h=i.angle,u=i.vector;var l=i;const d=function(){const t={};return t.testRect=function(t,e){let n=t.y+t.height<e.y,i=t.y>e.y+e.height,r=t.x>e.x+e.width,s=t.x+t.width<e.x;return!(n||i||r||s)},t.testCirc=function(t,e){let n=e.x+e.radius-(t.x+t.radius),i=e.y+e.radius-(t.y+t.radius);return e.radius+t.radius>=Math.sqrt(n*n+i*i)},t}(),c=d.testRect,f=d.testCirc;var a=d;var p=function(){const t={},e=10,n=5;function i(t,e){this.parent=null,this.level=t,this.bounds=e,this.nodes=[],this.children=[]}return i.prototype.clear=function(){let t=this.nodes.length;this.children=[];for(let e=0;e<t;e++)if(this.nodes[e]){let t=this.nodes[e];t.clear(),t=null}this.nodes=[]},i.prototype.split=function(){let t=this.bounds.width/2,e=this.bounds.height/2,n=this.bounds.x,s=this.bounds.y;this.nodes[0]=new i(this.level+1,new r(n,s,t,e)),this.nodes[1]=new i(this.level+1,new r(n+t,s,t,e)),this.nodes[2]=new i(this.level+1,new r(n,s+e,t,e)),this.nodes[3]=new i(this.level+1,new r(n+t,s+e,t,e)),this.nodes[0].parent=this,this.nodes[1].parent=this,this.nodes[2].parent=this,this.nodes[3].parent=this},i.prototype.getQuadrant=function(t){let e=[],n=this.bounds.x+this.bounds.width/2,i=this.bounds.y+this.bounds.height/2,r=t.x<n||t.x+t.width<n,s=t.x>n||t.x+t.width>n,o=t.y<i||t.y+t.height<i,h=t.y>i||t.y+t.height>i;return r&&(o&&e.push(0),h&&e.push(2)),s&&(o&&e.push(1),h&&e.push(3)),e},i.prototype.insert=function(t){if(this.nodes.length){let e=this.getQuadrant(t);for(let n=0;n<e.length;n++)this.nodes[e[n]].insert(t)}else if(this.children.push(t),this.children.length>e&&this.level<n){this.nodes.length||this.split();let t=this.children.length;for(let e=0;e<t;e++)this.insert(this.children[e]);this.children=[]}},i.prototype.retrieve=function(t,e){if(this.nodes.length){let n=this.getQuadrant(e);for(let i=0;i<n.length;i++)this.nodes[n[i]].retrieve(t,e)}t.push.apply(t,this.children)},i.prototype.delete=function(t){if(this.nodes.length){let e=this.getQuadrant(t);for(let n=0;n<e.length;n++)this.nodes[e[n]]&&this.nodes[e[n]].delete(t)}else{for(let e=0;e<this.children.length;e++)if(t.id==this.children[e].id){this.parent,this.children[e]=null,this.children.splice(e,1);break}}},Object.defineProperties(t,{maxChildren:{get:function(){return e},set:function(t){e=t}},maxLevel:{get:function(){return n},set:function(t){n=t}}}),t.node=i,t}();n.d(e,"Geom",(function(){return l})),n.d(e,"Box",(function(){return r})),n.d(e,"Circ",(function(){return s})),n.d(e,"dist2Points",(function(){return o})),n.d(e,"angle",(function(){return h})),n.d(e,"vector",(function(){return u})),n.d(e,"Collision",(function(){return a})),n.d(e,"testRect",(function(){return c})),n.d(e,"testCirc",(function(){return f})),n.d(e,"QT",(function(){return p}))}]);
},{}],2:[function(require,module,exports){
//Main Controller

window.Controller = (function(){
    
    const _this   = {};
    
    let   _tl,
          _tlm;
        
    function init(){
        _tl     = TweenMax;
        _tlm    = new TimelineMax({paused: true});
        
        World.init();
        World.start();            
   }
    
    
    _this.init = init;
    
    return _this;

})();


/** Helpers **/
var Helpers = (function(){
    
    const _this = {};
    
    function _randRange(min, max, isInt) {
        
        let rnd = Math.random() * (max - min + 1) + min;
        
        if(isInt)
            rnd = Math.floor(rnd);
        
        return rnd;
    }
    
    _this.randRange = _randRange;
    
    return _this;
    
})();


/** World **/
var World = (function(){
    
    const {Geom, QT, Collision} = require('qt-js');
    
    const _this   = {};
        
    let _tl,
        _tlm,
            
        _world,
        _worldCTX,
        _worldBounds,
        _worldTree,
        
        _worldObjects   = [],
        _activeItems    = [],
        
        _selectionBox   = {},
        
        _selectThreshold = 5;
    
    
    function _init(){
        
        _tl             = TweenMax;
        _tlm            = new TimelineMax({paused: true});
        
        //QT.maxDepth     = 20;
        //QT.maxChildren  = 15;
        
        _world          = document.querySelector('#world');
        
        _world.width    = window.innerWidth;
        _world.height   = window.innerHeight;
        
        _worldCTX       = _world.getContext('2d');
    
        _worldBounds    = new Geom.box(0 , 0, _world.width, _world.height);
        _worldTree      = new QT.node(0, _worldBounds);
        
        _worldBoundsOffset = new Geom.box(_world.getBoundingClientRect().left , _world.getBoundingClientRect().top, _world.width, _world.height);
        
        _initElements();
        _addEventListeners();
        
    }
    
    function _initElements(){
        
        let size,
            obj,
            isColliding     = false,
            colliderList    = [];
        
        for(let ctr = 0; ctr < 1000; ctr++)
        {
    
            size = Helpers.randRange(10, 20, true);
            
            obj =  new Geom.box(0, 0, size, size);
            
            obj.id          = ctr;
            obj.active      = false;
            obj.colliding   = false;
            obj.xSpeed      = Helpers.randRange(-5, 5);
            obj.ySpeed      = Helpers.randRange(-5, 5);
            
            
            do{
                
                isColliding     = false;
                colliderList    = [];

                obj.x = Helpers.randRange(0, _worldBounds.width - size);
                obj.y = Helpers.randRange(0, _worldBounds.height - size);
                
                _worldTree.retrieve(colliderList, obj);

                for(let ctr2 = 0; ctr2 < colliderList.length; ctr2++)
                {

                    if(obj.id != colliderList[ ctr2 ].id)
                        if(Collision.testRect(obj, colliderList[ ctr2 ]))
                        {

                            isColliding = true;
                            break;
                       }
               }
                
                
           }while(isColliding)
            
            _worldTree.insert(obj);    
            _worldObjects.push(obj);
    
       }
        
    }
    
    function _addEventListeners(){
        
        _world.addEventListener('click', _worldClick);
        _world.addEventListener('mousedown', _worldSelectStart);
        
    }
    
    
    // event handlers
    
    function _worldClick(event){
        
        if(Math.abs(_selectionBox.width) > _selectThreshold || Math.abs(_selectionBox.height) > _selectThreshold)
            return;
        
        let t = event.currentTarget,
            
            eX      = event.pageX,
            eY      = event.pageY,

            size    = 2,

            selectPoint = new Geom.box(eX - _worldBoundsOffset.x - size / 2, eY - _worldBoundsOffset.y - size / 2, size, size),

            selectedItems = _select(selectPoint);            
        
        
        if(selectedItems.length)
           
            if(!_activeItems.length)
                _activeItems = selectedItems;
            else
            {
                
                _deselect();
                _activeItems = selectedItems;
                
           }
                
        //_render();
        
    }
    
    function _worldSelectStart(event){
        
        let t = event.currentTarget,
            
            eX  = event.pageX,
            eY  = event.pageY;
        
        
        _selectionBox = new Geom.box(eX - _worldBoundsOffset.x, eY - _worldBoundsOffset.y, 0, 0);
        
        _world.addEventListener('mousemove', _worldSelectMove);
        _world.addEventListener('mouseup', _worldSelectEnd);
        _world.addEventListener('mouseleave', _worldSelectEnd);
        
    }

    function _worldSelectMove(event){
        
        let t = event.currentTarget,
            
            eX  = event.pageX,
            eY  = event.pageY,
            
            xDelta  = eX - _worldBoundsOffset.x - _selectionBox.x,
            yDelta  = eY - _worldBoundsOffset.y - _selectionBox.y;
        
        
        _selectionBox.width  = xDelta;
        _selectionBox.height = yDelta;
                    
    }

    function _worldSelectEnd(event){
        
        let selectedItems,
            tmpSelectionBox;
        
        _world.removeEventListener('mousemove', _worldSelectMove);
        _world.removeEventListener('mouseup', _worldSelectEnd);
    
        if(Math.abs(_selectionBox.width) < _selectThreshold && Math.abs(_selectionBox.height) < _selectThreshold)
        {
            
            _selectionBox.x       = -1;
            _selectionBox.y       = -1;
            _selectionBox.width   = 0;
            _selectionBox.height  = 0;
            
            return;
        
       }
        
        
        tmpSelectionBox = new Geom.box();
        
        tmpSelectionBox.x = _selectionBox.width < 0 ? _selectionBox.x + _selectionBox.width : _selectionBox.x;
        tmpSelectionBox.y = _selectionBox.height < 0 ? _selectionBox.y + _selectionBox.height : _selectionBox.y;
        
        tmpSelectionBox.width     = Math.abs(_selectionBox.width);
        tmpSelectionBox.height    = Math.abs(_selectionBox.height);
        
        //console.log('selection box', _selectionBox);
        //console.log('tmp box', tmpSelectionBox);
        
        _deselect();
        
        selectedItems = _select(tmpSelectionBox); 
        
        //console.log(selectedItems);
        
        if(selectedItems.length)
            _activeItems = selectedItems;
        
        setTimeout(function(){
            
            _selectionBox.x       = -1;
            _selectionBox.y       = -1;

            _selectionBox.width   = 0;
            _selectionBox.height  = 0;
        
       }, 1);
    
    }
        
    // object selection
    
    function _select(selectionRect){
        
        let neighbors       = [],

            neighbor,
            
            selectedItems   = [];
            
        
        _worldTree.retrieve(neighbors, selectionRect);
            
        //console.log('selectionRect', selectionRect);
        //console.log('neighbors', neighbors);
        
        for(let ctr = 0; ctr < neighbors.length; ctr++)
        {

            neighbor = neighbors[ ctr ]; 
                    
            if(Collision.testRect(selectionRect, neighbor))
            {
                neighbor.active = true;
                selectedItems.push(neighbor);
           }
                
       }
        
        return selectedItems;
            
    }
    
    
    function _deselect(){
        
        let length = _activeItems.length;
                
        for(let ctr = 0; ctr < length; ctr++)
        {
                    
            _activeItems[ ctr ].active = false;
                    
       }
        
        _activeItems = [];
        
    }

    // rendering
    
    function _drawRec(x, y, width, height, fillColor, strokeColor, lineWidth){
        
        if(fillColor)
            _worldCTX.fillStyle = fillColor;
        _worldCTX.fillRect(x, y, width, height);
        
        if(strokeColor)
            _worldCTX.strokeStyle = strokeColor;
        
        _worldCTX.lineWidth = lineWidth || 1;
        
        _worldCTX.strokeRect(x, y, width, height);
        
    }
    
    
    function _render(){
        
        let length  = _worldObjects.length,
            obj,
            
            collideList = [],
            
            collisionStatus = 10,
            collisionCount  = 0;
        
        _worldTree.clear();
        _worldCTX.clearRect(0, 0, _world.width, _world.height);
        
        
        for(let ctr = 0; ctr < length; ctr++)
        {
            obj = _worldObjects[ ctr ];
            _worldTree.insert(obj);
            
       }
        
        
        for(let ctr = 0; ctr < length; ctr++)
        {
            collideList = [];
            
            obj         = _worldObjects[ ctr ];
            
            
            if(obj.x + obj.xSpeed > _worldBounds.width - obj.width || obj.x + obj.xSpeed < 0)
                obj.xSpeed = -obj.xSpeed;

            if(obj.y + obj.ySpeed > _worldBounds.height - obj.height || obj.y + obj.ySpeed < 0)
                obj.ySpeed = -obj.ySpeed;

            obj.x += obj.xSpeed;
            obj.y += obj.ySpeed;
            
            _worldTree.retrieve(collideList, obj);
            
            obj.colliding = obj.colliding - 1 > -1 ? obj.colliding - 1 : 0;
            
            for(let ctr2 = 0; ctr2 < collideList.length; ctr2++)
            {
                
                if(obj.id != collideList[ ctr2 ].id)
                {
                    
                    if(Collision.testRect(obj, collideList[ ctr2 ]))
                    {
                        
                        obj.colliding   = 
                        collideList[ ctr2 ].colliding = collisionStatus;
                        
                        obj.x -= obj.xSpeed;
                        obj.y -= obj.ySpeed;
                        
                        obj.xSpeed      = Helpers.randRange(-5, 5);
                        obj.ySpeed      = Helpers.randRange(-5, 5);
                        
                        collideList[ ctr2 ].xSpeed =  -obj.xSpeed;
                        collideList[ ctr2 ].ySpeed =  -obj.ySpeed;
                        
                        collisionCount++;
                        
                        //break;
                        
                   }
                    
               }
                
           }
            
            _drawRec(obj.x, obj.y, obj.width, obj.height, obj.active ? 'rgba(150, 150, 0, .5)' : obj.colliding ? 'rgba(' + Math.floor(200 * (obj.colliding / collisionStatus)) +', 0, 0, .5)' : 'rgba(0, 0, 0, .5)', obj.colliding ? '#AA0000' : '#000');        
            
       }
    
        
        if(_selectionBox.x > -1 && _selectionBox.y > -1)
        {
            
            _drawRec(_selectionBox.x, _selectionBox.y, _selectionBox.width, _selectionBox.height, 'transparent', '#00CC00', 4);
            
       }
        
        document.querySelector('#data').innerHTML = length + ' children <br />' + collisionCount + ' collisions';
        
        //console.log('collisions', collisionCount);
        
    }
    
    
    function _start(){
        
        _tl.ticker.addEventListener('tick', _render);
        
    }

    function _stop(){
        
        _tl.ticker.removeEventListener('tick', _render);
        
    }
    
    
    _this.init      = _init;
    _this.drawRec   = _drawRec;
    
    _this.render    = _render;
    _this.start     = _start;
    _this.stop      = _stop;
    
    
    return _this;
    
})();


window.addEventListener('load', Controller.init);
},{"qt-js":1}]},{},[2]);
