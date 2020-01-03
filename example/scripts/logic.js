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