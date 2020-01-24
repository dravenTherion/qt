const Collision = (function(){
    
    const _this = {};
    
    /**
    Test collision of 2 rectangles
    **/
    function _testRect(rec1, rec2){
        
        let outsideBottom   = rec1.y + rec1.height < rec2.y,
            outsideTop      = rec1.y > rec2.y + rec2.height,
            outsideLeft     = rec1.x > rec2.x + rec2.width,
            outsideRight    = rec1.x + rec1.width < rec2.x;
            
        
        return !(outsideBottom || outsideTop || outsideLeft || outsideRight);
        
    }
    
    /**
    Test collision of 2 circles from center
    **/
    function _testCirc(circ1, circ2){
        
        let distX       = (circ2.x + circ2.radius) - (circ1.x + circ1.radius),
            distY       = (circ2.y + circ2.radius) - (circ1.y + circ1.radius);
        
            
        return circ2.radius + circ1.radius >= Math.sqrt(distX * distX + distY * distY);     
        
    }
    
    _this.testRect  = _testRect;
    _this.testCirc  = _testCirc;
    
    return _this;
    
    
})();

const testRect = Collision.testRect,
      testCirc = Collision.testCirc;

export {
        testRect,
        testCirc
        }

export default Collision;