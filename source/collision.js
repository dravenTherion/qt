window.Collision = (function(){
    
    const _this = {};
    
    
    function _testRect(rec1, rec2){
        
        let outsideBottom   = rec1.y + rec1.height < rec2.y,
            outsideTop      = rec1.y > rec2.y + rec2.height,
            outsideLeft     = rec1.x > rec2.x + rec2.width,
            outsideRight    = rec1.x + rec1.width < rec2.x;
            
        
        return !(outsideBottom || outsideTop || outsideLeft || outsideRight);
        
    }
    
    
    function _testCirc(circ1, circ2){
        
        let distX       = circ2.x - circ1.x,
            distY       = circ2.y - circ1.y;
        
            
        return circ2.radius + circ1.radius >= Math.sqrt(distX * distX + distY * distY);     
        
    }
    
    _this.testRect  = _testRect;
    _this.testCirc  = _testCirc;
    
    return _this;
    
    
})();